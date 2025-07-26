# KingFace

Web3 соцсеть на Solana с платными лайками (KFTL), владением контентом (IPFS/NFT) и минимальным маркетплейсом.

## 🚀 Технологии

- **Frontend**: Next.js 14 (App Router), TailwindCSS, Framer Motion
- **Web3**: @solana/web3.js, wallet-adapter (Phantom), devnet → mainnet
- **Backend**: FastAPI/Supabase (REST), PostgreSQL
- **Storage**: IPFS (NFT.Storage/Pinata)
- **Tests**: Jest/RTL (FE), Pytest (BE), Playwright (E2E)
- **CI**: GitHub Actions; Deploy: Vercel (FE), Fly.io/Supabase (BE)

## 📋 Быстрый старт

### Предварительные требования

- Node.js 18+
- Python 3.11+
- pnpm (рекомендуется)
- Phantom Wallet (для тестирования)

### Установка

1. **Клонируйте репозиторий**
```bash
git clone <your-repo-url>
cd kingface
```

2. **Настройте переменные окружения**
```bash
# Frontend
cp frontend/.env.example frontend/.env.local

# Backend
cp backend/.env.example backend/.env
```

3. **Установите зависимости**
```bash
# Frontend
cd frontend
pnpm install

# Backend
cd ../backend
pip install -r requirements.txt
```

4. **Запустите разработку**
```bash
# Backend (в одном терминале)
cd backend
uvicorn server:app --reload

# Frontend (в другом терминале)
cd frontend
pnpm dev
```

## 🏗️ Архитектура

```
/
├── frontend/          # Next.js приложение
│   ├── src/
│   │   ├── app/       # App Router
│   │   ├── components/
│   │   ├── lib/       # API клиент, утилиты
│   │   └── styles/
│   ├── public/
│   └── package.json
├── backend/           # FastAPI сервер
│   ├── app/
│   ├── requirements.txt
│   └── server.py
├── .cursor/           # Cursor Agents конфигурация
│   ├── rules.md       # Глобальные правила
│   ├── task-template.md
│   ├── tickets.md     # Первые 10 тикетов
│   └── setup-guide.md
└── README.md
```

## 🤖 Cursor Agents

Проект использует Cursor Agents для автоматизации разработки:

### Агенты
- **Architect** - проектирование архитектуры и декомпозиция задач
- **Implementer** - реализация кода и тестов
- **QA & Tests** - создание тестов и проверка качества
- **Docs/Changelog** - обновление документации

### Настройка агентов
Следуйте инструкциям в [`.cursor/setup-guide.md`](.cursor/setup-guide.md)

### Использование
1. Выберите тикет из [`.cursor/tickets.md`](.cursor/tickets.md)
2. Используйте шаблон из [`.cursor/task-template.md`](.cursor/task-template.md)
3. Назначьте подходящего агента

## 🧪 Тестирование

### Frontend тесты
```bash
cd frontend
pnpm test          # Unit тесты
pnpm test:e2e      # E2E тесты (Playwright)
pnpm lint          # Линтер
```

### Backend тесты
```bash
cd backend
pytest             # Unit тесты
pytest --cov=app   # С покрытием
```

## 🚀 Деплой

### Staging (develop branch)
- Frontend: автоматический деплой на Vercel
- Backend: автоматический деплой на Fly.io

### Production (main branch)
- Требует ручного подтверждения
- Автоматические тесты и security scan

## 📝 API Документация

- Swagger UI: `http://localhost:8000/docs` (в разработке)
- OpenAPI спецификация: `http://localhost:8000/openapi.json`

## 🔧 Разработка

### Правила
- Следуйте правилам в [`.cursor/rules.md`](.cursor/rules.md)
- Одна фича = один PR ≤ 300 строк diff
- Всегда пишите тесты
- Обновляйте CHANGELOG.md

### Команды
```bash
# Frontend
pnpm dev          # Разработка
pnpm build        # Сборка
pnpm start        # Продакшн

# Backend
uvicorn server:app --reload  # Разработка
uvicorn server:app           # Продакшн
```

## 📊 Мониторинг

- **Frontend**: Vercel Analytics
- **Backend**: Fly.io Metrics
- **Database**: Supabase Dashboard
- **Errors**: Sentry (планируется)

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте feature branch
3. Следуйте правилам из `.cursor/rules.md`
4. Добавьте тесты
5. Обновите документацию
6. Создайте Pull Request

## 📄 Лицензия

MIT License - см. [LICENSE](LICENSE) файл

## 🆘 Поддержка

- Issues: [GitHub Issues](https://github.com/your-username/kingface/issues)
- Документация: [Wiki](https://github.com/your-username/kingface/wiki)
- Discord: [Сервер сообщества](https://discord.gg/kingface)

---

**KingFace** - Web3 социальная сеть будущего 🚀
