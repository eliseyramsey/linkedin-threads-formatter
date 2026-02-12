# CLAUDE.md

## Project Overview

**ThreadThis** (threadthis.day) — SPA для форматирования постов в соцсети с Unicode-стилизацией и автоматическим разбиением на треды.

**Текущая версия:** V4 (UX & Internationalization)
**Стек:** HTML5, CSS3, Vanilla JS — без фреймворков, без бэкенда, 100% клиент-сайд.

---

## Session Summary (Feb 12, 2026)

### V4 Tasks Completed

| Task | Description | PR |
|------|-------------|-----|
| V4-1 | Bilingual UI (EN/RU toggle with auto-detection) | #18 |
| V4-2 | Smart thread splitting (natural break points) | #19 |
| V4-3 | LinkedIn Repost icon (two-arrow loop) | #20 |
| V4-5 | Emoji picker (60 emojis, 5-column grid) | #21 |
| V4-8 | Code Review & Security Audit | #22 |

### V4 Skipped (by user request)
- V4-4: Header Branding
- V4-6: Dark Mode

### Remaining V4 Task
- **V4-7: SEO optimization** — meta tags, Open Graph, schema markup

### Key Fixes This Session
1. **Critical Bug Fixed**: `saveToHistory()` → `historySave(editor.value)` in emoji picker
2. **Privacy Policy Updated**: Now mentions localStorage for language preference
3. **Threads Preview**: Reduced width to 85% for better UX
4. **Emoji Picker**: Fixed z-index issues, opens down with scroll

### Code Quality Verified
- ✅ No XSS vulnerabilities
- ✅ No console.log in production
- ✅ WCAG 2.1 AA accessibility
- ✅ Focus trap in modals

## Project Structure

```
/LinkedIn:Threads
├── index.html              # Main SPA page
├── styles.css              # Material 3 styles (~950 lines)
├── app.js                  # Application logic (~700 lines)
├── images/
│   ├── avatars/            # 20 professional headshots (avatar-01..20.jpg)
│   ├── Linkedin-*.png      # LinkedIn reaction icons
│   └── favicon/            # Favicon files (V3)
├── docs/
│   ├── CLAUDE.md           # THIS FILE — development guide
│   ├── Main Requirements.md # Full technical spec (V1/V2)
│   ├── V3_PRD.md           # V3 requirements (current scope)
│   ├── V1_scope_done.md    # Completed V1 features
│   └── V2_scope_done.md    # Completed V2 features
└── README.md
```

## Development Commands

```bash
python3 -m http.server 8080    # Local dev server
# Open: http://localhost:8080
```

## Version History

### V1 (MVP) ✅
Unicode Bold/Italic, thread splitting (500 chars), copy to clipboard, side-by-side layout, responsive.

### V2 ✅
Threads icon, avatars (20 with gender matching), CTA header, manual split `///`, strikethrough/underline, lists, undo/redo, LinkedIn engagement UI, how-to cards.

### V3 ✅
Visual identity: dynamic theming, floating icons, legal modals, favicon, accessibility.

### V4 (Current) — IN PROGRESS
- Bilingual UI (EN/RU)
- Smart thread splitting
- Emoji picker
- Code review & security audit
- SEO optimization (pending)

---

## V3 Implementation Guide

### V3-1: Tab Priority — Threads First

**What:** Threads is the default active tab on page load.

**Changes:**
- `index.html`: Swap button order in `.tab-switcher` — Threads button first with `active` class
- `index.html`: `.linkedin-preview` gets `hidden`, `.threads-preview` visible
- `app.js`: `currentPlatform` initializes as `'threads'`
- `styles.css`: Initial accent = Threads colors

### V3-2: Dynamic Color Theme

**What:** UI colors change based on selected platform. Two theme classes on `<body>`.

**Theme CSS variables:**
```css
/* Default: Threads */
.theme-threads {
  --accent-primary: #000000;
  --accent-secondary: #333333;
  --accent-light: #E5E5E5;
  --accent-gradient: linear-gradient(135deg, #000000, #444444);
  --howto-card-border: rgba(0, 0, 0, 0.12);
  --howto-card-bg: rgba(0, 0, 0, 0.03);
}

.theme-linkedin {
  --accent-primary: #0A66C2;
  --accent-secondary: #004182;
  --accent-light: #D0E8FF;
  --accent-gradient: linear-gradient(135deg, #0A66C2, #004182);
  --howto-card-border: rgba(10, 102, 194, 0.15);
  --howto-card-bg: rgba(10, 102, 194, 0.04);
}
```

**Switching:** JS toggles class on `<body>` when tab changes. CSS `transition: 300ms ease` on themed elements.

