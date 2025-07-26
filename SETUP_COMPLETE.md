# 🎉 KingFace Cursor Agents Setup Complete!

## ✅ Что создано

### 📁 Структура файлов
```
.cursor/
├── rules.md          # Глобальные правила для агентов
├── agents.md         # Описания ролей агентов
├── tickets.md        # Готовые тикеты для разработки
└── setup.md          # Инструкции по настройке

.github/workflows/
└── ci.yml           # GitHub Actions CI/CD

docs/
├── api.md           # API документация
├── database.md      # Схема базы данных
├── deployment.md    # Инструкции по деплою
└── contributing.md  # Руководство контрибьютора

.env.example         # Шаблон переменных окружения
CHANGELOG.md         # История изменений
README.md            # Обновленный README
```

## 🚀 Следующие шаги

### 1. Настройка Cursor Agents

1. **Открой Cursor** и перейди в Settings → Agents
2. **Создай 4 агента** с описаниями из `.cursor/agents.md`:

#### Architect
```
Задача: декомпозировать фичи, проектировать архитектуру, писать спеки и acceptance criteria. 
Выход: список файлов/изменений, диаграммы, API контракты, тест-план.
Не писать реализацию, только план.
```

#### Implementer
```
Задача: реализовать по плану Architect. Писать код, тесты, миграции.
Соблюдать правила .cursor/rules.md. Давать diff, инструкции запуска.
```

#### QA & Tests
```
Задача: генерировать и обновлять unit/e2e тесты, проверять покрытие, писать Playwright сценарии.
Фейлить задачу, если критические кейсы не покрыты.
```

#### Docs/Changelog
```
Задача: обновлять README, CHANGELOG, OpenAPI/Swagger, ER-диаграммы.
Гарантировать, что пользователь может развернуть проект по инструкциям.
```

### 2. Настройка переменных окружения

```bash
# Скопируй шаблон
cp .env.example .env

# Отредактируй .env с твоими значениями
nano .env
```

### 3. Настройка GitHub Secrets

Добавь в GitHub → Settings → Secrets and variables → Actions:

```env
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id
FLY_API_TOKEN=your-fly-token
DATABASE_URL=your-database-url
JWT_SECRET=your-jwt-secret
SOL_RPC=your-solana-rpc
KFTL_MINT=your-token-mint
NFT_STORAGE_KEY=your-nft-storage-key
```

### 4. Первый тикет

Возьми первый тикет из `.cursor/tickets.md`:

```markdown
## Цель
Страница /wallet: баланс KFTL, airdrop, история транзакций

## Контекст
- Важные файлы: frontend/src/app/wallet/page.tsx, frontend/src/components/WalletBalance.tsx
- API: /api/user/wallet, /api/airdrop, /api/transactions
- Технологии: Solana Wallet Adapter, @solana/web3.js

## Acceptance Criteria
- [ ] UI соответствует стилю "гравюра" (tailwind tokens)
- [ ] Отображается баланс KFTL токенов
- [ ] Кнопка Airdrop (только для devnet) с подтверждением
- [ ] История транзакций с пагинацией
- [ ] Loading states и error handling
- [ ] Unit тесты для компонентов
- [ ] Playwright E2E тест
```

## 🛠 Рабочий процесс

### Для каждой фичи:

1. **Architect** → план и спецификация
2. **Implementer** → реализация кода
3. **QA & Tests** → тесты и проверки
4. **Docs/Changelog** → документация

### Шаблон задачи (копируй для каждого тикета):

```markdown
## Цель
(Коротко: что нужно сделать)

## Контекст
- Repo: <ссылка>
- Важные файлы: ...
- Технологии: Next.js + Tailwind + Solana Adapter + FastAPI
- Данные API: /api/user/profile, /api/tx, /api/airdrop

## Acceptance Criteria
- [ ] UI соответствует стилю "гравюра" (tailwind tokens)
- [ ] Баланс и история грузятся из API, обрабатывается loading/error
- [ ] Кнопка Airdrop (devnet) вызывает POST /api/airdrop и обновляет баланс без reload
- [ ] Добавлены unit-тесты для хуков и компонента
- [ ] Playwright тест: клик по Airdrop → баланс увеличился
- [ ] Нет новых пакетов без причины

## Ограничения
- Не менять существующий дизайн токенов
- Не трогать страницы вне scope

## Что отдать на выходе
- Diff изменённых файлов
- Команды для запуска тестов
- Обновление CHANGELOG.md
- Скриншот (или Storybook ссылка) результата
```

## 📋 Готовые тикеты

1. **/wallet страница** (баланс, airdrop, история)
2. **/invite** (генерация ссылки, QR, статистика)
3. **/dashboard** (total likes/nfts/users + API `/api/stats`)
4. **/votes** (список предложений, голосование off-chain)
5. **/market** (листинг поста как NFT, простая покупка)
6. **/lineage/:postId** (Sankey диаграмма, API `/api/lineage`)
7. **Admin mint/burn KFTL** (UI + POST `/api/admin/mint`)
8. **IPFS pinning toggle** (admin, POST `/api/admin/pin`)
9. **404 страница** (уже есть макет — внедрить)
10. **Playwright baseline** (e2e smoke: login → create post → like)

## 🔧 Полезные команды

```bash
# Frontend
cd frontend
npm run dev          # Dev сервер
npm run build        # Сборка
npm run test         # Тесты
npm run test:e2e     # E2E тесты
npm run lint         # Линтер

# Backend
cd backend
python -m uvicorn server:app --reload  # Dev сервер
pytest               # Тесты
pytest --cov=.       # Тесты с покрытием

# Git
git add .
git commit -m "feat(scope): описание фичи"
git push origin feature/название-фичи
```

## 📚 Документация

- [API Documentation](./docs/api.md)
- [Database Schema](./docs/database.md)
- [Deployment Guide](./docs/deployment.md)
- [Contributing Guide](./docs/contributing.md)

## 🎯 Цели проекта

- **Web3 соцсеть** на Solana
- **Платные лайки** (KFTL токены)
- **Владение контентом** (IPFS/NFT)
- **Минимальный маркетплейс**
- **Система голосования** (off-chain)

## 🚀 Технологии

- **Frontend**: Next.js 14, TailwindCSS, Framer Motion
- **Web3**: @solana/web3.js, wallet-adapter, devnet → mainnet
- **Backend**: FastAPI, Supabase, PostgreSQL
- **Storage**: IPFS (NFT.Storage/Pinata)
- **Tests**: Jest/RTL, Pytest, Playwright
- **CI/CD**: GitHub Actions, Vercel, Fly.io

## 🎉 Готово к работе!

Теперь у тебя есть полная настройка Cursor Agents для проекта KingFace. 

**Следующий шаг**: выбери первый тикет и начни разработку с Architect!

---

**Удачи в разработке! 🚀**