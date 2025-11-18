require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userRoutes = require('./routes/user');
const statsRoutes = require('./routes/stats');
const User = require('./model/userModel');
const Chat = require('./model/chatModel');

const app = express();

// Environment variables
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors({
    origin: FRONTEND_URL,   
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/stats', statsRoutes);

// Connect to MongoDB & start server
mongoose.connect(MONGO_URI)
  .then(() => {
      console.log('✅ Connected to MongoDB');
      console.log('📊 Database name:', mongoose.connection.name);
      
      const server = app.listen(PORT, () => {
          console.log('🚀 Server listening on port', PORT);
      });

      // Socket.IO
      const io = socket(server, {
          cors: {
              origin: FRONTEND_URL,
              methods: ["GET", "POST"]
          }
      });

      io.on("connection", (socket) => {
          console.log("🔌 User connected:", socket.id);

          // Authenticate user when joining
          socket.on("join", async (token) => {
              console.log("\n=== JOIN EVENT RECEIVED ===");
              console.log("Socket ID:", socket.id);
              console.log("Token received:", token ? "Yes" : "No");
              
              try {
                  const decoded = jwt.verify(token, process.env.SECRET);
                  console.log("✅ Token decoded:", decoded);
                  
                  const user = await User.findById(decoded._id);
                  if (!user) {
                      console.log("❌ User not found in database");
                      return;
                  }

                  socket.user = { id: user._id, username: user.username };
                  console.log(`✅ ${user.username} joined the chat`);
                  console.log("Socket user set:", socket.user);

                  // Send previous messages to the joining user
                  const chats = await Chat.find().sort({ createdAt: 1 });
                  console.log(`📨 Sending ${chats.length} previous messages to ${user.username}`);
                  socket.emit("chatHistory", chats);

                  // Broadcast to OTHER users that someone joined
                  socket.broadcast.emit("userJoined", user.username);
                  console.log(`📢 Broadcasted: ${user.username} joined the chat`);

              } catch (err) {
                  console.log("❌ Join error:", err.message);
                  console.error(err);
              }
          });

          // Listen for chat messages
          socket.on("chat", async (data) => {
              console.log("\n=== CHAT EVENT RECEIVED ===");
              console.log("Socket ID:", socket.id);
              console.log("Socket user:", socket.user);
              console.log("Data received:", data);
              
              if (!socket.user) {
                  console.log("❌ No user on socket - user needs to join first!");
                  return;
              }

              try {
                  const chatMessage = {
                      userId: socket.user.id,
                      username: socket.user.username,
                      message: data.message
                  };

                  console.log("💾 Attempting to save chat:", chatMessage);
                  const savedChat = await Chat.create(chatMessage);
                  console.log("✅ Chat saved successfully!");
                  console.log("Saved chat object:", savedChat);
                  
                  io.emit("chat", savedChat); // broadcast to all
                  console.log("📤 Chat broadcasted to all clients");
                  
              } catch (err) {
                  console.error("❌ Error saving chat:", err.message);
                  console.error("Full error:", err);
              }
          });

          // Listen for typing
          socket.on("typing", () => {
              if (!socket.user) {
                  console.log("⚠️ Typing event from unauthenticated user");
                  return;
              }
              console.log(`⌨️ ${socket.user.username} is typing...`);
              socket.broadcast.emit("typing", socket.user.username);
          });

          // Handle disconnect
          socket.on("disconnect", () => {
              const username = socket.user ? socket.user.username : "Unknown";
              console.log(`❌ User disconnected: ${username} (${socket.id})`);
              
              // Broadcast to OTHER users that someone left
              if (socket.user) {
                  socket.broadcast.emit("userLeft", socket.user.username);
                  console.log(`📢 Broadcasted: ${socket.user.username} left the chat`);
              }
          });
      });

  })
  .catch(err => {
      console.error('❌ MongoDB connection error:', err);
  });