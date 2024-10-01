import React, { useState } from 'react';

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
  recognition.lang = 'zh-CN'; // Set language to English

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
      <button
        onClick={isListening ? stopListening : startListening}
        style={{
          padding: '10px 20px',
          fontSize: '1.2rem',
          backgroundColor: isListening ? '#f44336' : '#4caf50',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
    </div>
  );
};

export default SpeechToText;
