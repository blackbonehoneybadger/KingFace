# Contributing Guide

## Привет! 👋

Спасибо за интерес к проекту KingFace! Мы рады любым вкладам в развитие проекта.

## 🚀 Быстрый старт

### 1. Форк и клонирование
```bash
# Форкни репозиторий на GitHub
# Затем клонируй свой форк
git clone https://github.com/YOUR_USERNAME/kingface.git
cd kingface
```

### 2. Настройка окружения
```bash
# Установи зависимости
cd frontend && npm install
cd ../backend && pip install -r requirements.txt

# Скопируй переменные окружения
cp .env.example .env
# Отредактируй .env с твоими значениями
```

### 3. Запуск проекта
```bash
# Backend (в одном терминале)
cd backend
python -m uvicorn server:app --reload

# Frontend (в другом терминале)
cd frontend
npm run dev
```

## 🛠 Cursor Agents Workflow

Этот проект использует Cursor Agents для автоматизации разработки.

### Настройка агентов

1. **Открой Cursor** и перейди в Settings → Agents
2. **Создай 4 агента** с описаниями из `.cursor/agents.md`
3. **Добавь правила** из `.cursor/rules.md`

### Рабочий процесс

1. **Выбери задачу** из `.cursor/tickets.md`
2. **Используй Architect** для планирования
3. **Передай Implementer** для реализации
4. **Проверь QA & Tests** для тестирования
5. **Обнови Docs/Changelog** для документации

## 📋 Типы контрибьюций

### 🐛 Bug Fixes
- Опиши проблему в issue
- Создай ветку `fix/описание-бага`
- Исправь баг и добавь тесты
- Создай Pull Request

### ✨ New Features
- Обсуди фичу в issue
- Создай ветку `feat/название-фичи`
- Реализуй фичу с тестами
- Обнови документацию
- Создай Pull Request

### 📚 Documentation
- Исправь ошибки в документации
- Добавь новые примеры
- Улучши README
- Создай туториалы

### 🧪 Tests
- Добавь unit тесты
- Напиши E2E тесты
- Улучши покрытие кода
- Исправь падающие тесты

## 🎯 Стандарты кода

### Frontend (Next.js + TypeScript)
```typescript
// Используй функциональные компоненты
const MyComponent: React.FC<Props> = ({ prop }) => {
  // Хуки в начале компонента
  const [state, setState] = useState();
  
  // Обработчики событий
  const handleClick = () => {
    // логика
  };
  
  return (
    <div className="tailwind-classes">
      {/* JSX */}
    </div>
  );
};

// Экспорт по умолчанию
export default MyComponent;
```

### Backend (FastAPI + Python)
```python
# Используй type hints
from typing import List, Optional
from pydantic import BaseModel

class UserModel(BaseModel):
    id: str
    username: str
    wallet_address: str

# Async функции
async def get_user(user_id: str) -> Optional[UserModel]:
    # логика
    pass

# API endpoints
@app.get("/api/users/{user_id}")
async def get_user_endpoint(user_id: str) -> UserModel:
    user = await get_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
```

### CSS (TailwindCSS)
```css
/* Используй Tailwind классы */
/* Кастомные стили только при необходимости */
.custom-style {
  @apply bg-sepia-100 text-gravure-900;
}
```

## 🧪 Тестирование

### Unit Tests
```typescript
// Frontend тесты
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

```python
# Backend тесты
import pytest
from fastapi.testclient import TestClient

def test_get_user(client: TestClient):
    response = client.get("/api/users/123")
    assert response.status_code == 200
    assert "username" in response.json()
```

### E2E Tests (Playwright)
```typescript
// tests/e2e/wallet.spec.ts
import { test, expect } from '@playwright/test';

test('wallet page should display balance', async ({ page }) => {
  await page.goto('/wallet');
  await expect(page.locator('[data-testid="balance"]')).toBeVisible();
});
```

## 📝 Git Workflow

### Создание ветки
```bash
# Создай ветку от main
git checkout main
git pull origin main
git checkout -b feat/название-фичи
```

### Коммиты
```bash
# Используй conventional commits
git commit -m "feat(wallet): add balance display"
git commit -m "fix(auth): resolve login issue"
git commit -m "docs(readme): update installation guide"
```

### Pull Request
```markdown
## Описание
Краткое описание изменений

## Acceptance Criteria
- [ ] Критерий 1
- [ ] Критерий 2

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

## 🔍 Code Review

### Что проверяем
- [ ] Код соответствует стандартам
- [ ] Тесты написаны и проходят
- [ ] Документация обновлена
- [ ] Нет security issues
- [ ] Performance не ухудшился

### Комментарии в PR
```markdown
## Позитивные моменты
- Отличная работа с тестами
- Хорошая документация

## Предложения по улучшению
- Можно добавить валидацию
- Рассмотри использование хука

## Вопросы
- Почему используется этот подход?
- Есть ли альтернативы?
```

## 🚀 Деплой

### Preview Deployments
- Каждый PR автоматически деплоится на Vercel
- Проверь preview URL в PR
- Протестируй функционал

### Production Deployments
- Только после merge в main
- Автоматический деплой через GitHub Actions
- Проверь production после деплоя

## 🐛 Reporting Bugs

### Создание Issue
```markdown
## Описание бага
Краткое описание проблемы

## Шаги для воспроизведения
1. Перейди на страницу X
2. Нажми кнопку Y
3. Увидишь ошибку Z

## Ожидаемое поведение
Что должно происходить

## Фактическое поведение
Что происходит на самом деле

## Скриншоты
[Добавь скриншоты]

## Окружение
- OS: macOS/Windows/Linux
- Browser: Chrome/Firefox/Safari
- Version: 1.0.0
```

## 💡 Предложение фич

### Создание Feature Request
```markdown
## Описание фичи
Краткое описание новой функциональности

## Проблема
Какую проблему решает эта фича

## Решение
Как предлагаешь решить

## Альтернативы
Какие есть альтернативы

## Дополнительная информация
Скриншоты, примеры, ссылки
```

## 🏆 Recognition

### Contributors
- Все контрибьюторы добавляются в README
- Специальные достижения отмечаются в CHANGELOG
- Возможность стать maintainer при активном участии

### Badges
- 🥇 Top Contributor
- 🐛 Bug Hunter
- 📚 Documentation Hero
- 🧪 Test Champion

## 📞 Поддержка

### Каналы связи
- [GitHub Issues](https://github.com/your-repo/issues)
- [GitHub Discussions](https://github.com/your-repo/discussions)
- [Discord](https://discord.gg/kingface)

### Время ответа
- Issues: 24-48 часов
- PRs: 1-3 дня
- Discussions: 1-7 дней

## 📄 Лицензия

Контрибьютируя в проект, вы соглашаетесь с [MIT License](LICENSE).

---

**Спасибо за ваш вклад в KingFace! 🚀**