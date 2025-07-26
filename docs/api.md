# API Documentation

## Base URL
- Development: `http://localhost:8000`
- Production: `https://api.kingface.com`

## Authentication
API использует JWT токены для аутентификации.

### Headers
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## Endpoints

### User Management

#### GET /api/user/profile
Получить профиль пользователя

**Response:**
```json
{
  "id": "user_id",
  "username": "username",
  "wallet_address": "solana_wallet_address",
  "kftl_balance": 1000,
  "created_at": "2024-01-01T00:00:00Z"
}
```

#### PUT /api/user/profile
Обновить профиль пользователя

**Request:**
```json
{
  "username": "new_username",
  "bio": "User bio"
}
```

### Wallet

#### GET /api/user/wallet
Получить информацию о кошельке

**Response:**
```json
{
  "kftl_balance": 1000,
  "sol_balance": 1.5,
  "wallet_address": "solana_wallet_address"
}
```

#### POST /api/airdrop
Получить KFTL токены (только devnet)

**Request:**
```json
{
  "amount": 100
}
```

**Response:**
```json
{
  "success": true,
  "transaction_hash": "tx_hash",
  "new_balance": 1100
}
```

### Transactions

#### GET /api/transactions
Получить историю транзакций

**Query Parameters:**
- `page`: номер страницы (default: 1)
- `limit`: количество записей (default: 20)
- `type`: тип транзакции (like, airdrop, transfer)

**Response:**
```json
{
  "transactions": [
    {
      "id": "tx_id",
      "type": "like",
      "amount": 10,
      "from": "wallet_address",
      "to": "wallet_address",
      "timestamp": "2024-01-01T00:00:00Z",
      "status": "confirmed"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

### Posts

#### GET /api/posts
Получить список постов

**Query Parameters:**
- `page`: номер страницы
- `limit`: количество записей
- `user_id`: фильтр по пользователю
- `sort`: сортировка (newest, popular)

#### POST /api/posts
Создать новый пост

**Request:**
```json
{
  "content": "Post content",
  "media_url": "ipfs://hash",
  "tags": ["tag1", "tag2"]
}
```

#### POST /api/posts/{post_id}/like
Поставить лайк посту

**Request:**
```json
{
  "amount": 10
}
```

### Market

#### GET /api/market/listings
Получить список NFT для продажи

#### POST /api/market/listings
Создать листинг NFT

**Request:**
```json
{
  "post_id": "post_id",
  "price": 100,
  "description": "NFT description"
}
```

#### POST /api/market/buy
Купить NFT

**Request:**
```json
{
  "listing_id": "listing_id"
}
```

### Admin

#### GET /api/admin/stats
Получить статистику платформы (только админы)

#### POST /api/admin/mint
Mint KFTL токены (только админы)

**Request:**
```json
{
  "wallet_address": "wallet_address",
  "amount": 1000
}
```

#### POST /api/admin/burn
Burn KFTL токены (только админы)

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation error",
  "details": {
    "field": "error message"
  }
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid token"
}
```

### 403 Forbidden
```json
{
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Rate Limiting
- 100 requests per minute per IP
- 1000 requests per hour per user

## WebSocket Events

### Real-time Updates
```
ws://localhost:8000/ws
```

**Events:**
- `like`: новый лайк
- `post`: новый пост
- `transaction`: новая транзакция
- `balance_update`: обновление баланса