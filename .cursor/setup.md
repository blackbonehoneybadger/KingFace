# Настройка Cursor Agents для KingFace

## 1. Создание агентов в Cursor

### Architect
```
Задача: декомпозировать фичи, проектировать архитектуру, писать спеки и acceptance criteria. 
Выход: список файлов/изменений, диаграммы, API контракты, тест-план.
Не писать реализацию, только план.
```

### Implementer
```
Задача: реализовать по плану Architect. Писать код, тесты, миграции.
Соблюдать правила .cursor/rules.md. Давать diff, инструкции запуска.
```

### QA & Tests
```
Задача: генерировать и обновлять unit/e2e тесты, проверять покрытие, писать Playwright сценарии.
Фейлить задачу, если критические кейсы не покрыты.
```

### Docs/Changelog
```
Задача: обновлять README, CHANGELOG, OpenAPI/Swagger, ER-диаграммы.
Гарантировать, что пользователь может развернуть проект по инструкциям.
```

## 2. Шаблон задачи (копируй для каждого тикета)

```md
## Цель
(Коротко: что нужно сделать. Пример: "Страница /wallet: баланс KFTL, airdrop, история транзакций")

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

## 3. Настройка переменных окружения

Создай файл `.env.example` в корне проекта:

```env
# Solana
SOL_RPC=https://api.devnet.solana.com
KFTL_MINT=your_token_mint_address
WALLET_PRIVATE_KEY=your_wallet_private_key

# IPFS
NFT_STORAGE_KEY=your_nft_storage_key
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_KEY=your_pinata_secret_key

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/kingface
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# API
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SOL_RPC=https://api.devnet.solana.com

# Auth
JWT_SECRET=your_jwt_secret
```

## 4. GitHub Secrets для CI/CD

Добавь в GitHub Secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `FLY_API_TOKEN`
- `SOL_RPC`
- `KFTL_MINT`
- `NFT_STORAGE_KEY`
- `DATABASE_URL`
- `JWT_SECRET`

## 5. Первые шаги

1. **Настрой агентов** в Cursor UI
2. **Создай .env файлы** на основе .env.example
3. **Настрой GitHub Secrets**
4. **Возьми первый тикет** из `.cursor/tickets.md`
5. **Выбери Architect** для планирования
6. **Передай Implementer** для реализации
7. **Проверь QA & Tests** для тестирования
8. **Обнови Docs/Changelog** для документации

## 6. Рабочий процесс

### Для каждой фичи:
1. **Architect** → план и спецификация
2. **Implementer** → реализация кода
3. **QA & Tests** → тесты и проверки
4. **Docs/Changelog** → документация

### Проверка качества:
- [ ] Код проходит линтер
- [ ] Все тесты проходят
- [ ] Acceptance criteria выполнены
- [ ] Документация обновлена
- [ ] CHANGELOG.md обновлен

## 7. Полезные команды

```bash
# Frontend
cd frontend
npm run dev          # Запуск dev сервера
npm run build        # Сборка
npm run test         # Unit тесты
npm run test:e2e     # E2E тесты
npm run lint         # Линтер

# Backend
cd backend
python -m uvicorn server:app --reload  # Запуск dev сервера
pytest               # Тесты
pytest --cov=.       # Тесты с покрытием

# Общие
git add .
git commit -m "feat(scope): описание фичи"
git push origin feature/название-фичи
```

## 8. Структура PR

```md
## Описание
Краткое описание изменений

## Acceptance Criteria
- [ ] Критерий 1
- [ ] Критерий 2
- [ ] Критерий 3

## Тестирование
- [ ] Unit тесты проходят
- [ ] E2E тесты проходят
- [ ] Линтер не показывает ошибок

## Скриншоты
[Добавь скриншоты UI]

## Checklist
- [ ] Код соответствует стилю проекта
- [ ] Добавлены/обновлены тесты
- [ ] Обновлена документация
- [ ] Обновлен CHANGELOG.md
```

## 9. Troubleshooting

### Проблемы с Solana:
- Проверь RPC endpoint
- Убедись что кошелек подключен к devnet
- Проверь баланс SOL для транзакций

### Проблемы с IPFS:
- Проверь API ключи
- Убедись что файлы не превышают лимиты
- Проверь статус pinning

### Проблемы с тестами:
- Запусти тесты локально
- Проверь переменные окружения
- Убедись что все зависимости установлены