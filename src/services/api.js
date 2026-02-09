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
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    let message = "Registration failed";

    if (error.response) {
      if (typeof error.response.data === "string") {
        message = error.response.data; // ✅ plain text
      } else if (error.response.data?.message) {
        message = error.response.data.message;
      }
    }

    throw new Error(message);
  }
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

// Get current user (decode token or return user data)
export const getCurrentUser = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  // For demo purposes, return a mock user
  // In production, you should decode the JWT token to get user data
  return {
    username: "User",
    role: "student"
  };
};

// ================= STUDENT API =================

// Example secured API
export const getStudents = async () => {
  const response = await api.get("/all");
  return response.data;
};

export default api;
