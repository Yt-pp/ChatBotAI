import React, { useState } from 'react';
import reactLogo from '../../assets/react.svg';
import { InputField } from '../../components/inputField/inputField';
import wzFace from '../../assets/wzFace.png';
import './Home.css';
import ChatRow from '../../components/chatRow/chatRow';
import { sendMessageToApi } from '../../hook/sendMessage';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
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
    // Set loading state and add a temporary loading message for the bot
    setIsLoading(true);
    const tempBotMessage = { text: 'Loading...', sender: 'bot' };
    setMessages((prevMessages) => [...prevMessages, tempBotMessage]);
    try {
      // Send the message to the API
      const { botChat, isLoading } = await sendMessageToApi(message); // Replace with your API call

      // Once the response is received and loading is complete
      if (!isLoading) {
        // Once the response is received, replace the loading message
        setMessages((prevMessages) => {
          // Replace the last bot message (loading) with the actual response
          return [
            ...prevMessages.slice(0, -1), // Remove the last "loading..." message
            { text: botChat, sender: 'bot' },
          ];
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);

      // Handle error by replacing the "loading..." message with an error message
      setMessages((prevMessages) => {
        return [
          ...prevMessages.slice(0, -1), // Remove the last "loading..." message
          {
            text: 'Error retrieving response. Please try again.',
            sender: 'bot',
          },
        ];
      });
    } finally {
      // Set loading state to false once complete
      setIsLoading(false);
    }
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