**Themed elements:** CTA heading (gradient text), how-to cards (border + bg), tab switcher active state, character counter accent.

### V3-3: Gradient CTA Text

```css
.cta-header h1 {
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```
Fallback: `@supports` check, solid `var(--accent-primary)` if gradient text unsupported.

### V3-4 & V3-5: How-to Cards

- Border: `1px solid var(--howto-card-border)`
- Background: `var(--howto-card-bg)`
- Hover: `translateY(-4px)` + increased shadow, `transition: 200ms ease`
- Scroll animation: `IntersectionObserver` triggers `fadeUp` with 100ms stagger per card

### V3-6: Background Floating Icons

- 5–8 Font Awesome icons (`.fa-brands .fa-threads` or `.fa-linkedin`)
- `position: absolute`, scattered across page
- Opacity: `0.03–0.05`, size: `40–80px`
- CSS `@keyframes` drift animation, `15–30s` cycle
- `pointer-events: none`, `z-index: 0`
- Icons match current platform, fade out/in on tab switch
- **Mobile (<600px):** reduce to 2–3 or disable
- **`prefers-reduced-motion`:** disable completely

### V3-7, V3-8, V3-9: Footer + Legal Modals

**Footer:** `<footer>` at page bottom with `© 2026 ThreadThis` + links (Privacy Policy | Terms of Service | Contact).

**Modals:**
- Overlay: `rgba(0,0,0,0.5)`
- Card: white, scrollable, close button (X)
- Close triggers: X button, overlay click, Escape key
- `body { overflow: hidden }` when open
- Accessibility: `role="dialog"`, `aria-modal="true"`, focus trap

**Content language:** English. Key points:
- Privacy: No data collection, client-side only, no cookies
- Terms: "As is" service, user responsible for content

### V3-10: Favicon

Technical integration ready. Design TBD (separate task).
- SVG primary + PNG fallback (16x16, 32x32, 180x180)
- `<link rel="icon">` + `<link rel="apple-touch-icon">`
- `<meta name="theme-color">` for mobile browsers

### V3-11: Accessibility

- `prefers-reduced-motion`: all animations disabled
- Modal focus trap
- WCAG 2.1 AA contrast
- Semantic `<footer>`, `<nav>`

### V3-12: Responsive

- Desktop (≥1024px): full animations, side-by-side
- Tablet (600–1024px): reduced animations, vertical
- Mobile (<600px): minimal/no background icons, vertical footer

---

## Critical Rules (all versions)

### Unicode Formatting
```javascript
// Latin ONLY — Cyrillic does NOT convert
toBold("Hello")  // → "𝐇𝐞𝐥𝐥𝐨"
toBold("Привет") // → "Привет" (unchanged)
// Strikethrough/Underline work with ALL characters (combining marks)
```

### Character Limits
- **LinkedIn:** 3000 chars
- **Threads:** 500 chars per segment (auto-split)

### Thread Splitting
- Manual breaks: `///` (highest priority)
- Auto-split at 500 chars, respects word boundaries
- Never break mid-word

### Layout Breakpoints
- **≥1024px:** Side-by-side (editor max 600px + preview flex)
- **<1024px:** Vertical stack
- **<600px:** Reduced typography, single-column how-to grid

### Existing CSS Variables (keep these)
```css
--bg-color: #F0F4F9;
--card-bg: #FFFFFF;
--text-primary: #1F1F1F;
--text-secondary: #444746;
--border-color: #E0E2E5;
--border-radius-lg: 24px;
--border-radius-md: 16px;
--border-radius-sm: 8px;
--shadow-soft: 0 4px 8px rgba(0,0,0,0.02);
--shadow-medium: 0 4px 12px rgba(0,0,0,0.08);
--color-warning: #f59e0b;
--color-error: #ef4444;
```

### Performance
- CSS-only animations (`@keyframes`), no JS timers
- `will-change: transform` for animated elements
- 60fps target — only animate `transform` and `opacity`
- No external dependencies

## What NOT to Change in V3

- Thread splitting algorithm
- Unicode formatting logic
- Undo/redo system
- Copy to clipboard behavior
- Avatar/profile rotation system
- Editor toolbar functionality
- LinkedIn/Threads preview rendering logic

## Files to Reference

| File | Purpose |
|------|---------|
| `docs/V3_PRD.md` | Full V3 requirements, acceptance criteria, task list |
| `docs/Main Requirements.md` | Original technical spec (V1/V2 algorithms) |
| `index.html` | SPA structure, tab switcher, editor, preview, how-to |
| `styles.css` | All styling, CSS variables, responsive breakpoints |
| `app.js` | Formatting, splitting, undo/redo, preview rendering |
