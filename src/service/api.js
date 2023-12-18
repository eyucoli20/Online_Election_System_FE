// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://election-system-ecfw.onrender.com/',
});

export default instance;