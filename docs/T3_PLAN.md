# T3: Ручное разбиение на треды (`///`)

## Context

Сейчас `splitIntoThreads()` разбивает текст только автоматически по 500 символов. Пользователь не может контролировать, где именно происходит разрыв. Задача T3 — добавить маркер `///`, который задаёт ручной разрыв с приоритетом над авто-разбивкой.

## Решения по вопросам

- **LinkedIn превью**: `///` остаётся как есть (не удаляется)
- **Пустые блоки**: Игнорируются (фильтруются)

## Изменения

**Единственный файл: `app.js`** — строки 163-192

### Шаг 1: Извлечь авто-разбивку в отдельную функцию

Текущая логика `splitIntoThreads()` (while-loop с поиском пробелов/переносов) выносится в новую функцию `autoSplitBlock(text, limit)`. Это чистый рефакторинг — поведение не меняется.

### Шаг 2: Переписать `splitIntoThreads()` с поддержкой `///`

Новая логика:
1. `text.split('///')` — разбить по маркерам
2. `.map(s => s.trim()).filter(Boolean)` — убрать пустые блоки и пробелы
3. Для каждого блока > 500 символов — применить `autoSplitBlock()`
4. Вернуть объединённый результат

```javascript
function autoSplitBlock(text, limit) {
    const chunks = [];
    let remaining = text.trim();
    while (remaining.length > limit) {
        let splitIndex = remaining.lastIndexOf(' ', limit);
        const newlineIndex = remaining.lastIndexOf('\n', limit);
        if (newlineIndex > splitIndex) splitIndex = newlineIndex;
        if (splitIndex === -1 || splitIndex === 0) splitIndex = limit;
        chunks.push(remaining.substring(0, splitIndex).trim());
        remaining = remaining.substring(splitIndex).trim();
    }
    if (remaining.length > 0) chunks.push(remaining);
    return chunks;
}

function splitIntoThreads(text, limit = THREAD_LIMIT) {
    const manualBlocks = text.split('///').map(s => s.trim()).filter(Boolean);
    const result = [];
    for (const block of manualBlocks) {
        if (block.length <= limit) {
            result.push(block);
        } else {
            result.push(...autoSplitBlock(block, limit));
        }
    }
    return result;
}
```

## Что НЕ меняется

| Компонент | Причина |
|-----------|---------|
| `index.html` | How To карточка (стр. 150-153) уже описывает `///` |
| `styles.css` | Новых UI-элементов нет |
| `updatePreview()` | LinkedIn превью показывает raw текст (с `///`) |
| `renderThreadsPreview()` | Принимает массив от `splitIntoThreads()` — формат не меняется |
| `updateCharCount()` | `///` считается в лимит LinkedIn |
| Copy buttons | Копируют отдельные chunks, которые уже без `///` |

## Обратная совместимость

Если в тексте нет `///`:
- `"Hello world".split('///')` → `["Hello world"]` — один блок
- Дальше применяется `autoSplitBlock()` если > 500 символов
- Поведение **идентично** текущему

## Тестовые сценарии (ручная проверка)

| Ввод | Ожидаемый результат |
|------|---------------------|
| `A///B` | 2 блока: "A", "B" |
| `A///` | 1 блок: "A" |
| `///A` | 1 блок: "A" |
| `A///B///C` | 3 блока: "A", "B", "C" |
| `A//////B` | 2 блока: "A", "B" (пустые отфильтрованы) |
| Длинный текст без `///` | Авто-разбивка как раньше |
| `A///(600 символов)` | Блок "A" + авто-разбивка длинного блока |

## Verification

1. `python3 -m http.server 8080`
2. Переключиться на вкладку Threads
3. Ввести текст с `///` — проверить что тред разбивается по маркерам
4. Ввести текст без `///` — убедиться что авто-разбивка работает как раньше
5. Переключиться на LinkedIn — убедиться что `///` видны в превью
6. Копирование отдельных блоков работает корректно
