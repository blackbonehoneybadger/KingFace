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

## Структура проекта
```
/
├── frontend/          # Next.js приложение
├── backend/           # FastAPI сервер
├── .cursor/           # Cursor Agents конфигурация
└── docs/             # Документация
```

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

## Стиль кода
- Frontend: TypeScript, функциональные компоненты, хуки
- Backend: Python, FastAPI, async/await
- CSS: TailwindCSS с кастомными токенами для "гравюра" стиля
- Тесты: Jest + React Testing Library (FE), Pytest (BE)

## Безопасность
- Все API ключи в `.env` файлах
- Валидация входных данных на BE
- CORS настройки для production
- Rate limiting для API endpoints