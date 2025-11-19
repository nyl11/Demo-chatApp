import React, { useEffect, useContext, useState, useRef } from "react";
import { SocketContext } from "../context/SocketContext";
import { useAuthContext } from "../context/AuthContext"; 

function Home() {
  const { socket, chatMessages } = useContext(SocketContext);
  const { user } = useAuthContext(); 
  
  const username = user?.username || "Guest";

  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState("");

  const chatEndRef = useRef(null);

  // Listen for typing events
  useEffect(() => {
    if (!socket) return; // Add null check

    socket.on("typing", (user) => {
      setTyping(user);
      setTimeout(() => setTyping(""), 1500);
    });

    return () => socket.off("typing");
  }, [socket]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Emit typing event
  const handleTyping = (e) => {
    setMessage(e.target.value);
    if (socket) { // Add null check
      socket.emit("typing");
    }
  };

  // Send message
  const sendMessage = () => {
    if (!message.trim() || !socket) return; // Add null check

    socket.emit("chat", { message });
    setMessage("");
  };

  // Show loading state if socket is not connected
  if (!socket) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <p className="text-xl text-gray-600">Connecting to chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg p-6 flex flex-col">

        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
          Chat Room
        </h1>

        <p className="text-gray-600 text-center mb-2">
          Logged in as: <span className="font-semibold text-black">{username}</span>
        </p>

        {/* Chat Window */}
        <div className="flex-1 h-96 overflow-y-auto bg-gray-50 border border-gray-300 rounded-lg p-4 mb-4 space-y-3">
          
          {/* Messages */}
          {chatMessages.map((msg, index) => {
            if (msg.type === "notification") {
              return (
                <p
                  key={index}
                  className="text-center text-gray-400 italic text-sm"
                >
                  {msg.message}
                </p>
              );
            }

            const isMe = msg.username === username;

            return (
              <div
                key={index}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg shadow 
                  ${isMe ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
                >
                  {!isMe && (
                    <p className="text-xs text-gray-600 mb-1 font-semibold">
                      {msg.username}
                    </p>
                  )}
                  <p>{msg.message}</p>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {typing && (
            <p className="text-sm italic text-gray-500">{typing} is typing...</p>
          )}
          <div ref={chatEndRef} />
        </div>
       
        {/* Input + Button */}
        <div className="flex gap-2 mt-auto">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={handleTyping}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />

          <button
            onClick={sendMessage}
            className="px-5 py-2 bg-blue-700 hover:bg-blue-700 text-white rounded-lg shadow"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
