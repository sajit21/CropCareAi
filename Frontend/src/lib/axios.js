import axios from 'axios';

// const axiosInstance=axios.create({
//     baseURL:import.meta.mode=== "production"?"http://localhost:4000/api":"http://localhost:3000/api",
//     withCredentials:true,
// })

// export default axiosInstance
const backendHost = window.location.hostname === 'localhost'
  ? 'http://localhost:3000/api'
  : `http://${window.location.hostname}:3000/api`;

const axiosInstance = axios.create({
  baseURL: backendHost,
  withCredentials: true,
});

export default axiosInstance;