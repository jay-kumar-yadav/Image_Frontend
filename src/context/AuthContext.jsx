import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI } from '../services/auth';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, user: action.payload, isAuthenticated: true, error: null };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload, isAuthenticated: false };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false, error: null };
    case 'REGISTER_START':
      return { ...state, loading: true, error: null };
    case 'REGISTER_SUCCESS':
      return { ...state, loading: false, user: action.payload, isAuthenticated: true, error: null };
    case 'REGISTER_FAILURE':
      return { ...state, loading: false, error: action.payload, isAuthenticated: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (user && token) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    }
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await authAPI.login(email, password);
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('token', response.data.token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.response?.data?.message || 'Login failed' });
    }
  };

  const register = async (username, email, password) => {
    dispatch({ type: 'REGISTER_START' });
    try {
      const response = await authAPI.register(username, email, password);
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('token', response.data.token);
      dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'REGISTER_FAILURE', payload: error.response?.data?.message || 'Registration failed' });
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};