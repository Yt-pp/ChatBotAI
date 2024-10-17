import React, { useState } from 'react';
import mircoOn from "../../assets/micro_on.png";
import microOff from "../../assets/micro_off.png";

// Check for SpeechRecognition support
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const SpeechToText = ({ setMsg, onSend }) => {
  const [isListening, setIsListening] = useState(false);
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (!recognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  // Set up speech recognition settings
  recognition.continuous = false; // Stops automatically after finishing a sentence
  recognition.interimResults = false; // Only show final results
  recognition.lang = 'zh-CN'; // Set language to Chinese

  // Handle starting speech recognition
  const startListening = () => {
    setIsListening(true);
    recognition.start();
  };

  // Handle stopping speech recognition
  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  // On receiving results
  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript;
    setMsg(speechResult);
    setIsListening(false);
    onSend();
  };

  // Handle recognition errors
  recognition.onerror = (event) => {
    console.error('Speech recognition error', event.error);
    setIsListening(false);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        onClick={isListening ? stopListening : startListening}
        style={{
          padding: '10px',
          backgroundColor: isListening ? '#f44336' : '#FFFFFF',
          color: '#fff',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
      >
        {isListening ?  <img src={microOff} width="25" height="25" /> :  <img src={mircoOn} width="25" height="25" />}
      </div>
    </div>
  );
};

export default SpeechToText;
