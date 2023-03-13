import axios from 'axios';
import Config from 'react-native-config';

function apiInstance() {
  const instance = axios.create({
    baseURL: Config.BASE_URL,
  });

  return instance;
}

export const api = apiInstance();
