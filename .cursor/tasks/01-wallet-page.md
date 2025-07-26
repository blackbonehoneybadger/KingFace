# Задача 1: Страница /wallet

## Цель
Создать страницу /wallet с отображением баланса KFTL, функцией airdrop и историей транзакций

## Контекст
- Repo: KingFace Web3 Social Network
- Важные файлы: 
  - Frontend: `frontend/src/app/wallet/`, `frontend/src/lib/api.ts`
  - Backend: `backend/server.py` (добавить endpoints)
- Технологии: Next.js + Tailwind + Solana Adapter + FastAPI
- Новые API: GET /api/wallet/balance, POST /api/wallet/airdrop, GET /api/wallet/history

## Acceptance Criteria
- [ ] UI соответствует стилю "гравюра" (tailwind tokens из `tailwind.config.js`)
- [ ] Баланс KFTL загружается из API с обработкой loading/error состояний
- [ ] Кнопка Airdrop (devnet) вызывает POST /api/wallet/airdrop и обновляет баланс без reload
- [ ] История транзакций отображается в виде таблицы с пагинацией
- [ ] Добавлены unit-тесты для компонентов и хуков
- [ ] Добавлен E2E тест: клик по Airdrop → баланс увеличился
- [ ] Адаптивный дизайн (mobile-first подход)
- [ ] Обработка ошибок Solana с пользовательскими уведомлениями
- [ ] TypeScript типы для wallet данных

## Ограничения
- Не менять существующий дизайн токенов
- Максимум 300 строк diff в одном PR
- Использовать существующий API клиент из `/lib/api.ts`
- Работать только с devnet

## API Endpoints (новые)
```typescript
GET /api/wallet/balance
Response: { balance: number, address: string }

POST /api/wallet/airdrop
Body: { amount: number }
Response: { success: boolean, newBalance: number, txHash: string }

GET /api/wallet/history?page=1&limit=10
Response: { 
  transactions: Array<{
    id: string,
    type: 'airdrop' | 'like' | 'transfer',
    amount: number,
    timestamp: string,
    txHash?: string
  }>,
  total: number,
  page: number
}
```

## Что отдать на выходе
- [ ] Diff изменённых файлов с комментариями
- [ ] Команды для запуска тестов: `npm test` и `npx playwright test`
- [ ] Обновление CHANGELOG.md
- [ ] Скриншот страницы /wallet
- [ ] Инструкции по проверке работы с devnet

## Дополнительные требования
- Следовать правилам из `.cursor/rules.md`
- Использовать семантические коммиты: `feat(wallet): add balance and airdrop functionality`
- Проверить работу на Solana devnet
- Убедиться в корректной обработке Solana ошибок (недостаток SOL, сеть недоступна)

## Компоненты для создания
- `WalletPage` - основная страница
- `BalanceCard` - карточка с балансом
- `AirdropButton` - кнопка airdrop
- `TransactionHistory` - таблица истории
- `useWallet` - хук для работы с кошельком