import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = {
  /**
   * Send a message to the chatbot
   * @param {string} message - The user's message
   * @returns {Promise} - The response from the API
   */
  sendMessage: async (message) => {
    try {
      const response = await axios.post(`${API_URL}/chat`, {
        message
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },
  
  /**
   * Test the API connection
   * @returns {Promise} - The response from the API
   */
  testConnection: async () => {
    try {
      const response = await axios.get(`${API_URL}/test`);
      return response.data;
    } catch (error) {
      console.error('Error testing connection:', error);
      throw error;
    }
  }
};

export default api;