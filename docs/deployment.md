# Deployment Guide

## Обзор

KingFace деплоится на:
- **Frontend**: Vercel
- **Backend**: Fly.io
- **Database**: Supabase/PostgreSQL
- **Storage**: IPFS (NFT.Storage/Pinata)

## Предварительные требования

### Аккаунты и API ключи
- [Vercel](https://vercel.com) аккаунт
- [Fly.io](https://fly.io) аккаунт
- [Supabase](https://supabase.com) проект
- [NFT.Storage](https://nft.storage) API ключ
- [Pinata](https://pinata.cloud) API ключи (опционально)

### Локальная настройка
```bash
# Установи CLI инструменты
npm install -g vercel
curl -L https://fly.io/install.sh | sh
```

## Frontend (Vercel)

### 1. Подготовка проекта
```bash
cd frontend
npm run build
```

### 2. Настройка переменных окружения
В Vercel Dashboard → Settings → Environment Variables:

```env
NEXT_PUBLIC_API_URL=https://your-backend.fly.dev
NEXT_PUBLIC_SOL_RPC=https://api.devnet.solana.com
NEXT_PUBLIC_APP_NAME=KingFace
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### 3. Деплой
```bash
# Первый деплой
vercel

# Последующие деплои
vercel --prod
```

### 4. Настройка домена (опционально)
1. Перейди в Vercel Dashboard → Domains
2. Добавь свой домен
3. Настрой DNS записи

## Backend (Fly.io)

### 1. Создание fly.toml
```bash
cd backend
flyctl launch
```

### 2. Настройка fly.toml
```toml
app = "kingface-backend"
primary_region = "iad"

[build]
  dockerfile = "Dockerfile"

[env]
  PORT = "8000"

[http_service]
  internal_port = 8000
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0
  processes = ["app"]

[[http_service.checks]]
  grace_period = "10s"
  interval = "30s"
  method = "GET"
  timeout = "5s"
  path = "/health"
```

### 3. Создание Dockerfile
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 4. Настройка секретов
```bash
flyctl secrets set DATABASE_URL="postgresql://..."
flyctl secrets set JWT_SECRET="your-secret"
flyctl secrets set SOL_RPC="https://api.devnet.solana.com"
flyctl secrets set KFTL_MINT="your-token-mint"
flyctl secrets set NFT_STORAGE_KEY="your-nft-storage-key"
```

### 5. Деплой
```bash
flyctl deploy
```

## Database (Supabase)

### 1. Создание проекта
1. Перейди на [Supabase](https://supabase.com)
2. Создай новый проект
3. Запиши connection string

### 2. Миграции
```sql
-- Создание таблиц
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  wallet_address VARCHAR(44) UNIQUE NOT NULL,
  kftl_balance DECIMAL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  media_url TEXT,
  ipfs_hash TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  type VARCHAR(20) NOT NULL,
  amount DECIMAL NOT NULL,
  tx_hash VARCHAR(64),
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  post_id UUID REFERENCES posts(id),
  amount DECIMAL NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);
```

### 3. RLS (Row Level Security)
```sql
-- Включить RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Политики для users
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Политики для posts
CREATE POLICY "Anyone can view posts" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Users can create posts" ON posts
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
```

## IPFS Storage

### 1. NFT.Storage
```bash
# Получи API ключ на https://nft.storage
# Добавь в переменные окружения
NFT_STORAGE_KEY=your-api-key
```

### 2. Pinata (опционально)
```bash
# Получи API ключи на https://pinata.cloud
PINATA_API_KEY=your-api-key
PINATA_SECRET_KEY=your-secret-key
```

## CI/CD (GitHub Actions)

### 1. Настройка секретов
В GitHub → Settings → Secrets and variables → Actions:

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

### 2. Автоматический деплой
- Push в `main` → деплой в production
- Pull Request → деплой preview

## Мониторинг

### 1. Vercel Analytics
- Включи в Vercel Dashboard
- Настрой события

### 2. Fly.io Monitoring
```bash
# Просмотр логов
flyctl logs

# Мониторинг метрик
flyctl status
```

### 3. Supabase Monitoring
- Перейди в Supabase Dashboard → Logs
- Настрой алерты

## Troubleshooting

### Проблемы с деплоем
```bash
# Проверь логи
flyctl logs
vercel logs

# Перезапусти сервисы
flyctl restart
```

### Проблемы с базой данных
```bash
# Проверь подключение
flyctl ssh console
psql $DATABASE_URL

# Запусти миграции
python -m alembic upgrade head
```

### Проблемы с IPFS
- Проверь API ключи
- Убедись что файлы не превышают лимиты
- Проверь статус pinning

## Production Checklist

- [ ] Все переменные окружения настроены
- [ ] SSL сертификаты активны
- [ ] База данных настроена и протестирована
- [ ] IPFS storage работает
- [ ] Мониторинг настроен
- [ ] Бэкапы настроены
- [ ] Rate limiting настроен
- [ ] CORS настроен правильно
- [ ] Тесты проходят в CI
- [ ] Документация обновлена