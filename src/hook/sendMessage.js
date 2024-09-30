import useSWR, { mutate } from 'swr';
import { URL_SEND_CHAT } from '../config/urls';
import { fetcher } from '../util/Api';

export const useSendMessage = () => {
  const sendMessage = async (message) => {
    try {
      const response = await fetcher(URL_SEND_CHAT.sendChat, {
        method: 'POST',
        body: JSON.stringify({ message }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      // You may want to use the mutate function to revalidate the SWR cache
      // mutate(URL_SEND_CHAT.sendChat); // Uncomment this if you want to trigger revalidation after sending the message
      return response; // Return the bot's response
    } catch (error) {
      console.error('Error sending message:', error);
      throw error; // Re-throw the error for handling in the component
    }
  };

  return {
    sendMessage, // Function to send a message
  };
};
