import React from 'react';
import reactLogo from '../../assets/react.svg';
import { InputField } from '../../components/inputField/inputField';
import wzFace from '../../assets/wzFace.png';
import './Home.css';
import ChatRow from '../../components/chatRow/chatRow';

const Home = () => {
  return (
    <>
      <div className='flex-grow-1 relative'>
        {/* <div className='position-absolute top-50 start-50 translate-middle d-flex'>
          <img src={wzFace} className='logo react' alt='React logo' />
        </div> */}
        <div className='flex-grow-1'>
          <ChatRow />
        </div>
      </div>
      {/* input footer */}
      <div class='w-100 pt-md-0 border border-white border-opacity-20 border-md-0 sticky-bottom'>
        <InputField />

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
