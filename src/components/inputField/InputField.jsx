import React, { useEffect, useRef } from 'react';
import { useState } from 'react';

const ChatBotInput = () => {
  const [text, setText] = useState('');
  const textAreaRef = useRef(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
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
  );
};

export const InputField = () => {
  return (
    <div className='fs-6 px-3 px-md-4 mx-auto w-100 px-md-5 px-lg-4 px-xl-5'>
      <div
        className='d-flex w-100 rounded-5 p-2 bg-secondary align-items-end px-sm-2 px-md-4 gap-sm-2 gap-lg-3 mx-auto'
        style={{ maxWidth: '768px' }}
      >
        <div>Voice</div>
        <ChatBotInput />
        <div>arrow</div>
      </div>
    </div>
  );
};
