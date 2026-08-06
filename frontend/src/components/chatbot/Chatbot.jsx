
import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! I'm MechMate AI Assistant. How can I help you today?",
    },
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("https://mechmate.onrender.com/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Server Error.",
        },
      ]);
    }

    setMessage("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        🤖
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "350px",
            height: "500px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            padding: "10px",
          }}
        >
          <h3>MechMate AI</h3>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {messages.map((msg, index) => (
              <p key={index}>
                <strong>{msg.sender === "user" ? "You" : "AI"}:</strong>{" "}
                {msg.text}
              </p>
            ))}
          </div>

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything..."
          />

          <button onClick={sendMessage}>
            Send
          </button>
        </div>
      )}
    </>
  );
};

export default Chatbot;