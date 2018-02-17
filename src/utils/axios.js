import Axios from 'axios';
import auth from './auth';

const axios = Axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  responseType: 'json'
});

axios.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = auth.token;

  return config;
});

axios.interceptors.response.use(
  response => response,
  (error) => {
    const { status } = error.response;
    if (status === 401) {
      auth.resetData();
      window.location = '/login';
    } else {
      return Promise.reject(error);
    }
  }
);

export default axios;
