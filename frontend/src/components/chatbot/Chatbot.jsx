
import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [listening, setListening] = useState(false);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! I'm MechMate AI Assistant. How can I help you today?",
    },
  ]);
const startListening = () => {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice input is not supported in this browser");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.start();

  setListening(true);

  recognition.onresult = (event) => {

    const speechText =
      event.results[0][0].transcript;

    setMessage(speechText);
    setListening(false);

  };


  recognition.onerror = () => {
    setListening(false);
  };


  recognition.onend = () => {
    setListening(false);
  };

};
const speak = (text) => {
  const speech = new SpeechSynthesisUtterance(text);

  speech.lang = "en-US";
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
};

const getLocation = () => {

  setMessages((prev) => [
    ...prev,
    {
      sender: "bot",
      text: "📍 Finding your nearest service center...",
    },
  ]);

  if (!navigator.geolocation) {
    alert("Location is not supported");
    return;
  }


  navigator.geolocation.getCurrentPosition(

    (position) => {

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;


      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "✅ Location found! Opening nearest service centers...",
        },
      ]);


      const mapUrl =
      `https://www.google.com/maps/search/vehicle+service+center/@${lat},${lng},15z`;


      window.open(mapUrl, "_blank");

    },


    () => {

      setMessages((prev)=>[
        ...prev,
        {
          sender:"bot",
          text:"❌ Please allow location permission to find service centers."
        }
      ]);

    }

  );

};





  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setTyping(true);
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
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply,
        },
      ]);
      speak(data.reply);
    } catch (err) {
       
       setTyping(false);
  
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
             {typing && (
    <p>
      <strong>AI:</strong> Typing...
    </p>
  )}

          </div>
<div style={{display:"flex"}}>

<input
  style={{flex:1}}
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  placeholder="Ask anything..."
/>


<button
  onClick={startListening}
>
  {listening ? "🔴" : "🎤"}
</button>
<button
  onClick={getLocation}
>
  📍
</button>

<button onClick={sendMessage}>
  Send
</button>

</div>
          
        </div>
      )}
    </>
  );
};

export default Chatbot;