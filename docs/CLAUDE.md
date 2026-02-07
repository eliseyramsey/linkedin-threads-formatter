# CLAUDE.md

## Project Overview

**ThreadThis** (threadthis.day) — SPA для форматирования постов в соцсети с Unicode-стилизацией и автоматическим разбиением на треды.

**Текущая версия:** V3 ✅ (Visual & Branding upgrade — completed)
**Стек:** HTML5, CSS3, Vanilla JS — без фреймворков, без бэкенда, 100% клиент-сайд.

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
Visual identity & legal compliance. See `docs/V3_PRD.md` for full requirements.

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

## Core Logic (do not change without reason)

- Thread splitting algorithm (`splitIntoThreads`, `autoSplitBlock`)
- Unicode formatting logic (BOLD_MAP, ITALIC_MAP, combining marks)
- Undo/redo system (editorHistory, 50-state stack)
- Copy to clipboard behavior
- Avatar/profile rotation system (20 avatars, gender matching)

## Files to Reference

| File | Purpose |
|------|---------|
| `docs/V3_PRD.md` | Full V3 requirements, acceptance criteria, task list |
| `docs/Main Requirements.md` | Original technical spec (V1/V2 algorithms) |
| `docs/TASKS.md` | Task tracker with milestones (V1–V4+) |
| `docs/PLANNING.md` | Vision, architecture, tech stack |
| `index.html` | SPA structure, tab switcher, editor, preview, how-to, footer, modals |
| `styles.css` | All styling, CSS variables, themes, responsive, animations |
| `app.js` | Formatting, splitting, undo/redo, preview, modals, scroll observer |
| `images/Favicon_Black.png` | Favicon — black version (active) |
| `images/Favicon_White.png` | Favicon — white version (for dark bg) |

---

## Session Log: 2026-02-07 — V3 Complete

### What was done
Created V3 PRD, updated CLAUDE.md, PLANNING.md, TASKS.md. Implemented all 12 V3 tasks:

| Task | Description | PR |
|------|-------------|-----|
| V3-1 | Threads as default tab | #11 |
| V3-2 | Dynamic color theme (CSS vars + JS) | #13 |
| V3-3 | Gradient CTA text | #13 |
| V3-4 | Themed how-to cards | #14 |
| V3-5 | Scroll animations (IntersectionObserver) | #14 |
| V3-6 | Background floating icons | #15 |
| V3-7 | Footer with legal links | #12 |
| V3-8 | Modal dialogs (Privacy/Terms) | #12 |
| V3-9 | Legal content (English) | #12 |
| V3-10 | Favicon (Threads @ + ///) | #17 |
| V3-11 | Accessibility (reduced-motion, focus trap) | #16 |
| V3-12 | Responsive for all V3 elements | #16 |

### Key decisions made
- **Threads palette:** Black/gray minimalism (#000, #333, #444)
- **LinkedIn palette:** Blue (#0A66C2, #004182, #D0E8FF)
- **Animations:** Subtle — floating icons at 7% opacity, CSS-only drift
- **Legal pages:** Footer links + modal dialogs (not separate pages)
- **Contact:** Links to linkedin.com/in/eliseyramsey
- **Footer:** "Vibecoded by @EliseyRamsey" with LinkedIn link
- **Favicon:** Custom design — Threads @ symbol + /// slashes, black on transparent
- **How-to slash icon:** Changed from fa-slash to text `///`
- **Themed elements:** CTA heading, how-to cards, editor card/toolbar, copy button, tab switcher
