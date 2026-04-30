import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email) => {
    try {
      const response = await axios.post('http://localhost:5001/api/students/login', { email });
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      return true;
    } catch (error) {
      console.error('Login error', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUserData = async () => {
    if (!user) return;
    try {
      // Re-fetch login with same email to get updated data (like enrolled courses)
      const response = await axios.post('http://localhost:5001/api/students/login', { email: user.email });
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error('Update user error', error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
