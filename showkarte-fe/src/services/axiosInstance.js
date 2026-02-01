import axios from "axios";
import { getToken } from "../utils/auth";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true
});

axiosInstance.interceptors.request.use(config => {
  const token = getToken(); // ✅ use your auth util

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
