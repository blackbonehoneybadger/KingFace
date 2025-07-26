import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Image, Video, Music, Type, Send } from 'lucide-react';

const CreatePost = () => {
  const navigate = useNavigate();
  const { user, createPost } = useAuth();
  const [formData, setFormData] = useState({
    content: '',
    contentType: 'text',
    mediaData: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const contentTypes = [
    { id: 'text', label: 'Текст', icon: Type, color: 'text-gray-400' },
    { id: 'image', label: 'Фото', icon: Image, color: 'text-blue-400' },
    { id: 'video', label: 'Видео', icon: Video, color: 'text-red-400' },
    { id: 'audio', label: 'Аудио', icon: Music, color: 'text-green-400' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.content.trim()) {
      setError('Добавьте текст к посту');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createPost(
        formData.content.trim(),
        formData.contentType,
        formData.mediaData
      );
      
      navigate('/feed');
    } catch (error) {
      console.error('Create post error:', error);
      setError('Ошибка при создании поста. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  const handleContentTypeChange = (type) => {
    setFormData({
      ...formData,
      contentType: type,
      mediaData: '', // Reset media data when changing type
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Файл слишком большой. Максимальный размер: 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData({
        ...formData,
        mediaData: event.target.result,
      });
    };
    reader.readAsDataURL(file);
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h1 className="text-3xl font-bold mb-4 text-gray-300">
          Войдите для создания постов
        </h1>
        <p className="text-gray-400">
          Подключите кошелек, чтобы публиковать контент
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-king-gold to-king-purple bg-clip-text text-transparent">
        Создать пост
      </h1>

      <div className="post-card rounded-xl p-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Content Type Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Тип контента
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {contentTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = formData.contentType === type.id;
                
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleContentTypeChange(type.id)}
                    className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-king-purple bg-king-purple/10 text-king-purple'
                        : 'border-gray-600 hover:border-gray-500 text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    <Icon className="h-6 w-6 mb-2" />
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Media Upload */}
          {formData.contentType !== 'text' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Загрузить {contentTypes.find(t => t.id === formData.contentType)?.label.toLowerCase()}
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors">
                <input
                  type="file"
                  id="mediaUpload"
                  className="hidden"
                  accept={
                    formData.contentType === 'image' ? 'image/*' :
                    formData.contentType === 'video' ? 'video/*' :
                    formData.contentType === 'audio' ? 'audio/*' : '*'
                  }
                  onChange={handleFileUpload}
                  disabled={loading}
                />
                <label
                  htmlFor="mediaUpload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  {formData.mediaData ? (
                    <div className="text-green-400">
                      ✓ Файл выбран
                    </div>
                  ) : (
                    <>
                      <div className="text-4xl mb-2">📁</div>
                      <span className="text-gray-400">
                        Нажмите для выбора файла
                      </span>
                      <span className="text-sm text-gray-500 mt-1">
                        Максимальный размер: 10MB
                      </span>
                    </>
                  )}
                </label>
              </div>
            </div>
          )}

          {/* Content Text */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-3">
              Текст поста *
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="О чем хотите рассказать?"
              rows={6}
              className="w-full px-4 py-3 bg-king-darker border border-gray-600 rounded-lg focus:border-king-purple focus:outline-none transition-colors resize-none"
              disabled={loading}
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {formData.content.length} символов
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-4">
            <div className="text-sm text-gray-400">
              💡 Хороший контент получает больше лайков и доходов
            </div>
            
            <button
              type="submit"
              disabled={loading || !formData.content.trim()}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-king-purple to-purple-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Send className="h-4 w-4" />
              <span>{loading ? 'Публикация...' : 'Опубликовать'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Tips */}
      <div className="mt-8 p-6 bg-king-dark/50 rounded-xl border border-king-gold/20">
        <h3 className="text-lg font-semibold text-king-gold mb-4">
          💡 Советы для успешного контента
        </h3>
        <ul className="space-y-2 text-gray-300">
          <li>• Создавайте оригинальный и качественный контент</li>
          <li>• Используйте яркие изображения и привлекательные заголовки</li>
          <li>• Взаимодействуйте с сообществом - ставьте лайки и комментируйте</li>
          <li>• Регулярно публикуйтесь для роста аудитории</li>
        </ul>
      </div>
    </div>
  );
};

export default CreatePost;