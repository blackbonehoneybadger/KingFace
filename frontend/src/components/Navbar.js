import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useAuth } from '../contexts/AuthContext';
import { Crown, Home, PlusSquare, User, LogOut } from 'lucide-react';
import LoginModal from './LoginModal';

const Navbar = () => {
  const location = useLocation();
  const { connected } = useWallet();
  const { user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleWalletConnect = () => {
    if (connected && !user) {
      setShowLoginModal(true);
    }
  };

  React.useEffect(() => {
    if (connected && !user) {
      setShowLoginModal(true);
    }
  }, [connected, user]);

  return (
    <>
      <nav className="bg-king-dark border-b border-king-purple/20 sticky top-0 z-50 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 text-king-gold hover:text-yellow-400 transition-colors">
              <Crown className="h-8 w-8" />
              <span className="text-xl font-bold bg-gradient-to-r from-king-gold to-king-purple bg-clip-text text-transparent">
                KingFace
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
                  isActive('/') 
                    ? 'bg-king-purple text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Главная</span>
              </Link>

              <Link
                to="/feed"
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
                  isActive('/feed') 
                    ? 'bg-king-purple text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <span>Лента</span>
              </Link>

              {user && (
                <Link
                  to="/create"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
                    isActive('/create') 
                      ? 'bg-king-purple text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <PlusSquare className="h-4 w-4" />
                  <span>Создать</span>
                </Link>
              )}
            </div>

            {/* User Section */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  {/* User Balance */}
                  <div className="hidden sm:flex items-center space-x-2 bg-king-dark px-3 py-2 rounded-lg border border-king-gold/20">
                    <div className="text-king-gold font-semibold">
                      {user.kftl_balance?.toFixed(1) || '0.0'} KFTL
                    </div>
                  </div>

                  {/* Profile Link */}
                  <Link
                    to={`/profile/${user.username}`}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                      location.pathname.includes('/profile') 
                        ? 'bg-king-purple text-white' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{user.display_name}</span>
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={logout}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    title="Выйти"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <WalletMultiButton className="!bg-gradient-to-r !from-king-purple !to-purple-600 hover:!from-purple-600 hover:!to-purple-700" />
                  {connected && (
                    <button
                      onClick={handleWalletConnect}
                      className="px-4 py-2 bg-king-gold text-king-dark font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
                    >
                      Войти
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden border-t border-gray-700 py-2">
            <div className="flex justify-around">
              <Link
                to="/"
                className={`flex flex-col items-center space-y-1 p-2 ${
                  isActive('/') ? 'text-king-purple' : 'text-gray-400'
                }`}
              >
                <Home className="h-5 w-5" />
                <span className="text-xs">Главная</span>
              </Link>
              
              <Link
                to="/feed"
                className={`flex flex-col items-center space-y-1 p-2 ${
                  isActive('/feed') ? 'text-king-purple' : 'text-gray-400'
                }`}
              >
                <span className="text-xs">Лента</span>
              </Link>

              {user && (
                <Link
                  to="/create"
                  className={`flex flex-col items-center space-y-1 p-2 ${
                    isActive('/create') ? 'text-king-purple' : 'text-gray-400'
                  }`}
                >
                  <PlusSquare className="h-5 w-5" />
                  <span className="text-xs">Создать</span>
                </Link>
              )}
              
              {user && (
                <Link
                  to={`/profile/${user.username}`}
                  className={`flex flex-col items-center space-y-1 p-2 ${
                    location.pathname.includes('/profile') ? 'text-king-purple' : 'text-gray-400'
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span className="text-xs">Профиль</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </>
  );
};

export default Navbar;