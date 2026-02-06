# V2 Development Tasks

## Quick Reference

| ID | Задача | Сложность | Зависимости |
|----|--------|-----------|-------------|
| T1 | Аватары для превью | Low | - |
| T2 | Доп. форматирование + Undo/Redo | Medium | - |
| T3 | Ручное разбиение `///` | Medium | - |
| T4 | Загрузка картинок | High | - |
| T5 | Иконка Threads | Low | - | - DONE
| T6 | UI правки LinkedIn Preview | Medium | T1 | -DONE
| T7 | How To секция | Low | T3 | - DONE

---

## T1: Аватары для превью

**Статус:** `pending`

**Что сделать:**
- [ ] Найти 10 профессиональных фото (royalty-free стоки)
- [ ] Разнообразие: пол, возраст, этничность
- [ ] Формат: WebP/PNG, 100x100px, круглые
- [ ] Сохранить в `/public/avatars/`
- [ ] Рандомный выбор аватара при загрузке превью

**Источники:**
- Unsplash (professional headshots)
- Pexels (business portraits)

---

## T2: Дополнительное форматирование + Undo/Redo

**Статус:** `pending`

**Новые кнопки:**
- [ ] Strikethrough (зачёркнутый текст)
- [ ] Underline (подчёркнутый текст)
- [ ] Numbered List (нумерованный список)
- [ ] Undo (Ctrl+Z)
- [ ] Redo (Ctrl+Shift+Z / Ctrl+Y)

**Требования:**
- Существующее форматирование (Bold, Italic) должно работать
- Unicode mappings для Strikethrough: `U+0336` (combining long stroke overlay)
- Underline: `U+0332` (combining low line)
- History stack для Undo/Redo (max 50 состояний)

**Реализация Undo/Redo:**
```javascript
const history = {
  stack: [],
  index: -1,
  maxSize: 50,

  push(state) { /* ... */ },
  undo() { /* ... */ },
  redo() { /* ... */ }
};
```

---

## T3: Ручное разбиение на треды

**Статус:** `pending`

**Спецификация:**
- Символ разрыва: `///`
- Приоритет: ручной разрыв > автоматический (500 символов)
- `///` НЕ включается в финальный текст

**Алгоритм:**
```javascript
function splitThreads(text, maxLength = 500) {
  // 1. Разбить по ///
  const manualBlocks = text.split('///').map(s => s.trim());

  // 2. Каждый блок проверить на длину
  const result = [];
  for (const block of manualBlocks) {
    if (block.length <= maxLength) {
      result.push(block);
    } else {
      // Применить авто-разбиение
      result.push(...autoSplit(block, maxLength));
    }
  }

  return result.filter(Boolean);
}
```

**Тесты:**
- `"A///B"` → `["A", "B"]`
- `"A///"` → `["A"]`
- `"///A"` → `["A"]`
- `"A///B///C"` → `["A", "B", "C"]`

---

## T4: Загрузка и превью картинки

**Статус:** `pending`

**UI компоненты:**
- [ ] Toolbar внизу Rich Text Editor
- [ ] Кнопка Emoji Picker
- [ ] Кнопка Image Upload

**Image Upload:**
- [ ] Input type="file" (accept: image/*)
- [ ] Preview в LinkedIn карточке справа
- [ ] Позиция: под текстом поста, как в LinkedIn
- [ ] Max размер: 5MB
- [ ] Форматы: JPG, PNG, GIF, WebP

**Emoji Picker:**
- [ ] Popup с категориями эмодзи
- [ ] Вставка в позицию курсора
- [ ] Можно использовать библиотеку (emoji-mart) или нативный

---

## T5: Иконка Threads

**Статус:** `pending`

**Что сделать:**
- [ ] Найти официальный SVG логотип Threads (Meta)
- [ ] Добавить во вкладку "Threads" в превью
- [ ] Inline SVG или `/public/threads-icon.svg`

**SVG источник:**
- Meta Brand Resources
- Simpleicons.org

---

## T6: UI правки LinkedIn Preview

**Статус:** `pending`

**Задачи:**
- [ ] Добавить визуализацию: лайки, репосты, комментарии (как в LinkedIn)
- [ ] Threads: убрать подсветку красным в счётчике символов, убрать `/`
- [ ] Убрать иконку глобуса и время рядом с именем
- [ ] Добавить компанию: `"Business Analyst @ Dev.it"`
- [ ] Like, Comment, Share, Repost — точь-в-точь как в LinkedIn

**Нужен скриншот:**
- LinkedIn пост с реакциями и кнопками

---

## T7: How To секция

**Статус:** `pending`

**Расположение:** Внизу страницы

**Секции:**
1. **Unicode и кириллица**
   - Unicode Bold/Italic работает только с латиницей
   - Причина: нет математических символов для кириллицы в Unicode

2. **Работа с Threads**
   - Авто-разбивка по 500 символов
   - Нумерация: 1/n, 2/n, ...

3. **Ручная разбивка `///`**
   - Примеры использования
   - Приоритет над авто

4. **Копирование**
   - LinkedIn: один клик
   - Threads: отдельные кнопки для блоков

---

## T6-extra: Call to Action Header

**Статус:** `pending`

**Над Rich Text Editor:**
```html
<div class="cta-header">
  <h1>Подготовь свой пост к публикации</h1>
  <p>Используй этот инструмент для написания, форматирования, разбивки и предпросмотра твоих постов.</p>
</div>
```

**Стили:**
- `h1`: bold, крупный шрифт
- `p`: мельче, secondary color
- Соблюдать CSS переменные проекта

---

## Приоритеты разработки

### Phase 1 (Quick Wins)
1. T5 — Иконка Threads
2. T1 — Аватары
3. T6-extra — CTA Header

### Phase 2 (Core Features)
4. T3 — Ручное разбиение `///`
5. T2 — Форматирование + Undo/Redo

### Phase 3 (Polish)
6. T6 — UI правки LinkedIn
7. T7 — How To секция

### Phase 4 (Advanced)
8. T4 — Загрузка картинок
