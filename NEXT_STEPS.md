# Следующие шаги для KingFace

## ✅ Что уже сделано

1. **Создана структура Cursor Agents**:
   - `.cursor/rules.md` - глобальные правила
   - `.cursor/task-template.md` - шаблон задач
   - `.cursor/tickets.md` - первые 10 тикетов
   - `.cursor/setup-guide.md` - инструкции по настройке
   - `.cursor/example-ticket.md` - пример тикета

2. **Настроен CI/CD**:
   - `.github/workflows/ci.yml` - GitHub Actions
   - Автоматические тесты и деплой

3. **Документация**:
   - `README.md` - полное описание проекта
   - `CHANGELOG.md` - история изменений

## 🎯 Что делать дальше

### 1. Настройка агентов в Cursor (5 минут)

Открой Cursor → Settings → Agents и создай 4 агента:

#### Architect
```
Name: Architect
Description: Декомпозирует фичи, проектирует архитектуру, пишет спеки и acceptance criteria
Instructions: |
  Ты архитектор проекта KingFace. Твоя задача:
  1. Анализировать требования и декомпозировать их на задачи
  2. Проектировать архитектуру решений
  3. Писать технические спецификации
  4. Определять acceptance criteria
  5. Создавать планы тестирования
  
  НЕ пиши код реализации, только планы и спецификации.
  
  Используй правила из .cursor/rules.md
```

#### Implementer
```
Name: Implementer
Description: Реализует код по плану Architect, пишет тесты и миграции
Instructions: |
  Ты разработчик проекта KingFace. Твоя задача:
  1. Реализовывать код по плану Architect
  2. Писать unit и integration тесты
  3. Создавать миграции БД если нужно
  4. Соблюдать правила из .cursor/rules.md
  5. Давать инструкции по запуску
  
  Всегда включай тесты в реализацию.
  Следуй существующему стилю кода.
```

#### QA & Tests
```
Name: QA & Tests
Description: Генерирует тесты, проверяет покрытие, пишет E2E сценарии
Instructions: |
  Ты QA инженер проекта KingFace. Твоя задача:
  1. Генерировать unit тесты для компонентов
  2. Писать E2E тесты на Playwright
  3. Проверять покрытие кода тестами
  4. Создавать тест-планы
  5. Фейлить задачи если критические кейсы не покрыты
  
  Используй Jest + RTL для фронта, Pytest для бэка.
```

#### Docs/Changelog
```
Name: Docs/Changelog
Description: Обновляет документацию, CHANGELOG, API спецификации
Instructions: |
  Ты технический писатель проекта KingFace. Твоя задача:
  1. Обновлять README.md
  2. Ведение CHANGELOG.md
  3. Документировать API (OpenAPI/Swagger)
  4. Создавать ER-диаграммы
  5. Писать инструкции по деплою
  
  Гарантируй, что пользователь может развернуть проект по документации.
```

### 2. Настройка GitHub Secrets (10 минут)

Добавь в GitHub Secrets (Settings → Secrets and variables → Actions):

```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id
FLY_API_TOKEN=your_fly_token
DATABASE_URL=your_database_url
SOLANA_RPC=your_solana_rpc_url
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_SOLANA_RPC=your_solana_rpc_url
```

### 3. Первый тикет (30 минут)

Используй пример из `.cursor/example-ticket.md`:

1. **Скопируй тикет** в Cursor
2. **Выбери агента Architect**
3. **Получи план архитектуры**
4. **Передай план агенту Implementer**
5. **Получи код и тесты**
6. **Проверь результат**

### 4. Настройка окружения (15 минут)

Создай файлы `.env.example`:

#### Frontend (.env.example)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SOLANA_RPC=https://api.devnet.solana.com
NEXT_PUBLIC_NETWORK=devnet
```

#### Backend (.env.example)
```bash
DATABASE_URL=postgresql://user:pass@localhost/kingface
SOLANA_RPC=https://api.devnet.solana.com
JWT_SECRET=your_jwt_secret
IPFS_API_KEY=your_ipfs_key
```

### 5. Первые команды для тестирования

```bash
# Frontend
cd frontend
pnpm install
pnpm dev

# Backend
cd backend
pip install -r requirements.txt
uvicorn server:app --reload
```

## 🚀 Готовые тикеты для работы

### Высокий приоритет (начать с них):
1. **/wallet страница** - баланс KFTL, airdrop, история
2. **/invite страница** - реферальные ссылки, QR коды
3. **Playwright baseline** - E2E тесты

### Средний приоритет:
4. **/dashboard страница** - админ панель
5. **/votes страница** - система голосования
6. **404 страница** - красивая страница ошибки

### Низкий приоритет:
7. **/market страница** - NFT маркетплейс
8. **/lineage/:postId** - Sankey диаграмма
9. **Admin mint/burn KFTL** - админ управление
10. **IPFS pinning toggle** - управление контентом

## 📋 Чеклист готовности

- [ ] Агенты созданы в Cursor
- [ ] GitHub Secrets настроены
- [ ] Окружение настроено
- [ ] Первый тикет выполнен
- [ ] CI/CD работает
- [ ] Документация актуальна

## 🎉 Результат

После выполнения всех шагов у тебя будет:

✅ **Полностью настроенная система разработки** с Cursor Agents  
✅ **Автоматизированный CI/CD** с тестами и деплоем  
✅ **Готовые тикеты** для быстрого старта  
✅ **Документация** для команды  
✅ **Первая фича** реализована  

## 🆘 Если что-то не работает

1. **Проверь правила** в `.cursor/rules.md`
2. **Посмотри пример** в `.cursor/example-ticket.md`
3. **Создай issue** в GitHub
4. **Обратись к документации** в `.cursor/setup-guide.md`

---

**Удачи с KingFace! 🚀**