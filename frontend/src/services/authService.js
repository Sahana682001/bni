import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Register admin
const register = async (adminData) => {
  const response = await axios.post(`${API_URL}/register`, adminData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// Login admin
const login = async (adminData) => {
  const response = await axios.post(`${API_URL}/login`, adminData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// Logout admin
const logout = () => {
  localStorage.removeItem('token');
};

// Get current admin
const getCurrentAdmin = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/admin`, config);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getCurrentAdmin,
};

export default authService;