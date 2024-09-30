export const fetcher = async (url, options = {}) => {
  try {
    //default headers 
    options?.headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Allow all origins
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      // Handle HTTP errors
      const error = new Error('An error occurred while fetching the data.');
      error.info = await response.json();
      error.status = response.status;
      throw error;
    }
    return response.json();
  } catch (error) {
    // Log error or handle as needed
    console.error('Error fetching data:', error);
    throw error; // Re-throw for useSWR to handle the error state
  }
};
