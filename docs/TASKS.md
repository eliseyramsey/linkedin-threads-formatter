# TASKS.md — ThreadThis

## V1 (MVP) ✅ DONE

- [x] HTML + CSS каркас (Material 3, Inter font)
- [x] Rich Text Editor с auto-resize textarea
- [x] Unicode Bold formatting (Latin only)
- [x] Unicode Italic formatting (Latin only)
- [x] Character counter (LinkedIn 3000 / Threads 500)
- [x] Thread auto-splitting at 500 chars (word-boundary aware)
- [x] Copy to clipboard (full post)
- [x] Side-by-side layout (≥1024px) / vertical stack (<1024px)
- [x] Responsive design (mobile <600px)

---

## V2 (Platform Previews & Editing) ✅ DONE

- [x] T5: Threads icon in tab switcher (Font Awesome)
- [x] T1: 20 avatar photos with gender matching
- [x] T6-extra: CTA header above editor
- [x] T3: Manual thread breaks with `///`
- [x] T2: Strikethrough formatting (U+0336, all characters)
- [x] T2: Underline formatting (U+0332, all characters)
- [x] T2: Bullet list toggle
- [x] T2: Numbered list toggle
- [x] T2: Undo/Redo system (50-state history, Ctrl+Z/Shift+Z)
- [x] T6: LinkedIn engagement UI (reactions, action buttons)
- [x] T6: Profile with company name display
- [x] T7: How-to cards section (4 cards)
- [x] T6: Threads chain preview with per-segment copy

---

## V3 (Visual Identity & Legal) — CURRENT

### Milestone 1: Core Structure (P0)

- [x] **V3-1:** Switch tab order — Threads first (active), LinkedIn second
  - Swap button order in `.tab-switcher`
  - Set `active` class on Threads button
  - Set `hidden` on `.linkedin-preview`
  - Init `currentPlatform = 'threads'` in JS
  - Init char counter in Threads format

- [x] **V3-7:** Add `<footer>` with legal links
  - © 2026 ThreadThis. All rights reserved.
  - Links: Privacy Policy | Terms of Service | Contact
  - Thin divider line above footer
  - Minimal styling, muted text color

- [x] **V3-8:** Modal dialogs for legal pages
  - Overlay `rgba(0,0,0,0.5)`
  - White scrollable card with close button (X)
  - Close: X button, overlay click, Escape key
  - `body { overflow: hidden }` when open
  - `role="dialog"`, `aria-modal="true"`, focus trap
  - Fade-in animation on open

- [x] **V3-9:** Write Privacy Policy & Terms of Service content
  - Language: English
  - Privacy: no data collection, client-side only, no cookies
  - Terms: "as is" service, user responsible for content

### Milestone 2: Theming System (P0)

- [x] **V3-2:** Dynamic color theme — CSS variables + JS class switching
  - Define `.theme-threads` variables (black/gray palette)
  - Define `.theme-linkedin` variables (blue palette)
  - JS: toggle `<body>` class on tab switch
  - CSS: `transition: 300ms ease` on themed elements
  - Default theme: `theme-threads`

- [x] **V3-3:** Gradient text for CTA heading
  - `background: var(--accent-gradient)` + `background-clip: text`
  - `@supports` fallback to solid `var(--accent-primary)`

### Milestone 3: Themed Components (P1)

- [x] **V3-4:** Themed how-to cards
  - Border: `1px solid var(--howto-card-border)`
  - Background: `var(--howto-card-bg)`
  - Hover: `translateY(-4px)` + shadow increase
  - `transition: 200ms ease`

- [x] **V3-5:** How-to cards scroll animation
  - `IntersectionObserver` triggers `fadeUp` on scroll into view
  - 100ms stagger delay per card
  - `@keyframes fadeUp` — opacity 0→1, translateY 20px→0

### Milestone 4: Animations (P1)

- [x] **V3-6:** Background floating icons
  - 5–8 Font Awesome brand icons (Threads or LinkedIn)
  - `position: absolute`, `pointer-events: none`, `z-index: 0`
  - Opacity `0.03–0.05`, size `40–80px`
  - CSS `@keyframes` drift, `15–30s` cycle
  - `will-change: transform` for GPU acceleration
  - Icons match current platform, fade on tab switch
  - Mobile (<600px): reduce to 2–3 or disable

### Milestone 5: Polish & Accessibility (P1)

- [ ] **V3-10:** Favicon integration
  - SVG primary + PNG fallback (16x16, 32x32, 180x180)
  - `<link rel="icon">` + `<link rel="apple-touch-icon">`
  - `<meta name="theme-color">`
  - ⚠️ BLOCKED: favicon design not yet decided

- [x] **V3-11:** Accessibility — prefers-reduced-motion
  - `@media (prefers-reduced-motion: reduce)` — disable all animations
  - Disable floating icons, card fade-up, hover effects
  - Modal focus trap verified
  - WCAG 2.1 AA contrast check

- [x] **V3-12:** Responsive adaptation for all V3 elements
  - Footer: vertical link layout on mobile
  - Floating icons: 2–3 max on mobile, none on <600px if needed
  - Modals: full-width on mobile, proper scroll
  - Themed cards: single column on <600px
  - Gradient text: verify readability on all sizes

---

## V4+ (Future — not started)

- [ ] Image upload & preview in LinkedIn card
- [ ] Emoji picker (insert at cursor position)
- [ ] Dark mode / theme toggle
- [ ] Privacy-respecting analytics
- [ ] Multi-language UI (RU/EN toggle)
- [ ] Supabase backend — draft saving, owner mode
