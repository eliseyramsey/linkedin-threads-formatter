# PLANNING.md — ThreadThis

## Vision

**ThreadThis** (threadthis.day) — инструмент для подготовки постов к публикации в LinkedIn и Threads.

Пользователь пишет текст в редакторе, применяет Unicode-форматирование (bold, italic, strikethrough, underline, списки), видит живой preview поста и копирует готовый результат в соцсеть. Для Threads текст автоматически разбивается на блоки по 500 символов.

**Ключевые принципы:**
- **Zero backend** — всё работает в браузере, никакие данные не покидают устройство
- **Instant feedback** — live preview обновляется при каждом нажатии клавиши
- **Platform-native feel** — preview максимально похож на реальные посты в LinkedIn/Threads

---

## Architecture

### Тип приложения
Single Page Application (SPA) — один HTML файл, один CSS, один JS. Никаких фреймворков, сборщиков или серверной логики.

### Компоненты

```
┌─────────────────────────────────────────────────┐
│                   index.html                     │
│                                                  │
│  ┌──────────┐  ┌─────────────────────────────┐  │
│  │ CTA      │  │  Background Floating Icons   │  │
│  │ Header   │  │  (CSS animations, z-index:0) │  │
│  └──────────┘  └─────────────────────────────┘  │
│                                                  │
│  ┌─────────────┐  ┌──────────────────────────┐  │
│  │ Tab Switcher │  │                          │  │
│  │ [Threads]    │  │                          │  │
│  │ [LinkedIn]   │  │                          │  │
│  └─────────────┘  │                          │  │
│                    │                          │  │
│  ┌─────────────┐  │   Live Preview           │  │
│  │ Rich Text   │  │   (LinkedIn card /        │  │
│  │ Editor      │  │    Threads chain)         │  │
│  │             │  │                          │  │
│  │ - Toolbar   │  │   - Avatar + Profile     │  │
│  │ - Textarea  │  │   - Post text            │  │
│  │ - Counter   │  │   - Engagement UI        │  │
│  │ - Copy btn  │  │   - Copy per segment     │  │
│  └─────────────┘  └──────────────────────────┘  │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │ How-to Cards (4 cards, themed)           │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │ Footer (© + Privacy Policy + Terms)      │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │ Legal Modals (overlay + scrollable card) │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

### Data Flow

```
User Input (textarea)
    │
    ├──► Unicode Formatting (Bold/Italic/Strike/Underline/Lists)
    │        └── Modifies selected text via Unicode maps
    │
    ├──► Character Counter
    │        └── Intl.Segmenter / grapheme cluster counting
    │
    ├──► Undo/Redo History Stack (max 50 states)
    │
    └──► Preview Renderer
             │
             ├── LinkedIn: single card with engagement UI
             │
             └── Threads: splitIntoThreads(text, 500)
                      │
                      ├── Manual split by `///`
                      └── Auto-split by word boundaries
```

### Theming System (V3)

```
Tab Switch Event
    │
    └──► JS: document.body.className = 'theme-threads' | 'theme-linkedin'
              │
              └──► CSS Variables cascade
                    │
                    ├── --accent-primary
                    ├── --accent-gradient
                    ├── --howto-card-border
                    ├── --howto-card-bg
                    └── ... (transition: 300ms ease)
```

---

## Technology Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Markup** | HTML5 | Semantic structure, no build step |
| **Styling** | CSS3 (vanilla) | Custom properties for theming, @keyframes for animations, no preprocessor needed |
| **Logic** | Vanilla JavaScript (ES6+) | No framework overhead, direct DOM manipulation, small codebase (~700 lines) |
| **Design System** | Material 3 (principles) | Clean, modern look — implemented manually, not via library |
| **Typography** | Inter (Google Fonts) | Professional, highly readable |
| **Icons** | Font Awesome 6 (CDN) | LinkedIn/Threads brand icons, UI icons |
| **Hosting** | Static files | Any CDN/static host (Vercel, Netlify, GitHub Pages) |

### External Dependencies (CDN only)

| Resource | Purpose |
|----------|---------|
| Google Fonts — Inter | Primary typeface |
| Font Awesome 6 | Brand icons (LinkedIn, Threads), UI icons |

### No Server Requirements
- No Node.js, no npm, no build pipeline
- No database, no API calls
- Local dev: `python3 -m http.server 8080` or `npx serve`

---

## File Structure

```
/LinkedIn:Threads
├── index.html                 # SPA — all HTML structure
├── styles.css                 # All styles (~950+ lines)
├── app.js                     # All logic (~700+ lines)
├── PLANNING.md                # THIS FILE
├── README.md                  # Project overview
├── .gitignore
│
├── images/
│   ├── avatars/               # 20 professional headshots
│   │   ├── avatar-01.jpg      # ... through avatar-20.jpg
│   │   └── ...
│   ├── favicon/               # Favicon files (V3, TBD)
│   ├── Linkedin-Like-*.png    # LinkedIn reaction icons
│   └── Linkedin-*.png         # Other LinkedIn UI icons
│
└── docs/
    ├── CLAUDE.md              # Development guide for Claude Code
    ├── Main Requirements.md   # Original technical spec (V1/V2)
    ├── V3_PRD.md              # V3 product requirements
    ├── V1_scope_done.md       # Completed V1 features
    └── V2_scope_done.md       # Completed V2 features
