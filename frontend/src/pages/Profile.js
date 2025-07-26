import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PostCard from '../components/PostCard';
import { User, Calendar, Crown, Coins, TrendingUp } from 'lucide-react';

const Profile = () => {
  const { username } = useParams();
  const { user: currentUser, getUserPosts, api } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Use current user if no username provided
  const isOwnProfile = !username || username === currentUser?.username;
  const displayUser = isOwnProfile ? currentUser : profileUser;

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');

      try {
        let targetUser = currentUser;

        // Fetch other user's profile if not own profile
        if (!isOwnProfile) {
          try {
            const response = await api.get(`/api/users/${username}`);
            targetUser = response.data;
            setProfileUser(targetUser);
          } catch (err) {
            setError('Пользователь не найден');
            setLoading(false);
            return;
          }
        }

        if (targetUser) {
          // Fetch user's posts
          const userPosts = await getUserPosts(targetUser.id);
          setPosts(userPosts || []);
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError('Ошибка при загрузке профиля');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser || username) {
      fetchProfile();
    }
  }, [username, currentUser, isOwnProfile]);

  const handlePostUpdate = async () => {
    if (displayUser) {
      const userPosts = await getUserPosts(displayUser.id);
      setPosts(userPosts || []);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateTotalEarnings = () => {
    return posts.reduce((total, post) => total + (post.likes_count * 0.9), 0);
  };

  if (!currentUser && !username) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <h1 className="text-3xl font-bold mb-4 text-gray-300">
          Войдите для просмотра профиля
        </h1>
        <p className="text-gray-400">
          Подключите кошелек, чтобы видеть профили и контент
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse">
          {/* Profile Header Skeleton */}
          <div className="bg-king-dark rounded-xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="w-32 h-32 bg-gray-600 rounded-full"></div>
              <div className="flex-1 space-y-4">
                <div className="h-8 bg-gray-600 rounded w-1/3"></div>
                <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          </div>
          
          {/* Posts Skeleton */}
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="post-card rounded-xl p-6">
                <div className="h-4 bg-gray-600 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold mb-4 text-gray-300">
          {error}
        </h1>
        <p className="text-gray-400">
          Проверьте правильность имени пользователя
        </p>
      </div>
    );
  }

  if (!displayUser) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <div className="text-6xl mb-4">👤</div>
        <h1 className="text-3xl font-bold mb-4 text-gray-300">
          Профиль не найден
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-king-dark rounded-xl p-8 mb-8 border border-king-purple/20">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Avatar and Tree */}
          <div className="relative">
            {/* Animated Tree Container */}
            <div className="tree-container">
              <div className="w-32 h-32 bg-gradient-to-br from-king-gold via-yellow-400 to-king-purple rounded-full flex items-center justify-center text-4xl font-bold text-king-dark animate-tree-grow relative">
                {displayUser.avatar_url ? (
                  <img 
                    src={displayUser.avatar_url} 
                    alt="Avatar" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="relative">
                    <Crown className="h-16 w-16" />
                    {/* Tree level indicator */}
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {displayUser.tree_level || 1}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-king-gold to-king-purple bg-clip-text text-transparent">
              {displayUser.display_name}
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              @{displayUser.username}
            </p>
            
            {displayUser.bio && (
              <p className="text-gray-400 mb-4 max-w-md">
                {displayUser.bio}
              </p>
            )}

            <div className="flex items-center justify-center md:justify-start text-sm text-gray-400 mb-6">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Присоединился {formatDate(displayUser.created_at)}</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-king-purple">
                  {posts.length}
                </div>
                <div className="text-sm text-gray-400">Постов</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">
                  {posts.reduce((total, post) => total + post.likes_count, 0)}
                </div>
                <div className="text-sm text-gray-400">Лайков</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  ${calculateTotalEarnings().toFixed(2)}
                </div>
                <div className="text-sm text-gray-400">Заработано</div>
              </div>

              {isOwnProfile && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-king-gold">
                    {displayUser.kftl_balance?.toFixed(1) || '0.0'}
                  </div>
                  <div className="text-sm text-gray-400">KFTL</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Balance Info (Own Profile Only) */}
        {isOwnProfile && (
          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-king-darker p-4 rounded-lg border border-king-gold/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Coins className="h-5 w-5 text-king-gold" />
                    <span className="font-semibold">KFTL Баланс</span>
                  </div>
                  <span className="text-king-gold font-bold text-lg">
                    {displayUser.kftl_balance?.toFixed(1) || '0.0'}
                  </span>
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  Для лайков и взаимодействий
                </div>
              </div>

              <div className="bg-king-darker p-4 rounded-lg border border-king-purple/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-king-purple" />
                    <span className="font-semibold">KFT Баланс</span>
                  </div>
                  <span className="text-king-purple font-bold text-lg">
                    {displayUser.kft_balance?.toFixed(2) || '0.00'}
                  </span>
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  Утилити токен платформы
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Posts Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <User className="h-6 w-6 mr-2 text-king-purple" />
          Посты {isOwnProfile ? 'ваши' : `@${displayUser.username}`}
        </h2>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-4 text-gray-300">
              {isOwnProfile ? 'У вас пока нет постов' : 'Пользователь не публиковал контент'}
            </h3>
            {isOwnProfile && (
              <p className="text-gray-400">
                Создайте свой первый пост, чтобы начать зарабатывать!
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                onUpdate={handlePostUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;