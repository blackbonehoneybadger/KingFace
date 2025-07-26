# Пример тикета: /wallet страница

## Цель
Создать страницу /wallet с балансом KFTL токенов, функцией airdrop и историей транзакций

## Контекст
- Repo: https://github.com/your-username/kingface
- Важные файлы: `frontend/src/app/wallet/page.tsx`, `backend/app/routes/wallet.py`
- Технологии: Next.js + Tailwind + Solana Adapter + FastAPI
- Данные API: `/api/wallet/balance`, `/api/wallet/airdrop`, `/api/wallet/history`

## Acceptance Criteria
- [ ] UI соответствует стилю "гравюра" (tailwind tokens)
- [ ] Отображение баланса KFTL токенов из API
- [ ] Кнопка Airdrop (только devnet) с подтверждением
- [ ] Таблица истории транзакций с пагинацией
- [ ] Loading states и error handling для всех API вызовов
- [ ] Добавлены unit-тесты для компонентов и хуков
- [ ] Playwright тест: клик по Airdrop → баланс увеличился
- [ ] Нет новых пакетов без обоснования
- [ ] Обновлен CHANGELOG.md

## Ограничения
- Не менять существующий дизайн токенов
- Не трогать страницы вне scope
- Использовать только devnet для airdrop

## Что отдать на выходе
- Diff изменённых файлов
- Команды для запуска тестов
- Обновление CHANGELOG.md
- Скриншот (или Storybook ссылка) результата

---

## Рабочий процесс с агентами

### 1. Architect (первый агент)
```
Задача: Спроектировать архитектуру страницы /wallet

Используй шаблон из .cursor/task-template.md и создай:
1. Список файлов для изменения
2. API контракты
3. Компонентную структуру
4. План тестирования
```

### 2. Implementer (второй агент)
```
Задача: Реализовать страницу /wallet по плану Architect

Используй план от Architect и правила из .cursor/rules.md:
1. Создай компоненты
2. Напиши API интеграцию
3. Добавь тесты
4. Проверь линтер
```

### 3. QA & Tests (третий агент)
```
Задача: Создать E2E тесты для страницы /wallet

Проверь:
1. Покрытие unit тестами
2. E2E сценарии на Playwright
3. Edge cases
4. Accessibility
```

### 4. Docs/Changelog (четвертый агент)
```
Задача: Обновить документацию для новой фичи /wallet

Обнови:
1. CHANGELOG.md
2. API документацию
3. README если нужно
4. Инструкции по деплою
```

---

## Ожидаемый результат

После выполнения всех агентов у нас будет:

### Frontend
- `frontend/src/app/wallet/page.tsx` - основная страница
- `frontend/src/components/wallet/` - компоненты
- `frontend/src/lib/api/wallet.ts` - API клиент
- `frontend/src/__tests__/wallet/` - тесты

### Backend
- `backend/app/routes/wallet.py` - API endpoints
- `backend/app/models/wallet.py` - модели данных
- `backend/tests/test_wallet.py` - тесты

### Документация
- Обновленный CHANGELOG.md
- API документация
- Скриншоты UI

### Тесты
- Unit тесты для всех компонентов
- E2E тесты на Playwright
- Покрытие > 80%