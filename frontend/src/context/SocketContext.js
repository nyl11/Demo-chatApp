import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user } = useAuthContext(); 
  const [socket, setSocket] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
   
    if (!user) {
     
      if (socket) {
        console.log("🔌 Disconnecting socket - user logged out");
        socket.disconnect();
        setSocket(null);
        setChatMessages([]);
      }
      return;
    }

    console.log("🔌 Creating new socket connection for:", user.username);
    const newSocket = io(process.env.REACT_APP_BACKEND_URL); 

   
    newSocket.on("connect", () => {
      console.log(" Connected to server with socket ID:", newSocket.id);
      console.log(" Joining as:", user.username);
      newSocket.emit("join", user.token);
    });

    newSocket.on("chatHistory", (history) => {
      console.log(" Received chat history:", history.length, "messages");
      setChatMessages(history);
    });

    newSocket.on("chat", (msg) => {
      console.log(" New message received:", msg);
      setChatMessages((prev) => [...prev, msg]);
    });

    newSocket.on("userJoined", (username) => {
      console.log(" User joined:", username);
      setChatMessages((prev) => [
        ...prev,
        { type: "notification", message: `${username} joined the chat` }
      ]);
    });

    newSocket.on("userLeft", (username) => {
      console.log(" User left:", username);
      setChatMessages((prev) => [
        ...prev,
        { type: "notification", message: `${username} left the chat` }
      ]);
    });

    setSocket(newSocket);

    return () => {
      console.log("Cleaning up socket connection for:", user.username);
      newSocket.disconnect();
    };
  }, [user]); 

  return (
    <SocketContext.Provider value={{ socket, chatMessages }}>
      {children}
    </SocketContext.Provider>
  );
};