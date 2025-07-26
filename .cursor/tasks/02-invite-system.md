# Задача 2: Система приглашений /invite

## Цель
Создать страницу /invite с генерацией пригласительных ссылок, QR кодами и статистикой приглашений

## Контекст
- Repo: KingFace Web3 Social Network
- Важные файлы: 
  - Frontend: `frontend/src/app/invite/`, `frontend/src/lib/api.ts`
  - Backend: `backend/server.py` (добавить endpoints)
- Технологии: Next.js + Tailwind + QR Code генерация
- Новые API: POST /api/invite/create, GET /api/invite/stats, GET /api/invite/:code

## Acceptance Criteria
- [ ] UI генерации пригласительной ссылки с кнопкой "Создать ссылку"
- [ ] QR код для удобного шаринга (библиотека qrcode.js)
- [ ] Статистика приглашений: всего отправлено, принято, конверсия
- [ ] Копирование ссылки в буфер обмена с уведомлением
- [ ] История созданных приглашений с их статусом
- [ ] Добавлены unit-тесты для компонентов
- [ ] E2E тест: создание ссылки → копирование → проверка QR кода
- [ ] Адаптивный дизайн для мобильных устройств
- [ ] Обработка ошибок API с toast уведомлениями

## Ограничения
- Не более 1 новой зависимости (qrcode.js)
- Максимум 300 строк diff
- Использовать существующий стиль кнопок и карточек

## API Endpoints (новые)
```typescript
POST /api/invite/create
Body: { expires_in?: number } // дни до истечения
Response: { 
  code: string, 
  url: string, 
  expires_at: string,
  qr_data: string 
}

GET /api/invite/stats
Response: {
  total_sent: number,
  total_accepted: number,
  conversion_rate: number,
  recent_invites: Array<{
    code: string,
    created_at: string,
    status: 'pending' | 'accepted' | 'expired',
    accepted_by?: string
  }>
}

GET /api/invite/:code
Response: { 
  valid: boolean,
  expired: boolean,
  already_used: boolean,
  created_by: string
}
```

## Компоненты для создания
- `InvitePage` - основная страница приглашений
- `InviteGenerator` - форма создания приглашения
- `QRCodeDisplay` - компонент отображения QR кода
- `InviteStats` - статистика приглашений
- `InviteHistory` - история приглашений
- `useInvites` - хук для работы с приглашениями