import axios from "axios";

export const axiosUrl = axios.create({
    baseURL:'http://localhost:5000'
});

axiosUrl.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('token');
    if (token) {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (payload.exp > currentTime) {
          // Token is valid
          config.headers.Authorization = token;
        } else {
          // Token has expired or is invalid
          window.localStorage.removeItem('token');
          // Additional actions, e.g., redirect to the login page
          window.location.href = '/login';
        }
      }
    }
    return config;
});