import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust if your backend runs on another port
});

// Add token from localStorage for all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
