import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Crown, Users, Heart, TrendingUp, Zap, Coins } from 'lucide-react';

const Home = () => {
  const { user, getStats } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const platformStats = await getStats();
      setStats(platformStats);
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Animated Crown */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Crown className="h-20 w-20 text-king-gold animate-pulse-slow" />
              <div className="absolute inset-0 animate-ping">
                <Crown className="h-20 w-20 text-king-gold opacity-20" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-king-gold via-yellow-400 to-king-purple bg-clip-text text-transparent">
              KingFace
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-4 font-medium">
            Владеешь контентом. Получаешь токены. Строишь комьюнити.
          </p>
          
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Первая Web3 социальная сеть на Solana с системой платных лайков и NFT контентом
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <>
                <Link
                  to="/feed"
                  className="px-8 py-4 bg-gradient-to-r from-king-purple to-purple-600 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  Открыть ленту
                </Link>
                <Link
                  to="/create"
                  className="px-8 py-4 bg-gradient-to-r from-king-gold to-yellow-500 text-king-dark font-semibold rounded-xl hover:from-yellow-400 hover:to-yellow-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  Создать пост
                </Link>
              </>
            ) : (
              <div className="text-gray-400">
                Подключите кошелек для начала работы
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-king-darker to-king-dark">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-king-gold to-king-purple bg-clip-text text-transparent">
              Особенности платформы
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="post-card p-8 rounded-xl text-center hover:glow-purple">
              <div className="flex justify-center mb-4">
                <Coins className="h-12 w-12 text-king-gold" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-king-gold">Платные лайки</h3>
              <p className="text-gray-300">
                Каждый лайк стоит 1 KFTL токен. Авторы получают 90% от лайков, создавая реальный доход.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="post-card p-8 rounded-xl text-center hover:glow-purple">
              <div className="flex justify-center mb-4">
                <Zap className="h-12 w-12 text-king-purple" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-king-purple">NFT контент</h3>
              <p className="text-gray-300">
                Превращайте свои посты в NFT. Торгуйте, сдавайте в аренду или коллекционируйте уникальный контент.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="post-card p-8 rounded-xl text-center hover:glow-purple">
              <div className="flex justify-center mb-4">
                <TrendingUp className="h-12 w-12 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-green-400">Стейкинг и доходы</h3>
              <p className="text-gray-300">
                Зарабатывайте пассивный доход, стейкая NFT или получая долю от активности платформы.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {stats && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Статистика платформы
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-king-gold mb-2">
                  {stats.users_count}
                </div>
                <div className="text-gray-400 flex items-center justify-center">
                  <Users className="h-4 w-4 mr-2" />
                  Пользователей
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-king-purple mb-2">
                  {stats.posts_count}
                </div>
                <div className="text-gray-400">
                  Постов создано
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-pink-400 mb-2">
                  {stats.likes_count}
                </div>
                <div className="text-gray-400 flex items-center justify-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Лайков поставлено
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <div className="text-xl font-semibold text-green-400">
                ${stats.total_kftl_spent?.toFixed(2) || '0.00'} выплачено авторам
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="py-20 px-4 bg-gradient-to-b from-king-dark to-king-darker">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            <span className="bg-gradient-to-r from-king-gold to-king-purple bg-clip-text text-transparent">
              Как это работает
            </span>
          </h2>

          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold mb-4 text-king-gold">1. Подключите кошелек</h3>
                <p className="text-gray-300">
                  Используйте Phantom или другой Solana кошелек для входа в платформу
                </p>
              </div>
              <div className="w-8 h-8 bg-king-gold rounded-full flex items-center justify-center text-king-dark font-bold">
                1
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold mb-4 text-king-purple">2. Создавайте контент</h3>
                <p className="text-gray-300">
                  Публикуйте посты, фото, видео. Лучший контент получает больше лайков
                </p>
              </div>
              <div className="w-8 h-8 bg-king-purple rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold mb-4 text-green-400">3. Зарабатывайте токены</h3>
                <p className="text-gray-300">
                  Получайте KFTL токены за каждый лайк. Конвертируйте в реальные деньги
                </p>
              </div>
              <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-king-dark font-bold">
                3
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готовы начать зарабатывать на контенте?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Присоединяйтесь к революции в социальных сетях
          </p>
          
          {!user && (
            <div className="text-king-gold font-semibold">
              Подключите кошелек в правом верхнем углу
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;