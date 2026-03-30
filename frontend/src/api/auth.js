import axios from "axios";

const API_BASE = "http://127.0.0.1:5000/auth"; // Flask backend

export const signupUser = async (username, password) => {
  const res = await axios.post(`${API_BASE}/signup`, { username, password });
  return res.data;
};

export const loginUser = async (username, password) => {
  const res = await axios.post(`${API_BASE}/login`, { username, password });
  if (res.data.token) localStorage.setItem("token", res.data.token);
  return res.data;
};
