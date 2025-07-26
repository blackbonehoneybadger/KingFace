# KingFace

Web3 соцсеть на Solana с платными лайками (KFTL), владением контентом (IPFS/NFT) и минимальным маркетплейсом.

## 🚀 Быстрый старт

### Предварительные требования
- Node.js 18+
- Python 3.11+
- PostgreSQL
- Solana CLI (опционально)

### Установка

1. **Клонируй репозиторий**
```bash
git clone <your-repo-url>
cd kingface
```

2. **Настрой переменные окружения**
```bash
cp .env.example .env
# Отредактируй .env файл с твоими значениями
```

3. **Установи зависимости**
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
pip install -r requirements.txt
```

4. **Запусти проект**
```bash
# Backend (в одном терминале)
cd backend
python -m uvicorn server:app --reload

# Frontend (в другом терминале)
cd frontend
npm run dev
```

## 🛠 Cursor Agents Setup

Этот проект использует Cursor Agents для автоматизации разработки.

### Настройка агентов

1. **Открой Cursor** и перейди в Settings → Agents
2. **Создай 4 агента** с описаниями из `.cursor/agents.md`
3. **Добавь правила** из `.cursor/rules.md`

### Агенты

- **Architect** - планирование и архитектура
- **Implementer** - реализация кода
- **QA & Tests** - тестирование
- **Docs/Changelog** - документация

### Рабочий процесс

1. **Возьми тикет** из `.cursor/tickets.md`
2. **Выбери Architect** для планирования
3. **Передай Implementer** для реализации
4. **Проверь QA & Tests** для тестирования
5. **Обнови Docs/Changelog** для документации

## 📁 Структура проекта

```
/
├── frontend/              # Next.js приложение
│   ├── src/
│   │   ├── app/          # App Router страницы
│   │   ├── components/   # React компоненты
│   │   ├── lib/          # Утилиты и API клиент
│   │   └── styles/       # CSS стили
│   ├── public/           # Статические файлы
│   └── tests/            # Тесты
├── backend/              # FastAPI сервер
│   ├── api/             # API endpoints
│   ├── models/          # Модели данных
│   ├── services/        # Бизнес логика
│   └── tests/           # Тесты
├── .cursor/             # Cursor Agents конфигурация
├── .github/             # GitHub Actions
└── docs/               # Документация
```

## 🧪 Тестирование

### Frontend тесты
```bash
cd frontend
npm run test          # Unit тесты
npm run test:e2e      # E2E тесты с Playwright
npm run lint          # Линтер
```

### Backend тесты
```bash
cd backend
pytest               # Unit тесты
pytest --cov=.       # Тесты с покрытием
```

## 🚀 Деплой

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

### Backend (Fly.io)
```bash
cd backend
flyctl deploy
```

## 🔧 Разработка

### Команды

```bash
# Frontend
npm run dev          # Dev сервер
npm run build        # Сборка
npm run test         # Тесты
npm run lint         # Линтер

# Backend
python -m uvicorn server:app --reload  # Dev сервер
pytest               # Тесты
```

### Git workflow

```bash
git add .
git commit -m "feat(scope): описание фичи"
git push origin feature/название-фичи
```

## 📚 Документация

- [API Documentation](./docs/api.md)
- [Database Schema](./docs/database.md)
- [Deployment Guide](./docs/deployment.md)
- [Contributing Guide](./docs/contributing.md)

## 🤝 Contributing

1. Создай feature branch
2. Используй Cursor Agents для разработки
3. Напиши тесты
4. Обнови документацию
5. Создай Pull Request

## 📄 Лицензия

MIT License - см. [LICENSE](LICENSE) файл.

## 🆘 Поддержка

- [Issues](https://github.com/your-repo/issues)
- [Discussions](https://github.com/your-repo/discussions)
- [Documentation](./docs/)

---

**Создано с ❤️ для Web3 сообщества**
