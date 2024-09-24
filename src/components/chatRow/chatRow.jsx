import React, { useState } from 'react';
import './ChatRow.css'; // Import your CSS file for styling

const ChatRow = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', sender: 'bot' },
    { text: "I'm looking for information about React.", sender: 'user' },
    {
      text: 'React is a JavaScript library for building user interfaces.',
      sender: 'bot',
    },
    { text: 'Can you tell me more about its features?', sender: 'user' },
    {
      text: 'Sure! React allows you to build single-page applications with a component-based architecture.',
      sender: 'bot',
    },
    { text: 'Can you tell me more about its features?', sender: 'user' },
    {
      text: 'Sure! React allows you to build single-page applications with a component-based architecture.',
      sender: 'bot',
    },
    { text: 'Can you tell me more about its features?', sender: 'user' },
    {
      text: 'Sure! React allows you to build single-page applications with a component-based architecture.',
      sender: 'bot',
    },

    { text: 'Can you tell me more about its features?', sender: 'user' },
    {
      text: 'Sure! React allows you to build single-page applications with a component-based architecture.',
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      // Add user message to the messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: 'user' },
      ]);
      // Simulate a response (replace this with actual response logic)
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `Response to: ${input}`, sender: 'bot' },
      ]);
      setInput(''); // Clear the input field
    }
  };

  return (
    <div className='chat-container'>
      <div className='messages'>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatRow;
