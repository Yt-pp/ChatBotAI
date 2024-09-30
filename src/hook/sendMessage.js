import { URL_SEND_CHAT } from '../config/urls';

export const sendMessageToApi = async (message) => {
  // Example GET request
  const { data, isLoading, mutate } = useSWR(
    [
      URL_SEND_CHAT.sendChat,
      {
        method: 'POST',
        body: JSON.stringify({ message: message }),
      },
    ],
    fetcher
  );
  return {
    botChat: data || [],
    mutateChat: mutate,
    isLoading,
  };
};
