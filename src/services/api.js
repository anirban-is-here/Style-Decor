import axios from "axios";

const api = axios.create({
  baseURL:
    "https://style-decor-server-anirban-1h3q39drc-anirbans-projects-eaad6de9.vercel.app/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
