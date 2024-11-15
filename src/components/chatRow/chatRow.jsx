import React, { useEffect, useRef, useState } from "react";
import "./ChatRow.css"; // Import your CSS file for styling
import { useSpeechSynthesis } from "react-speech-kit";
import speaker from "../../assets/sound.png";
import botAvatar from "../../assets/botAvatar.png";
import userAvatar from "../../assets/userAvatar.png";

const ChatRow = ({ messages = [] }) => {
  const messagesEndRef = useRef(null);
  const { speak, voices } = useSpeechSynthesis();
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    // Set the voice based on available voices
    const availableVoices = speechSynthesis.getVoices();
    const chineseVoice = availableVoices.find(
      (voice) => voice.lang === "zh-TW"
    );
    if (chineseVoice) {
      setSelectedVoice(chineseVoice);
    }
  }, [voices]); // This will run whenever the voices are loaded/updated

  const handleSpeak = (msg) => {
    console.log("testing speak");
    speak({ text: msg, voice: selectedVoice }); // Use the selected voice
  };
  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <>
            <div
              key={index}
              className={`message d-flex text-start ${message.sender === "bot" ? "" : "align-self-end flex-row-reverse"}`}
            >
              {/* {message.text} */}
  
                <img
                  src={message.sender === "bot" ? botAvatar : userAvatar} // Conditional avatar based on sender
                  alt={message.sender}
                  className={`${message.sender === "bot" ? "me-2" : "ms-2"}`}
                  width="30"
                  height="30"
                  style={{
                    borderRadius: "50%", // Makes the image round
                    marginTop: "10px",
                    zIndex: "99999999px", 
                  }}
                />
                <div  className={`message d-flex flex-column ${message.sender}`}>
                <div dangerouslySetInnerHTML={{ __html: message.text }}></div>
     

              {message.sender === "bot" && (
                <img
                  src={speaker}
                  alt="Speaker"
                  width="25"
                  height="25"
                  onClick={() => handleSpeak(message.text)}
                  style={{
                    cursor: "pointer", // Pointer cursor
                    transition: "opacity 0.3s", // Smooth hover transition
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = "0.7")} // Hover effect
                  onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                />
              )}
            </div>
            </div>
          </>
        ))}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatRow;
