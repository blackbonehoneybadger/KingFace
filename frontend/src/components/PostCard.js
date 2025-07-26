import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Heart, MessageCircle, Share, Clock, Coins } from 'lucide-react';

const PostCard = ({ post, onUpdate }) => {
  const { user, likePost } = useAuth();
  const [liking, setLiking] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (!user || liking || liked) return;

    // Check if user has enough balance
    if (user.kftl_balance < 1) {
      alert('Недостаточно KFTL токенов для лайка');
      return;
    }

    setLiking(true);
    try {
      await likePost(post.id);
      setLiked(true);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Like error:', error);
      const message = error.response?.data?.detail || 'Ошибка при отправке лайка';
      alert(message);
    } finally {
      setLiking(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'только что';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} ч назад`;
    } else {
      return `${Math.floor(diffInHours / 24)} д назад`;
    }
  };

  const getContentTypeIcon = (contentType) => {
    switch (contentType) {
      case 'image': return '🖼️';
      case 'video': return '🎥';
      case 'audio': return '🎵';
      default: return '📝';
    }
  };

  const getContentTypeLabel = (contentType) => {
    switch (contentType) {
      case 'image': return 'Фото';
      case 'video': return 'Видео';
      case 'audio': return 'Аудио';
      default: return 'Текст';
    }
  };

  return (
    <div className="post-card rounded-xl p-6 transition-all hover:shadow-lg">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Author Avatar */}
          <div className="w-10 h-10 bg-gradient-to-br from-king-gold to-king-purple rounded-full flex items-center justify-center font-bold text-king-dark">
            {post.author_username?.[0]?.toUpperCase() || 'A'}
          </div>
          
          {/* Author Info */}
          <div>
            <div className="font-semibold text-white">
              @{post.author_username}
            </div>
            <div className="flex items-center text-sm text-gray-400 space-x-2">
              <Clock className="h-3 w-3" />
              <span>{formatDate(post.created_at)}</span>
              <span>•</span>
              <span className="flex items-center">
                {getContentTypeIcon(post.content_type)}
                <span className="ml-1">{getContentTypeLabel(post.content_type)}</span>
              </span>
            </div>
          </div>
        </div>

        {/* NFT Badge */}
        {post.is_nft && (
          <div className="px-3 py-1 bg-gradient-to-r from-king-gold to-yellow-500 text-king-dark text-xs font-bold rounded-full">
            NFT
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">
          {post.content}
        </p>
        
        {/* Media Preview */}
        {post.media_url && (
          <div className="mt-4 rounded-lg overflow-hidden bg-king-darker border border-gray-700">
            {post.content_type === 'image' ? (
              <img 
                src={post.media_url} 
                alt="Post media" 
                className="w-full h-auto max-h-96 object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div className="p-6 text-center text-gray-400">
                <div className="text-4xl mb-2">
                  {getContentTypeIcon(post.content_type)}
                </div>
                <div>Медиа-файл ({getContentTypeLabel(post.content_type)})</div>
                <div className="text-sm text-gray-500 mt-1">
                  Предпросмотр недоступен
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <div className="flex items-center space-x-6">
          {/* Like Button */}
          <button
            onClick={handleLike}
            disabled={!user || liking || liked}
            className={`like-btn flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              liked
                ? 'bg-pink-500/20 text-pink-400 cursor-not-allowed'
                : liking
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : user && user.kftl_balance >= 1
                ? 'bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 hover:scale-105'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
            title={
              !user 
                ? 'Войдите для лайков' 
                : user.kftl_balance < 1 
                ? 'Недостаточно KFTL токенов' 
                : liked 
                ? 'Already liked' 
                : '1 KFTL за лайк'
            }
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
            <span className="font-semibold">{post.likes_count}</span>
            {user && !liked && (
              <div className="flex items-center text-xs">
                <Coins className="h-3 w-3 ml-1 mr-1" />
                <span>1</span>
              </div>
            )}
          </button>

          {/* Comments */}
          <button 
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-600/10 text-gray-400 hover:bg-gray-600/20 hover:text-gray-300 transition-all"
            disabled
          >
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments_count}</span>
          </button>

          {/* Share */}
          <button 
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-600/10 text-gray-400 hover:bg-gray-600/20 hover:text-gray-300 transition-all"
            disabled
          >
            <Share className="h-4 w-4" />
          </button>
        </div>

        {/* Earnings Display */}
        {post.likes_count > 0 && (
          <div className="text-sm text-green-400 font-semibold">
            ${(post.likes_count * 0.9).toFixed(2)} заработано
          </div>
        )}
      </div>

      {/* Like Status */}
      {!user && (
        <div className="mt-3 text-center text-sm text-gray-500">
          Войдите для взаимодействия с постами
        </div>
      )}
      
      {user && user.kftl_balance < 1 && (
        <div className="mt-3 text-center text-sm text-orange-400">
          Недостаточно KFTL токенов для лайков
        </div>
      )}

      {liked && (
        <div className="mt-3 text-center text-sm text-pink-400">
          ❤️ Вы поставили лайк этому посту
        </div>
      )}
    </div>
  );
};

export default PostCard;