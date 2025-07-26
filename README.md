# KingFace 👑

> Web3 социальная сеть на Solana с платными лайками (KFTL), владением контентом через NFT и минимальным маркетплейсом

## 🚀 Быстрый старт

### Требования
- Node.js 18+
- Python 3.11+
- PostgreSQL 15+
- Redis (опционально)

### Установка

1. **Клонируйте репозиторий:**
```bash
git clone https://github.com/your-org/kingface.git
cd kingface
```

2. **Настройте backend:**
```bash
cd backend
cp .env.example .env
# Отредактируйте .env файл с вашими настройками
pip install -r requirements.txt
python server.py
```

3. **Настройте frontend:**
```bash
cd frontend
cp .env.example .env.local
# Отредактируйте .env.local файл
npm install
npm run dev
```

4. **Откройте приложение:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 🏗️ Архитектура

### Tech Stack
- **Frontend:** Next.js 14, TailwindCSS, Framer Motion
- **Backend:** FastAPI, PostgreSQL, SQLAlchemy
- **Blockchain:** Solana (devnet → mainnet)
- **Storage:** IPFS (NFT.Storage/Pinata)
- **Tests:** Jest/RTL, Pytest, Playwright

### Структура проекта
```
kingface/
├── frontend/           # Next.js приложение
│   ├── src/app/       # App Router страницы
│   ├── src/components/ # React компоненты
│   └── src/lib/       # Утилиты и API клиент
├── backend/           # FastAPI сервер
│   ├── app/          # Основной код
│   └── server.py     # Точка входа
└── .cursor/          # Настройки Cursor Agents
```

## 🤖 Cursor Agents

Проект использует 4 агента для автоматизации разработки:

- **Architect** - планирование архитектуры и фич
- **Implementer** - написание кода
- **QA & Tests** - тестирование и контроль качества  
- **Docs/Changelog** - документация и changelog

### Использование агентов
1. Скопируйте содержимое `.cursor/rules.md` в Cursor Rules
2. Создайте 4 агента с промптами из `.cursor/agents.md`
3. Используйте шаблон из `.cursor/task-template.md` для задач

## 📋 Готовые задачи

В папке `.cursor/tasks/` находятся готовые задачи для агентов:

1. **01-wallet-page.md** - Страница кошелька с балансом и airdrop
2. **02-invite-system.md** - Система приглашений с QR кодами
3. *Еще 8 задач планируется...*

## 🧪 Тестирование

```bash
# Frontend тесты
cd frontend
npm run test              # Unit тесты
npm run test:e2e         # E2E тесты (Playwright)
npm run lint             # Линтер

# Backend тесты  
cd backend
pytest                   # Unit тесты
pytest --cov=app        # С покрытием
```

## 🚢 Деплой

### Production
- **Frontend:** Vercel (автодеплой из main)
- **Backend:** Fly.io или Supabase Edge Functions
- **База:** Supabase PostgreSQL

### CI/CD
GitHub Actions автоматически:
- Запускает тесты на каждый PR
- Деплоит в продакшн при мерже в main
- Проверяет безопасность кода

## 🔧 Разработка

### Стиль кода
- **Frontend:** Prettier + ESLint
- **Backend:** Black + Flake8
- **Коммиты:** Conventional Commits (`feat:`, `fix:`)

### Правила
- Одна фича = один PR ≤ 300 строк
- Обязательные тесты для новых фич
- Следовать acceptance criteria
- Обновлять CHANGELOG.md

## 📚 API Документация

Swagger UI доступен по адресу: http://localhost:8000/docs

### Основные endpoints:
- `GET /api/user/profile` - профиль пользователя
- `POST /api/posts` - создание поста
- `POST /api/likes` - лайк поста (платный KFTL)
- `POST /api/wallet/airdrop` - airdrop токенов (devnet)

## 🎨 UI/UX

Дизайн в стиле "гравюра/sepia" с использованием:
- Кастомные Tailwind токены
- Framer Motion для анимаций
- Адаптивный дизайн (mobile-first)

## 🔐 Безопасность

- Все секреты в `.env` файлах
- CORS настроен для production доменов
- Rate limiting на API endpoints
- Sentry для мониторинга ошибок

## 🤝 Вклад в проект

1. Форкните проект
2. Создайте feature ветку (`git checkout -b feature/amazing-feature`)
3. Используйте Cursor Agents для разработки
4. Следуйте acceptance criteria из задач
5. Создайте Pull Request

## 📄 Лицензия

MIT License - см. [LICENSE](LICENSE) файл

## 📞 Поддержка

- Email: support@kingface.app
- Discord: [KingFace Community](https://discord.gg/kingface)
- Docs: [docs.kingface.app](https://docs.kingface.app)
