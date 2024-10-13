import React, { useEffect, useState } from "react";
import reactLogo from "../../assets/react.svg";
import { InputField } from "../../components/inputField/inputField";
import wzFace from "../../assets/wzFace.png";
import "./Home.css";
import ChatRow from "../../components/chatRow/chatRow";
import { useSendMessage } from "../../hook/sendMessage";

const Home = () => {
  // const [isAPILoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const { sendMessage } = useSendMessage();

  const handleSend = async (message) => {
    // Append user message to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: "user" },
    ]);
    // Set loading state and add a temporary loading message for the bot
    const tempBotMessage = { text: "Loading...", sender: "bot" };
    setMessages((prevMessages) => [...prevMessages, tempBotMessage]);
    try {
      // Send the message to the API
      const response = await sendMessage(message);
      // Check if the response includes an end time
      if (response?.alarm) {
        const endTime = Number(response?.alarm_remind_time)*1000; // End time in milliseconds

        // Calculate the time until the alert should trigger
        const currentTime = Date.now();
        const timeUntilAlert = endTime - currentTime;

        if (timeUntilAlert > 0) {
          // Set a timeout to alert the user when the time is up
          setTimeout(() => {
            alert(response?.alarm_remind_thing);
          }, timeUntilAlert);
        }
      }
      // Once the response is received, replace the loading message
      setMessages((prevMessages) => {
        // Replace the last bot message (loading) with the actual response
        return [
          ...prevMessages.slice(0, -1), // Remove the last "loading..." message
          { text: response?.message, sender: "bot" },
        ];
      });
    } catch (error) {
      console.error("Error sending message:", error);

      // Handle error by replacing the "loading..." message with an error message
      setMessages((prevMessages) => {
        return [
          ...prevMessages.slice(0, -1), // Remove the last "loading..." message
          {
            text: "Error retrieving response. Please try again.",
            sender: "bot",
          },
        ];
      });
    }
  };

  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      // This event is triggered when the user refreshes or navigates away from the page
      try {
        await sendMessage("bye");
      } catch (error) {
        console.error("Error fetching data before unload:", error);
      }
    };

    // Add event listener for beforeunload
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []); // Empty dependency array to run on mount

  return (
    <>
      <div className="flex-grow-1 relative">
        {/* <div className='position-absolute top-50 start-50 translate-middle d-flex'>
          <img src={wzFace} className='logo react' alt='React logo' />
        </div> */}
        <div className="flex-grow-1">
          <ChatRow messages={messages} />
        </div>
      </div>
      {/* input footer */}
      <div className="w-100 pt-md-0 border border-white border-opacity-20 border-md-0 sticky-bottom bg-white">
        <InputField onSend={handleSend} />

        <div className="position-relative w-100 px-2 py-2 text-center text-secondary d-none d-md-block">
          <div className="min-vh-25">
            <div>ChatBotAI can make mistakes. Check important info.</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
