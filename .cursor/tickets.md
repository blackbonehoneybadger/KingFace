# KingFace – Готовые тикеты

## 1. /wallet страница
**Цель:** Создать страницу кошелька с балансом KFTL, airdrop функционалом и историей транзакций

**Контекст:**
- Важные файлы: `frontend/src/app/wallet/page.tsx`, `frontend/src/components/WalletBalance.tsx`
- API: `/api/user/wallet`, `/api/airdrop`, `/api/transactions`
- Технологии: Solana Wallet Adapter, @solana/web3.js

**Acceptance Criteria:**
- [ ] UI соответствует стилю "гравюра" (tailwind tokens)
- [ ] Отображается баланс KFTL токенов
- [ ] Кнопка Airdrop (только для devnet) с подтверждением
- [ ] История транзакций с пагинацией
- [ ] Loading states и error handling
- [ ] Unit тесты для компонентов
- [ ] Playwright E2E тест

---

## 2. /invite страница
**Цель:** Система приглашений с генерацией ссылок, QR кодов и статистикой

**Контекст:**
- Важные файлы: `frontend/src/app/invite/page.tsx`, `frontend/src/components/InviteLink.tsx`
- API: `/api/invite/generate`, `/api/invite/stats`
- Технологии: QR Code generation, clipboard API

**Acceptance Criteria:**
- [ ] Генерация уникальной invite ссылки
- [ ] QR код для мобильного сканирования
- [ ] Статистика приглашений (количество, конверсия)
- [ ] Копирование ссылки в буфер обмена
- [ ] Валидация invite кодов
- [ ] Тесты для invite логики

---

## 3. /dashboard страница
**Цель:** Админ панель с общей статистикой платформы

**Контекст:**
- Важные файлы: `frontend/src/app/dashboard/page.tsx`, `frontend/src/components/StatsCard.tsx`
- API: `/api/admin/stats`, `/api/admin/users`, `/api/admin/posts`
- Технологии: Charts.js или Recharts для графиков

**Acceptance Criteria:**
- [ ] Общая статистика (пользователи, посты, лайки)
- [ ] Графики активности за период
- [ ] Топ пользователей по активности
- [ ] Фильтры по датам
- [ ] Export данных в CSV
- [ ] Защита роута (только админы)

---

## 4. /votes страница
**Цель:** Система голосования за предложения (off-chain)

**Контекст:**
- Важные файлы: `frontend/src/app/votes/page.tsx`, `frontend/src/components/VoteCard.tsx`
- API: `/api/votes`, `/api/votes/:id`, `/api/votes/:id/vote`
- Технологии: Real-time updates с WebSocket

**Acceptance Criteria:**
- [ ] Список активных предложений
- [ ] Голосование за/против с подтверждением
- [ ] Прогресс голосования в реальном времени
- [ ] Создание новых предложений (админы)
- [ ] История голосований
- [ ] Тесты для vote логики

---

## 5. /market страница
**Цель:** Минимальный маркетплейс для покупки постов как NFT

**Контекст:**
- Важные файлы: `frontend/src/app/market/page.tsx`, `frontend/src/components/NFTListing.tsx`
- API: `/api/market/listings`, `/api/market/buy`
- Технологии: IPFS, Solana NFT minting

**Acceptance Criteria:**
- [ ] Список постов доступных для покупки
- [ ] Детальная страница NFT с метаданными
- [ ] Процесс покупки через Solana wallet
- [ ] Mint NFT на IPFS
- [ ] История покупок
- [ ] Тесты для market логики

---

## 6. /lineage/:postId страница
**Цель:** Sankey диаграмма показывающая "родословную" поста

**Контекст:**
- Важные файлы: `frontend/src/app/lineage/[postId]/page.tsx`, `frontend/src/components/SankeyChart.tsx`
- API: `/api/lineage/:postId`
- Технологии: D3.js или Chart.js для Sankey диаграммы

**Acceptance Criteria:**
- [ ] Sankey диаграмма показывающая связи постов
- [ ] Интерактивные узлы с деталями
- [ ] Фильтры по типу связей
- [ ] Export диаграммы как изображение
- [ ] Оптимизация для больших графов
- [ ] Тесты для lineage логики

---

## 7. Admin mint/burn KFTL
**Цель:** Админ интерфейс для управления KFTL токенами

**Контекст:**
- Важные файлы: `frontend/src/app/admin/tokens/page.tsx`, `frontend/src/components/TokenManager.tsx`
- API: `/api/admin/mint`, `/api/admin/burn`
- Технологии: Solana Token Program

**Acceptance Criteria:**
- [ ] Форма для mint KFTL токенов
- [ ] Форма для burn KFTL токенов
- [ ] История операций mint/burn
- [ ] Валидация адресов кошельков
- [ ] Подтверждение операций
- [ ] Тесты для admin функций

---

## 8. IPFS pinning toggle
**Цель:** Админ управление IPFS pinning для контента

**Контекст:**
- Важные файлы: `frontend/src/app/admin/ipfs/page.tsx`, `frontend/src/components/IPFSManager.tsx`
- API: `/api/admin/ipfs/pin`, `/api/admin/ipfs/unpin`
- Технологии: IPFS API, NFT.Storage

**Acceptance Criteria:**
- [ ] Список загруженного контента
- [ ] Toggle pin/unpin для каждого файла
- [ ] Статистика использования IPFS
- [ ] Bulk операции
- [ ] Мониторинг статуса pinning
- [ ] Тесты для IPFS функций

---

## 9. 404 страница
**Цель:** Красивая 404 страница в стиле проекта

**Контекст:**
- Важные файлы: `frontend/src/app/not-found.tsx`
- Дизайн: Соответствует "гравюра" стилю

**Acceptance Criteria:**
- [ ] Красивый дизайн в стиле проекта
- [ ] Кнопка возврата на главную
- [ ] Поиск по сайту
- [ ] Анимации
- [ ] Адаптивность
- [ ] Тесты для 404 страницы

---

## 10. Playwright baseline
**Цель:** Базовые E2E тесты для основных сценариев

**Контекст:**
- Важные файлы: `frontend/tests/e2e/`, `playwright.config.ts`
- Сценарии: Регистрация, создание поста, лайки

**Acceptance Criteria:**
- [ ] Тест регистрации пользователя
- [ ] Тест создания поста
- [ ] Тест лайка поста
- [ ] Тест подключения кошелька
- [ ] Тест airdrop функционала
- [ ] CI интеграция

---

## Интеграция с Solana / IPFS (подсказки)

### Solana
- **Devnet RPC:** `clusterApiUrl('devnet')` или из `process.env.SOL_RPC`
- **Wallet Adapter:** уже настроен, не дублировать
- **KFTL токен:** MINT в `.env`, методы `transfer`, `mintTo`

### IPFS
- **NFT.Storage SDK:** `npm i nft.storage`
- **API ключ:** в `.env` файле
- **Метаданные:** JSON с описанием NFT

### Переменные окружения
```env
SOL_RPC=https://api.devnet.solana.com
KFTL_MINT=your_token_mint_address
NFT_STORAGE_KEY=your_nft_storage_key
```