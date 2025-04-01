// utils/auth.js

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Set token in localStorage after login/signup
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// Check if user is logged in
export const isLoggedIn = () => {
  const token = getToken();
  return !!token; // Return true if token exists
};

// Remove token on logout
export const logout = () => {
  localStorage.removeItem("token");
};

// Get auth headers for GraphQL requests
export const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
