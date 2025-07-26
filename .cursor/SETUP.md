# Настройка Cursor Agents для KingFace

## Быстрая настройка (5 минут)

### 1. Добавить глобальные правила
1. Откройте Cursor → Settings → Rules for AI
2. Скопируйте содержимое файла `.cursor/rules.md`
3. Вставьте в поле Rules

### 2. Создать 4 агента
В Cursor → Settings → Agents создайте:

#### Architect Agent
- **Name:** KingFace Architect
- **Prompt:** Скопируйте из `.cursor/agents.md` раздел "Prompt для Architect"

#### Implementer Agent  
- **Name:** KingFace Implementer
- **Prompt:** Скопируйте из `.cursor/agents.md` раздел "Prompt для Implementer"

#### QA & Tests Agent
- **Name:** KingFace QA & Tests
- **Prompt:** Скопируйте из `.cursor/agents.md` раздел "Prompt для QA & Tests"

#### Docs/Changelog Agent
- **Name:** KingFace Docs
- **Prompt:** Скопируйте из `.cursor/agents.md` раздел "Prompt для Docs/Changelog"

### 3. Первая задача
1. Откройте файл `.cursor/tasks/01-wallet-page.md`
2. Скопируйте содержимое
3. Отправьте **Architect Agent** с текстом: "Проанализируй эту задачу и создай план реализации: [вставить содержимое задачи]"

## Workflow использования

```
Задача → Architect → Implementer → QA & Tests → Docs/Changelog → Done
```

### Пример диалога:

**1. Architect Agent:**
```
Проанализируй задачу из .cursor/tasks/01-wallet-page.md и создай план реализации
```

**2. Implementer Agent:**
```
Реализуй страницу /wallet по плану Architect. Acceptance criteria:
[скопировать из задачи]
```

**3. QA & Tests Agent:**
```
Проверь реализацию страницы /wallet и создай тесты. Требования:
- Unit тесты для компонентов
- E2E тест для airdrop функции
- Покрытие минимум 80%
```

**4. Docs/Changelog Agent:**
```
Обнови документацию для новой страницы /wallet:
- CHANGELOG.md запись
- API документация для новых endpoints
```

## Готовые задачи

- ✅ `.cursor/tasks/01-wallet-page.md` - Страница кошелька
- ✅ `.cursor/tasks/02-invite-system.md` - Система приглашений
- 🔄 Создать еще 8 задач...

## Контроль качества

Каждый агент проверяет:
- ✅ Соответствие `.cursor/rules.md`
- ✅ Максимум 300 строк diff
- ✅ Наличие тестов
- ✅ Обновление CHANGELOG.md
- ✅ Семантические коммиты

## Troubleshooting

**Агент не следует правилам?**
→ Убедитесь, что скопировали правила в Cursor Rules

**Слишком большой diff?**
→ Разбейте задачу на подзадачи через Architect

**Тесты не проходят?**
→ Используйте QA Agent для исправления

**Нужна помощь?**
→ Изучите примеры в `.cursor/tasks/`