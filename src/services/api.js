 import axios from "axios";

// Backend base URL
const API_BASE_URL = "http://localhost:8080/api/v1";

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ================= AUTH =================

// Register
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Login (BACKEND RETURNS STRING TOKEN)
export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);

  const token = response.data; // ✅ STRING TOKEN

  localStorage.setItem("authToken", token);

  return token;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("authToken");
};

// Check login
export const isAuthenticated = () => {
  return localStorage.getItem("authToken") !== null;
};

// ================= STUDENT API =================

// Example secured API
export const getStudents = async () => {
  const response = await api.get("/all");
  return response.data;
};

export default api;