```

---

## Version Roadmap

### V1 (MVP) — DONE
Core text formatting and thread splitting.
- Unicode Bold/Italic (Latin only)
- Auto-split at 500 chars (word-boundary aware)
- Copy to clipboard
- Side-by-side responsive layout
- Character counter with warnings

### V2 — DONE
Platform previews and advanced editing.
- 20 avatars with gender matching
- Strikethrough, Underline, Bullet/Numbered Lists
- Undo/Redo (50-state history)
- Manual thread breaks (`///`)
- LinkedIn engagement UI (reactions, actions)
- Threads chain preview with per-segment copy
- CTA header
- How-to cards

### V3 (Current) — IN PROGRESS
Visual identity and legal compliance.

| ID | Task | Priority | Status |
|----|------|----------|--------|
| V3-1 | Threads as default tab | P0 | Pending |
| V3-2 | Dynamic color theme (CSS vars + JS) | P0 | Pending |
| V3-3 | Gradient CTA text | P1 | Pending |
| V3-4 | Themed how-to cards (border, bg) | P1 | Pending |
| V3-5 | How-to card scroll animations | P1 | Pending |
| V3-6 | Background floating icons | P1 | Pending |
| V3-7 | Footer with legal links | P0 | Pending |
| V3-8 | Modal dialogs for legal pages | P0 | Pending |
| V3-9 | Privacy Policy & Terms content | P0 | Pending |
| V3-10 | Favicon integration | P1 | Pending (design TBD) |
| V3-11 | prefers-reduced-motion & a11y | P1 | Pending |
| V3-12 | Responsive for all new elements | P1 | Pending |

### V4+ (Future Ideas)
- Image upload & preview in LinkedIn card
- Emoji picker
- Dark mode
- Analytics (privacy-respecting)
- Multi-language UI
- Supabase backend (drafts, owner mode)

---

## Required Tools

### Development
| Tool | Purpose | Install |
|------|---------|---------|
| Any modern browser | Testing & preview | — |
| Python 3 | Local dev server | Pre-installed on macOS |
| Git | Version control | Pre-installed on macOS |
| GitHub CLI (`gh`) | PR creation, issue management | `brew install gh` |
| Text editor / IDE | Code editing | VS Code, Cursor, etc. |

### Design (V3)
| Tool | Purpose |
|------|---------|
| Favicon generator | Create multi-format favicons from design |
| Font Awesome 6 | Brand icons via CDN (already included) |

### Deployment
| Tool | Purpose |
|------|---------|
| Vercel / Netlify / GitHub Pages | Static hosting (zero config) |
| Custom domain | threadthis.day |

### No Build Tools Required
- No Node.js / npm
- No webpack / vite / parcel
- No TypeScript compiler (vanilla JS)
- No CSS preprocessor (vanilla CSS)
- No testing framework (manual testing by user)

---

## Key Design Decisions

### Why no framework?
- App is a single page with ~700 lines of JS
- No routing, no state management, no component tree needed
- Zero bundle size overhead — loads instantly
- Full control over DOM, no abstraction leaks

### Why CSS custom properties for theming?
- Native browser support, no build step
- Instant switching via class on `<body>`
- CSS transitions work naturally with custom properties
- Easy to extend with new themes later

### Why modals instead of separate pages for legal?
- SPA architecture — no routing needed
- Faster UX (no page reload)
- Keeps everything in a single deployment unit
- Simpler maintenance

### Why Unicode formatting instead of rich text?
- Social media platforms strip HTML formatting
- Unicode mathematical symbols render everywhere
- Copy-paste preserves formatting on LinkedIn/Threads
- No server-side rendering needed

---

## Constraints

- **Unicode Bold/Italic:** Latin characters only (a-z, A-Z, 0-9). Cyrillic has no Unicode mathematical symbols.
- **Strikethrough/Underline:** Works with all characters via combining marks (U+0336, U+0332).
- **Thread limit:** 500 characters per segment. Word boundaries respected.
- **No data persistence:** Everything is in-memory. Page reload = clean slate.
- **Client-side only:** No cookies, no localStorage (currently), no network requests.
- **Animations:** CSS-only, 60fps target. `prefers-reduced-motion` fully respected.
