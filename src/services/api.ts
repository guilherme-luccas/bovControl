import axios from 'axios';

function apiInstance() {
  const instance = axios.create({
    baseURL: 'http://challenge-front-end.bovcontrol.com/v1',
  });

  return instance;
}

export const api = apiInstance();
