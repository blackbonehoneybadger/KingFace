import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PostCard from '../components/PostCard';
import { RefreshCw, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Feed = () => {
  const { user, getPosts } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const fetchPosts = async (refresh = false) => {
    if (refresh) setRefreshing(true);
    else setLoading(true);
    
    try {
      const fetchedPosts = await getPosts(0, 20);
      setPosts(fetchedPosts || []);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostUpdate = () => {
    fetchPosts(true);
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h1 className="text-3xl font-bold mb-4 text-gray-300">
          Войдите для просмотра ленты
        </h1>
        <p className="text-gray-400">
          Подключите кошелек, чтобы видеть контент и взаимодействовать с постами
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-king-gold to-king-purple bg-clip-text text-transparent">
          Лента
        </h1>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => fetchPosts(true)}
            disabled={refreshing}
            className="p-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
            title="Обновить"
          >
            <RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
          
          <Link
            to="/create"
            className="flex items-center space-x-2 px-4 py-2 bg-king-purple hover:bg-purple-600 text-white rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Создать пост</span>
          </Link>
        </div>
      </div>

      {/* User Balance */}
      <div className="bg-king-dark rounded-xl p-4 mb-6 border border-king-gold/20">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-gray-400">Ваш баланс:</span>
            <span className="ml-2 text-king-gold font-bold text-lg">
              {user.kftl_balance?.toFixed(1) || '0.0'} KFTL
            </span>
          </div>
          <div className="text-sm text-gray-500">
            1 KFTL = 1 лайк
          </div>
        </div>
      </div>

      {/* Posts */}
      {loading ? (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="post-card rounded-xl p-6 animate-pulse">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-600 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/6"></div>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-600 rounded"></div>
                <div className="h-4 bg-gray-600 rounded w-3/4"></div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-8 bg-gray-600 rounded w-20"></div>
                <div className="h-8 bg-gray-600 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold mb-4 text-gray-300">
            Пока нет постов
          </h2>
          <p className="text-gray-400 mb-6">
            Станьте первым, кто создаст контент!
          </p>
          <Link
            to="/create"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-king-purple hover:bg-purple-600 text-white rounded-lg transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Создать первый пост</span>
          </Link>
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

      {/* Load More Button */}
      {posts.length > 0 && posts.length >= 20 && (
        <div className="text-center mt-8">
          <button 
            className="px-6 py-3 bg-king-dark hover:bg-gray-700 text-white rounded-lg transition-colors border border-gray-600"
            onClick={() => {
              // TODO: Implement load more functionality
              console.log('Load more posts');
            }}
          >
            Загрузить еще
          </button>
        </div>
      )}
    </div>
  );
};

export default Feed;