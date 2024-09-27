import React, { useState } from 'react';
import reactLogo from '../../assets/react.svg';
import { InputField } from '../../components/inputField/inputField';
import wzFace from '../../assets/wzFace.png';
import './Home.css';
import ChatRow from '../../components/chatRow/chatRow';

const Home = () => {
  const [messages, setMessages] = useState([
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
  const handleSend = async (message) => {
    // Append user message to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: 'user' },
    ]);

    // Send the message to the API and get the response
    // const response = await sendMessageToApi(message); // Replace with your API call

    // // Append bot response to chat
    // setMessages((prevMessages) => [
    //   ...prevMessages,
    //   { text: response, sender: 'bot' },
    // ]);
  };

  const sendMessageToApi = async (message) => {
    // Simulate API call delay and response
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve('React is a JavaScript library for building user interfaces.');
      }, 1000)
    );
  };
  return (
    <>
      <div className='flex-grow-1 relative'>
        {/* <div className='position-absolute top-50 start-50 translate-middle d-flex'>
          <img src={wzFace} className='logo react' alt='React logo' />
        </div> */}
        <div className='flex-grow-1'>
          <ChatRow messages={messages} />
        </div>
      </div>
      {/* input footer */}
      <div class='w-100 pt-md-0 border border-white border-opacity-20 border-md-0 sticky-bottom bg-white'>
        <InputField onSend={handleSend} />

        <div class='position-relative w-100 px-2 py-2 text-center text-secondary d-none d-md-block'>
          <div class='min-vh-25'>
            <div>ChatBotAI can make mistakes. Check important info.</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
