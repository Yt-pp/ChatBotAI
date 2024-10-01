import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import SpeechToText from '../voice/voice';

const ChatBotInput = ({ onSend }) => {
  const [text, setText] = useState('');
  const textAreaRef = useRef(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSend = () => {
    if (text.trim()) {
      onSend(text); // Send the text to the parent
      setText(''); // Clear the input after sending
    }
  };

  useEffect(() => {
    if (textAreaRef.current) {
      // Reset the height to auto to calculate scrollHeight correctly
      textAreaRef.current.style.height = 'auto';
      // Dynamically adjust height based on scrollHeight
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [text]);

  return (
    <>
      <div>
        <SpeechToText setMsg={setText} onSend={handleSend} />
      </div>
      <div
        className='d-flex align-items-center'
        style={{
          width: '100%',
          overflowY: 'auto', // Hide scrollbars
          maxHeight: '25dvh',
        }}
      >
        <textarea
          ref={textAreaRef}
          value={text}
          onChange={handleTextChange}
          className='form-control border-0 bg-transparent text-black flex-grow-1'
          style={{
            resize: 'none', // Disable manual resizing
          }}
          placeholder='Message ChatGPT'
          rows={1}
        />
      </div>
      <div onClick={handleSend}>arrow</div>
    </>
  );
};

export const InputField = ({ onSend }) => {
  const handleSendMessage = (message) => {
    onSend(message);
    // Perform other actions with the message, like sending it to the server or updating chat state
  };
  return (
    <div className='fs-6 px-3 px-md-4 mx-auto w-100 px-md-5 px-lg-4 px-xl-5'>
      <div
        className='d-flex w-100 rounded-5 p-2 bg-secondary align-items-end px-sm-2 px-md-4 gap-sm-2 gap-lg-3 mx-auto'
        style={{ maxWidth: '768px' }}
      >
        <ChatBotInput onSend={handleSendMessage} />
      </div>
    </div>
  );
};
