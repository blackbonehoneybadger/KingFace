import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { X, Crown } from 'lucide-react';

const LoginModal = ({ isOpen, onClose }) => {
  const { connectWallet, loading } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    displayName: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.displayName) {
      setError('Заполните все поля');
      return;
    }

    if (formData.username.length < 3) {
      setError('Имя пользователя должно содержать минимум 3 символа');
      return;
    }

    try {
      await connectWallet(formData.username, formData.displayName);
      onClose();
    } catch (error) {
      console.error('Login error:', error);
      setError('Ошибка при входе. Попробуйте еще раз.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-king-dark border border-king-purple/30 rounded-xl max-w-md w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <Crown className="h-8 w-8 text-king-gold mr-2" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-king-gold to-king-purple bg-clip-text text-transparent">
            Добро пожаловать в KingFace
          </h2>
        </div>

        <p className="text-gray-300 text-center mb-6">
          Создайте свой профиль для начала работы с платформой
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Имя пользователя *
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Введите имя пользователя"
              className="w-full px-4 py-3 bg-king-darker border border-gray-600 rounded-lg focus:border-king-purple focus:outline-none transition-colors"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-2">
              Отображаемое имя *
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              placeholder="Как к вам обращаться?"
              className="w-full px-4 py-3 bg-king-darker border border-gray-600 rounded-lg focus:border-king-purple focus:outline-none transition-colors"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-king-purple to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'Создание профиля...' : 'Создать профиль'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Подключив кошелек, вы соглашаетесь с нашими условиями использования
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;