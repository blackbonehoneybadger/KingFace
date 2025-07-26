# KingFace – Cursor Global Rules

## Цель проекта
Web3 соцсеть на Solana с платными лайками (KFTL), владением контентом (IPFS/NFT) и минимальным маркетплейсом.

## Технологии
- Front: Next.js 14 (App Router), TailwindCSS, Framer Motion
- Web3: @solana/web3.js, wallet-adapter (Phantom), devnet → mainnet
- Backend: FastAPI/Supabase (REST), PostgreSQL
- Storage: IPFS (NFT.Storage/Pinata)
- Tests: Jest/RTL (FE), Pytest (BE), Playwright (E2E)
- CI: GitHub Actions; Deploy: Vercel (FE), Fly.io/Supabase (BE)

## Общие правила для агентов
1. **Одна фича = один PR ≤ 300 строк diff.**
2. Не добавляй сторонние библиотеки без обоснования.
3. Соблюдай существующий стиль кода и tailwind-токены ("гравюра/sepia").
4. Всегда пиши/обновляй тесты (unit + e2e, где применимо).
5. Обновляй `CHANGELOG.md` (Docs агент) и описывай шаги деплоя, если нужны миграции.
6. Секреты и ключи не хардкодить. Используй `.env.example` и GitHub Secrets.
7. Все API вызовы через общий клиент (`/lib/api.ts`) – не дублировать.
8. При ошибках возвращай понятный message и HTTP код.
9. На фронте: данные через SWR/React Query, обработка ошибок в UI (toasts).
10. Прогоняй `pnpm lint && pnpm test` локально перед PR.

## Формат коммитов/PR
- `feat(scope): коротко о фиче`
- `fix(scope): что исправлено`
- В PR: чеклист acceptance criteria + скриншоты UI (Storybook/preview)

## Acceptance Criteria (как писать)
- Список проверяемых условий (UI, API, тесты).
- Что считать done (пример ниже в шаблоне).

## Архитектура проекта

### Frontend структура
```
frontend/
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # Переиспользуемые компоненты
│   ├── lib/          # Утилиты, API клиент, константы
│   ├── hooks/        # Кастомные React хуки
│   ├── store/        # Zustand/Redux состояние
│   ├── styles/       # Глобальные стили, Tailwind кастомизация
│   └── types/        # TypeScript типы
├── public/           # Статические файлы
└── tests/           # E2E тесты (Playwright)
```

### Backend структура
```
backend/
├── app/
│   ├── api/          # FastAPI роуты
│   ├── models/       # SQLAlchemy модели
│   ├── services/     # Бизнес логика
│   ├── utils/        # Утилиты, хелперы
│   └── tests/        # Unit тесты (Pytest)
├── migrations/       # Alembic миграции
└── server.py        # Точка входа
```

## Технические детали

### Solana интеграция
- **Devnet RPC:** `clusterApiUrl('devnet')` или из `process.env.NEXT_PUBLIC_SOL_RPC`
- **Wallet Adapter:** уже настроен, не дублировать контекст
- **KFTL токен:** MINT в `.env`, методы `transfer`, `mintTo` на бэке

### IPFS интеграция
- Использовать NFT.Storage SDK (`npm i nft.storage`)
- Ключ в `.env` как `NFT_STORAGE_API_KEY`
- Пинить важный контент через admin панель

### База данных
- PostgreSQL через Supabase
- Миграции через Alembic
- Индексы для частых запросов (user_id, post_id, created_at)

### Стилизация
- Tailwind с кастомной темой "гравюра/sepia"
- Framer Motion для анимаций
- Адаптивный дизайн (mobile-first)

## API Endpoints (текущие)
- `GET /api/user/profile` - профиль пользователя
- `POST /api/posts` - создание поста
- `POST /api/likes` - лайк поста (платный)
- `GET /api/stats` - общая статистика
- `POST /api/airdrop` - airdrop KFTL (devnet)

## Тестирование
- **Unit тесты:** Jest + RTL для компонентов, Pytest для API
- **E2E тесты:** Playwright для критических пользовательских сценариев
- **Минимальное покрытие:** 80% для критических путей
- **Smoke тесты:** login → create post → like → wallet

## Деплой
- **Frontend:** Vercel с автодеплоем из main
- **Backend:** Fly.io или Supabase Edge Functions
- **База:** Supabase PostgreSQL
- **Секреты:** GitHub Secrets + Vercel Environment Variables

## Мониторинг и логирование
- Sentry для ошибок (фронт + бэк)
- Vercel Analytics для метрик
- Структурированные логи в JSON формате