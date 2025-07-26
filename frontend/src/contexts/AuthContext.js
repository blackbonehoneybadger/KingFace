import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { publicKey, signMessage, connected, disconnect } = useWallet();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('kingface-token'));

  // Configure axios with backend URL
  const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add auth token to requests
  api.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Handle auth errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  const connectWallet = async (username, displayName) => {
    if (!publicKey || !signMessage) {
      throw new Error('Wallet not connected');
    }

    setLoading(true);
    try {
      // Create message to sign
      const message = new TextEncoder().encode('KingFace Login');
      
      // Sign message with wallet
      const signature = await signMessage(message);
      
      // Convert signature to base58 string
      const signatureBase58 = Array.from(signature).map(b => b.toString(16).padStart(2, '0')).join('');

      // Send to backend
      const response = await api.post('/api/auth/connect', {
        wallet_address: publicKey.toString(),
        signature: signatureBase58,
        username,
        display_name: displayName,
      });

      const { access_token, user: userData } = response.data;
      
      setToken(access_token);
      setUser(userData);
      localStorage.setItem('kingface-token', access_token);
      
      return userData;
    } catch (error) {
      console.error('Wallet connection error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('kingface-token');
    disconnect();
  };

  const fetchProfile = async () => {
    if (!token) return null;
    
    try {
      const response = await api.get('/api/user/profile');
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      return null;
    }
  };

  const likePost = async (postId) => {
    try {
      const response = await api.post('/api/posts/like', {
        post_id: postId,
      });
      
      // Refresh user data to update balance
      await fetchProfile();
      
      return response.data;
    } catch (error) {
      console.error('Failed to like post:', error);
      throw error;
    }
  };

  const createPost = async (content, contentType = 'text', mediaData = '') => {
    try {
      const response = await api.post('/api/posts', {
        content,
        content_type: contentType,
        media_data: mediaData,
      });
      
      return response.data;
    } catch (error) {
      console.error('Failed to create post:', error);
      throw error;
    }
  };

  const getPosts = async (skip = 0, limit = 20) => {
    try {
      const response = await api.get(`/api/posts/feed?skip=${skip}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      throw error;
    }
  };

  const getUserPosts = async (userId, skip = 0, limit = 20) => {
    try {
      const response = await api.get(`/api/users/${userId}/posts?skip=${skip}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user posts:', error);
      throw error;
    }
  };

  const getStats = async () => {
    try {
      const response = await api.get('/api/stats');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      return null;
    }
  };

  // Auto-fetch profile on token change
  useEffect(() => {
    if (token && !user) {
      fetchProfile();
    }
  }, [token]);

  // Auto-logout when wallet disconnects
  useEffect(() => {
    if (!connected && user) {
      logout();
    }
  }, [connected]);

  const value = {
    user,
    token,
    loading,
    connectWallet,
    logout,
    fetchProfile,
    likePost,
    createPost,
    getPosts,
    getUserPosts,
    getStats,
    api,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};