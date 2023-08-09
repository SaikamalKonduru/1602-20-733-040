import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://20.244.56.144/train',
});

export const registerCompany = async (data) => {
    try {
        const response = await instance.post('/register', data);
        return response.data;
      } catch (error) {
        throw error.response ? error.response.data : error.message;
      }
};

export const authenticateCompany = async (data) => {
    try {
        const response = await instance.post('/auth', data);
        return response.data;
      } catch (error) {
        throw error.response ? error.response.data : error.message;
      }
};

export const getTrains = async (token) => {
  const response = await instance.get('/trains', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getTrainDetails = async (trainNumber, token) => {
  const response = await instance.get(`/trains/${trainNumber}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
