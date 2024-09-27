import React, { useEffect, useRef, useState } from 'react';
import './ChatRow.css'; // Import your CSS file for styling

const ChatRow = ({ messages = [] }) => {
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className='chat-container'>
      <div className='messages'>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatRow;
