# CLAUDE.md

## Project Overview

**ThreadThis** (threadthis.day) — SPA для форматирования постов в соцсети с Unicode-стилизацией и автоматическим разбиением на треды.

**UI:** Side-by-side layout — Rich Text Editor слева (max 600px), Live Preview справа (flex). На экранах <1024px переключается на вертикальный layout.

## Development Plan

Проект разбит на мини-спринты. Текущий прогресс см. в плане.

### MVP (Sprint 1-5) ✅
1. ✅ HTML + CSS каркас
2. ✅ Редактор с auto-resize
3. ✅ Unicode Bold/Italic (только латиница!)
4. ✅ Thread splitting (500 символов)
5. ✅ Copy to clipboard
6. ✅ Side-by-side layout с responsive breakpoints
~~7. Supabase интеграция~~ (отключено)
~~8. UI черновиков~~ (отключено)

### V2 Roadmap

#### Phase 1 (Quick Wins)
- T5: Иконка Threads в preview
- T1: Аватары для превью постов
- T6-extra: CTA header над редактором

#### Phase 2 (Core Features)
- T3: Ручное разбиение `///` на треды
- T2: Дополнительное форматирование (Strikethrough, Underline, Lists) + Undo/Redo

#### Phase 3 (Polish)
- T6: Улучшения LinkedIn UI (лайки, репосты, комментарии)
- T7: "How To" секция в footer

#### Phase 4 (Advanced)
- T4: Загрузка картинок и Emoji Picker
- Supabase backend (Owner Mode, сохранение черновиков)

## Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JS (без фреймворков)
- **Database:** Supabase (V2 Phase 4)
- **Design:** Material 3, Inter font
- **Icons:** Font Awesome 6

## Project Structure

```
/LinkedIn:Threads
├── docs/
│   ├── CLAUDE.md           # Development guide
│   ├── Main Requirements.md # Full spec
│   ├── future_scope.md     # V2 features
│   └── V2_TASKS.md         # V2 task breakdown
├── assets/                 # Screenshots
├── index.html              # Main page
├── styles.css              # Material 3 styles
└── app.js                  # Application logic
```

## Development Commands

```bash
# Run local dev server
python3 -m http.server 8080
# Or: npx serve

# Open in browser
http://localhost:8080
```

## Critical Implementation Rules

### Character Limits
- **LinkedIn:** 3000 символов
- **Threads:** 500 символов (автоматическое разбиение)

### UI Layout
- **Desktop (≥1024px):** Side-by-side — Editor (max 600px) + Preview (flex)
- **Mobile (<1024px):** Vertical stack — Editor → Preview

### Unicode Formatting
```javascript
// Только латиница! Кириллица НЕ конвертируется
toBold("Hello")  // → "𝐇𝐞𝐥𝐥𝐨"
toBold("Привет") // → "Привет" (без изменений)
```

### Thread Splitting Algorithm
- Лимит: 500 символов
- Никогда не разрывать слова
- Разбивать по пробелам/переносам
- См. Main Requirements.md:58-71

### CSS Variables (строго соблюдать)
```css
--bg-color: #F0F4F9;
--card-bg: #FFFFFF;
--text-primary: #1F1F1F;
--accent-linkedin: #0A66C2;
--accent-threads: #000000;
--border-radius-lg: 24px;
```

## ~~Database Schema~~ (отключено)

~~Backend и база данных не используются в текущей версии~~

## Development Workflow

1. Читать Main Requirements.md перед реализацией
2. Следовать CSS переменным из спецификации
3. Тестировать Unicode только на латинице (a-z, A-Z)
4. Проверять thread splitting на длинных текстах
5. **Запуск:** `python3 -m http.server 8080` → открыть `localhost:8080`
6. **Тестировать responsiveness:** проверить breakpoint <1024px (вертикальный layout)

## Files to Reference

- `Main Requirements.md` — Полная техническая спецификация
- `future_scope.md` — Планы на V2
- `V2_TASKS.md` — Detailed V2 task breakdown with IDs
