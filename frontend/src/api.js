import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // 🧠 ajuste a porta se seu backend usar outra
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Intercepta requisições e adiciona token JWT, se existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
