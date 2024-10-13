import React, { useEffect, useRef, useState } from "react";
import "./ChatRow.css"; // Import your CSS file for styling
import { useSpeechSynthesis } from "react-speech-kit";

const ChatRow = ({ messages = [] }) => {
  const messagesEndRef = useRef(null);
  const { speak, voices } = useSpeechSynthesis();
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    // Set the voice based on available voices
    const availableVoices = speechSynthesis.getVoices();
    const chineseVoice = availableVoices.find(voice => voice.lang === 'zh-CN');
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
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
            {message.sender === "bot" && (
              <button onClick={() => handleSpeak(message.text)}>Speak</button>
            )}
          </>
        ))}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatRow;
