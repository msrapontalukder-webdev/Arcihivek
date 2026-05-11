import axios from "axios";

const BASE_URL = `https://dealbuzzz-backend-with-typescript.onrender.com`;

const API = axios.create({
  baseURL: BASE_URL,
});

// Automatically attach the token to every request if the user is logged in
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default API;
