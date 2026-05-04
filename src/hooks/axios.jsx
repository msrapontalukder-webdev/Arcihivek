// src/hooks/axios.js (or similar path)
import axios from "axios";

const API = axios.create({
  // Replace this with your actual backend URL/port
  baseURL: `https://archivek-professional-architecture.vercel.app/services`,
});

export default API; // <-- This default export is crucial!
