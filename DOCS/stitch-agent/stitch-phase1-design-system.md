# Google Stitch Design System & Screen Prompt Blueprint
## High-End SaaS CV Builder · Portfolio Ecosystem · Company Profile

---

## PART 1 — DESIGN SYSTEM SPECIFICATION

> Feed this block into Stitch via `create_design_system_from_design_md`

---

### 1.1 Color Tokens (HSL — 29-Theme Engine Compatible)

```
/* ── Brand Core ── */
--color-primary:        220 91% 55%;   /* Indigo Blue   #2B6FF0 */
--color-primary-hover:  220 91% 48%;   /* Deeper Indigo */
--color-primary-glow:   220 91% 55% / 0.25;

--color-accent:         262 83% 68%;   /* Electric Violet #9B6BF2 */
--color-accent-muted:   262 83% 68% / 0.15;

--color-success:        152 69% 42%;   /* Emerald */
--color-warning:        38 92% 54%;    /* Amber */
--color-danger:         0 84% 60%;     /* Crimson */

/* ── Neutrals (Dark Mode Base) ── */
--color-bg:             220 20% 6%;    /* Near-Black    #0D0F14 */
--color-surface-1:      220 18% 10%;   /* Card BG       #15181F */
--color-surface-2:      220 16% 14%;   /* Elevated Card #1C2028 */
--color-surface-3:      220 14% 19%;   /* Input BG      #282E3A */
--color-border:         220 12% 22%;   /* Subtle Line   #2F3645 */
--color-border-focus:   220 91% 55%;   /* Focus Ring = Primary */

--color-text-primary:   220 14% 93%;   /* #E8EAEE */
--color-text-secondary: 220 10% 60%;   /* #8C93A3 */
--color-text-tertiary:  220 10% 42%;   /* #606878 */
--color-text-inverse:   220 20% 6%;    /* On Light BG */

/* ── Light Mode Overrides ── */
[data-theme="light"] {
  --color-bg:             220 20% 97%;
  --color-surface-1:      0 0% 100%;
  --color-surface-2:      220 20% 95%;
  --color-surface-3:      220 18% 91%;
  --color-border:         220 14% 84%;
  --color-text-primary:   220 20% 9%;
  --color-text-secondary: 220 12% 42%;
}

/* ── Glassmorphism Tokens ── */
--glass-bg:             220 20% 100% / 0.05;
--glass-border:         220 20% 100% / 0.10;
--glass-blur:           backdrop-blur-xl;
```

---

### 1.2 Typography System

**Display face:** `Syne` — geometric, confident, distinct from generic sans  
**Body face:** `Inter` — maximum legibility at all sizes  
**Mono face:** `JetBrains Mono` — code, CV metadata, labels

```
/* ── Type Scale (rem) ── */
--text-2xs:   0.625rem;   /* 10px — overlines, micro labels */
--text-xs:    0.75rem;    /* 12px — captions, timestamps */
--text-sm:    0.875rem;   /* 14px — secondary body */
--text-base:  1rem;       /* 16px — primary body */
--text-lg:    1.125rem;   /* 18px — lead text */
--text-xl:    1.25rem;    /* 20px — card titles */
--text-2xl:   1.5rem;     /* 24px — section headings */
--text-3xl:   1.875rem;   /* 30px — page titles */
--text-4xl:   2.25rem;    /* 36px — hero subhead */
--text-5xl:   3rem;       /* 48px — hero headline */
--text-6xl:   3.75rem;    /* 60px — display */
--text-7xl:   4.5rem;     /* 72px — ultrawide display */

/* ── Font Weights ── */
--font-normal:   400;
--font-medium:   500;
--font-semibold: 600;
--font-bold:     700;
--font-black:    900;

/* ── Line Heights ── */
--leading-tight:  1.1;   /* display text */
--leading-snug:   1.25;  /* headings */
--leading-normal: 1.5;   /* body */
--leading-relaxed:1.625; /* long-form */
```

---

### 1.3 Spacing Scale (Golden Ratio–derived)

```
--space-0:   0;
--space-1:   0.25rem;   /* 4px  */
--space-2:   0.5rem;    /* 8px  */
--space-3:   0.75rem;   /* 12px */
--space-4:   1rem;      /* 16px */
--space-5:   1.25rem;   /* 20px */
--space-6:   1.5rem;    /* 24px */
--space-8:   2rem;      /* 32px */
--space-10:  2.5rem;    /* 40px */
--space-12:  3rem;      /* 48px */
--space-16:  4rem;      /* 64px */
--space-20:  5rem;      /* 80px */
--space-24:  6rem;      /* 96px */
--space-32:  8rem;      /* 128px */

/* Touch-Safe Minimum */
--touch-target: 2.75rem; /* 44px minimum per WCAG */
```

---

### 1.4 Shadow System (Layered Depth)

```
--shadow-sm:    0 1px 2px 0 rgb(0 0 0 / 0.3);
--shadow-md:    0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3);
--shadow-lg:    0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.4);
--shadow-xl:    0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.4);
--shadow-2xl:   0 25px 50px -12px rgb(0 0 0 / 0.6);
--shadow-glow:  0 0 0 1px hsl(var(--color-primary)), 0 0 20px hsl(var(--color-primary-glow));
--shadow-card:  0 0 0 1px hsl(var(--color-border)), var(--shadow-lg);
```

---

### 1.5 Border Radius & Motion

```
/* ── Radius ── */
--radius-sm:   0.25rem;   /* tags, chips */
--radius-md:   0.5rem;    /* inputs, small buttons */
--radius-lg:   0.75rem;   /* cards */
--radius-xl:   1rem;      /* modals, drawers */
--radius-2xl:  1.5rem;    /* large panels */
--radius-full:  9999px;   /* pills, avatars */

/* ── Motion ── */
--duration-fast:    100ms;
--duration-normal:  200ms;
--duration-slow:    350ms;
--duration-slower:  500ms;
--ease-out:    cubic-bezier(0.16, 1, 0.3, 1);    /* spring feel */
--ease-in-out: cubic-bezier(0.45, 0, 0.55, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* subtle bounce */
```

---

### 1.6 Interactive State Classes (Tailwind Convention)

```
/* ── Primary Button ── */
bg-[hsl(var(--color-primary))] text-white font-semibold
h-11 px-6 rounded-lg
hover:bg-[hsl(var(--color-primary-hover))] hover:shadow-[var(--shadow-glow)]
active:scale-[0.97] active:shadow-none
focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
focus-visible:outline-[hsl(var(--color-primary))]
disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none
transition-all duration-[200ms] ease-out

/* ── Input Field ── */
bg-[hsl(var(--color-surface-3))] text-[hsl(var(--color-text-primary))]
border border-[hsl(var(--color-border))] rounded-lg
h-11 px-4 text-sm
placeholder:text-[hsl(var(--color-text-tertiary))]
hover:border-[hsl(var(--color-border-focus/0.4))]
focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-primary))]
focus:ring-offset-2 focus:ring-offset-[hsl(var(--color-bg))]
transition-shadow duration-[150ms]

/* ── Card ── */
bg-[hsl(var(--color-surface-1))] rounded-xl
border border-[hsl(var(--color-border))]
shadow-[var(--shadow-card)]
hover:border-[hsl(var(--color-primary/0.3))]
hover:shadow-[0_0_0_1px_hsl(var(--color-primary/0.2)),var(--shadow-xl)]
transition-all duration-[200ms] ease-out
```

---

### 1.7 Reusable Component Library (Stitch Composables)

| Component      | Base Class Pattern |
|----------------|--------------------|
| `Badge`        | `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium` |
| `Avatar`       | `relative flex h-10 w-10 rounded-full overflow-hidden ring-2 ring-[hsl(var(--color-border))]` |
| `Tooltip`      | `absolute z-50 rounded-lg bg-[hsl(var(--color-surface-3))] px-3 py-1.5 text-xs shadow-lg` |
| `Drawer`       | `fixed inset-y-0 right-0 z-50 w-80 bg-[hsl(var(--color-surface-1))] shadow-2xl` |
| `Modal`        | `fixed inset-0 z-50 flex items-center justify-center p-4` |
| `Toast`        | `fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-xl px-4 py-3 shadow-xl` |
| `CommandPalette` | `fixed inset-0 z-50 flex items-start justify-center pt-16` |

---

## PART 2 — END-TO-END SCREEN PROMPTS

> Each prompt below feeds directly into Stitch via `generate_screen_from_text`

---

## SCREEN 1 — High-End SaaS Landing Page & Company Profile

```
Generate a production-ready React component using Tailwind CSS for a High-End SaaS 
Landing Page and Company Profile. This is the public marketing homepage for a premium 
CV Builder & Portfolio platform. Apply glassmorphism aesthetics on a near-black background 
(#0D0F14). Use Google Fonts: Syne (display) + Inter (body). All sections must be 
scroll-animatable via Framer Motion (staggered fade-up, 40px Y offset, 0.5s duration, 
0.08s stagger per child).

─── RESPONSIVE LAYOUT MASTERPLAN ──────────────────────────────────────────

MOBILE PORTRAIT (<640px):
- Single column, full-width stack. No horizontal scroll.
- Fixed bottom navigation bar (h-16): Home · Features · Pricing · Sign In icons.
- Hamburger menu (top-right) slides open a full-height drawer (w-full).
- Hero: vertically stacked — badge → H1 → description → 2 stacked CTA buttons.
- Touch targets: minimum h-11 (44px) on all interactive elements.
- Padding: px-5 on all sections.
- Feature cards: single column, full-width, swipeable carousel (overflow-x-scroll snap-x).
- Pricing: single column stack, active card has border-2 border-primary with glow.

MOBILE LANDSCAPE (<896px height, width ≥ 640px):
- 2-column grid for hero (text left, visual right).
- Bottom nav hidden, thin top bar visible.
- Floating CTA button pinned bottom-right (FAB pattern, h-14 w-14 rounded-full).
- Reduce vertical padding by 30% to prevent excessive scrolling.
- Safe-area-inset: env(safe-area-inset-bottom) for iOS notch handling.

TABLET PORTRAIT (640px–1023px):
- 2-column grid resumes for features (grid-cols-2 gap-6).
- Navigation: collapsible top-bar with hamburger → slide-out sidebar (w-72).
- Hero: 2-column 60/40 split (text:visual).
- Pricing cards: 2-col grid. Active card elevated with scale-[1.02].
- Sections: px-8 py-16.

TABLET LANDSCAPE (1024px–1279px):
- 3-column feature grid (grid-cols-3).
- Persistent top navbar, fully visible links.
- Hero: 2-column 50/50, visual = animated mockup screenshot.
- Logo strip: horizontal marquee (infinite scroll) of company logos.
- Sections: px-12 py-20.

DESKTOP (1280px–1535px):
- Fixed glassmorphism header: 
  `fixed top-0 inset-x-0 z-50 h-16 border-b border-white/5 bg-white/[0.03] 
   backdrop-blur-xl flex items-center justify-between px-8`
- Max-width container: `max-w-7xl mx-auto`.
- Hero: 2-column, 55/45. Left: bold headline + CTA. Right: browser-frame mockup 
  with floating stat cards (absolute positioned, animated entry).
- Feature section: Bento Box grid —
  `grid grid-cols-3 grid-rows-2 gap-4`  with one card spanning col-span-2.
- Sections: px-16 py-24.

ULTRAWIDE (>1536px):
- Container locked: `max-w-screen-2xl mx-auto`
- Hero image scales up, mockup shows full split-pane CV Builder screenshot.
- 4-column logo grid for social proof.
- Bento grid: `grid-cols-4 grid-rows-2`, first card `col-span-2 row-span-2`.

─── SECTIONS TO GENERATE ──────────────────────────────────────────────────

[1] HERO SECTION
- Eyebrow badge: `"New · AI-Powered CV Engine v2.0"`  
  styled as: inline-flex gap-1.5 items-center px-3 py-1 rounded-full text-xs 
  font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 ring-1 
  ring-indigo-500/10
- H1 (Syne Black): "Build the CV That Opens Doors" 
  gradient text: `bg-gradient-to-br from-white via-white/90 to-indigo-200 bg-clip-text 
  text-transparent` 
  Size: text-5xl (mobile) → text-7xl (desktop)
- Subheading (Inter Regular, text-text-secondary): max-w-xl
- 2 CTAs: Primary "Start Building Free" + Ghost "See Live Demo →"
- Floating stat badges (desktop only): 
  "127K+ CVs Created", "98% ATS Score", "4.9★ Rating" 
  — absolute positioned on hero visual, animated with spring easing.
- Background: radial gradient spotlight from top-center; 
  subtle grid pattern overlay (svg pattern, 1px lines, opacity-[0.03]).

[2] SOCIAL PROOF / LOGO STRIP
- "Trusted by professionals at" label, text-xs text-tertiary, uppercase tracking-widest
- Horizontal marquee of 8 company logo placeholders (grayscale, hover:grayscale-0, 
  opacity-40 hover:opacity-100 transition-all)
- Divider: `border-t border-white/5`

[3] FEATURE BENTO BOX
- Section label: "Platform Features" (eyebrow)
- H2: "Everything to Stand Out"
- 6 cards in Bento layout (see grid specs above per breakpoint):
  Card A (large): "AI CV Optimizer" — with terminal-style animated text typing effect
  Card B: "29+ Premium Themes" — color swatch grid (6×6)
  Card C: "Real-Time PDF Preview" — mini split-pane thumbnail
  Card D: "Public Portfolio" — masonry grid thumbnail
  Card E: "ATS Score Checker" — circular progress ring, 98%
  Card F: "One-Click Sharing" — URL field + copy button micro-interaction
- Each card: `group relative overflow-hidden rounded-2xl bg-surface-1 border 
  border-white/5 p-6 hover:border-primary/30 transition-all duration-300`
- Accent gradient on hover: `after:absolute after:inset-0 after:opacity-0 
  group-hover:after:opacity-100 after:bg-gradient-to-br after:from-primary/5 after:to-transparent`

[4] PRICING SECTION
- H2: "Simple, Honest Pricing"
- Toggle: Monthly / Annually (saves 30%) — pill toggle with sliding indicator
- 3 pricing cards (Free · Pro · Team):
  - Free: `border border-border rounded-2xl p-8`
  - Pro (featured): `border-2 border-primary rounded-2xl p-8 scale-[1.02] 
    shadow-[0_0_40px_hsl(220_91%_55%_/_0.15)]`
  - Team: `border border-border rounded-2xl p-8`
  Each card: name → price (large, Syne) → description → divider → features list 
  (checkmark items) → CTA button.

[5] CTA BANNER
- Full-width section with radial gradient background
- H2 + subtext + "Start Free Today" button
- `bg-gradient-to-r from-primary/20 via-accent/10 to-transparent rounded-3xl`

[6] FOOTER
- 4-column grid (desktop): Logo+tagline · Product links · Company links · Social icons
- Copyright line, Privacy, Terms links
- Theme toggle (sun/moon icon) bottom-right corner
```

---

## SCREEN 2 — User Dashboard & Services Manager

```
Generate a production-ready React component using Tailwind CSS for a SaaS User Dashboard 
with sidebar navigation, document management, and a services/subscription panel. 
Dark mode default (bg: #0D0F14). Fonts: Syne (headings) + Inter (body). 
Include a command palette (Ctrl+K modal) and toast notification system.

─── RESPONSIVE LAYOUT MASTERPLAN ──────────────────────────────────────────

MOBILE PORTRAIT (<640px):
- NO sidebar. Bottom tab bar (5 icons, fixed h-16, bg-surface-1 border-t border-border):
  Home · My CVs · Portfolio · Profile · Settings
- Top bar: Logo (left) + Bell icon + Avatar (right). h-14.
- Content: full-width single column, px-4.
- Stats: 2×2 grid of compact stat cards.
- CV list: vertical stack, swipe-left to reveal Delete / Share actions (translateX pattern).
- FAB (bottom-right, above nav bar): "＋ New CV" — rounded-full h-14 w-14 bg-primary 
  shadow-glow.
- Command palette: full-screen modal, input pinned at top, results list below.

MOBILE LANDSCAPE:
- Bottom nav compresses to icon-only (no labels).
- Content: 2-column grid for CV cards.
- Stats: 1×4 horizontal scroll row.
- Drawer for profile/settings replaces full-page navigation.

TABLET PORTRAIT (640px–1023px):
- Collapsible sidebar (w-64 expanded, w-16 collapsed icon-only).
  Toggle via chevron button at bottom of sidebar.
- Sidebar: Logo → Nav items (icon + label) → divider → Upgrade card → User avatar+name.
- Main content: px-6, 2-column stat grid, 2-column CV card grid.
- Breadcrumb: below top bar. `Dashboard / My Documents`
- No bottom bar. Sidebar handles all navigation.

TABLET LANDSCAPE (1024px–1279px):
- Sidebar always expanded (w-64), non-collapsible.
- 3-column CV card grid.
- Right panel (w-80 slide-out): opens on CV card click — showing CV preview thumbnail, 
  quick stats (Views, Downloads, ATS Score), and action buttons.

DESKTOP (1280px–1535px):
- 3-panel layout:
  LEFT: Fixed sidebar w-64. bg-surface-1 border-r border-border.
    - Logo (h-16 header, border-b border-border)
    - Nav items: each `flex items-center gap-3 px-4 h-11 rounded-lg mx-2 text-sm 
      font-medium hover:bg-surface-2 active:bg-primary/10 active:text-primary`
    - Active state: `bg-primary/10 text-primary`
    - Icon: 20px, Lucide icons
    - Section labels (text-2xs uppercase tracking-widest text-tertiary, px-4 mb-1 mt-4)
    - Sections: WORKSPACE (Dashboard, My CVs, My Portfolio), ACCOUNT (Profile, Billing, 
      Settings, Help)
    - Bottom of sidebar: 
      Upgrade prompt card `bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-4 mx-3 mb-3`
      User row: avatar + name/email + chevron for profile dropdown.
  
  CENTER: Main content, flex-1, overflow-y-auto, p-8.
    - Top bar: h-16, flex items-center justify-between, border-b border-border, px-8.
      Left: Breadcrumb. Right: Search bar (triggers command palette) + Bell + Avatar.
    - Page heading + "New CV" button (right-aligned).
    - Stats row: 4 stat cards `grid grid-cols-4 gap-4 mb-8`
      Each card: icon (bg-primary/10 rounded-lg p-2) + label + value + trend badge.
    - CV Documents grid: `grid grid-cols-2 xl:grid-cols-3 gap-4`
      Each CV card: thumbnail (bg-surface-2, aspect-[3/4], rounded-lg) + title + 
      last-edited date + ATS score badge + 3-dot menu.
  
  RIGHT: Contextual panel w-80 (slide-in on CV select). Details view.

ULTRAWIDE (>1536px):
- Sidebar w-72.
- Center grid: grid-cols-4.
- Right panel always visible (not slide-in).
- Command palette: max-w-2xl, more spacious.

─── COMPONENTS TO GENERATE ──────────────────────────────────────────────

[COMMAND PALETTE — global overlay]
Trigger: Ctrl+K or clicking search bar.
Overlay: `fixed inset-0 z-50 bg-black/60 backdrop-blur-sm`
Modal: `mx-auto mt-16 max-w-lg rounded-2xl bg-surface-1 border border-border shadow-2xl overflow-hidden`
- Search input: h-14, text-lg, no border, bg-transparent, px-5, border-b border-border.
  Placeholder: "Search CVs, settings, actions..."
  Right side: `⌘K` kbd badge + Escape to close
- Results sections: "Recent" · "Documents" · "Actions"
  Each result row: h-11, flex items-center gap-3, px-4, hover:bg-surface-2, rounded-lg.
  Icon (left) + primary label + secondary label (right, text-tertiary text-xs)
  Keyboard shortcut badge on action items.
- Footer: hints bar `flex gap-6 px-4 py-2 border-t border-border text-2xs text-tertiary`

[TOAST NOTIFICATION — floating]
Position: `fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-80`
Each toast: `flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md`
  - Success: bg-success/10 border-success/20 text-success icon + message + close btn
  - Error: bg-danger/10 border-danger/20 text-danger
  - Info: bg-primary/10 border-primary/20 text-primary
Auto-dismiss: 4s. Progress bar at bottom of toast.

[STAT CARDS — 4 items]
"Total CVs Created" (document icon, blue) — count + "+3 this month"
"Portfolio Views" (eye icon, violet) — count + sparkline mini chart
"ATS Score Average" (shield icon, green) — percentage + "Excellent" label
"Profile Completion" (circle icon, amber) — percentage ring + "2 steps left"

[CV DOCUMENT CARD]
`relative group rounded-xl bg-surface-1 border border-border 
hover:border-primary/30 overflow-hidden transition-all duration-200 cursor-pointer`
- Thumbnail area: `aspect-[3/4] bg-surface-2 relative overflow-hidden`
  Faded CV template preview inside + gradient overlay at bottom
  Hover: overlay darkens + action buttons appear (Edit · Preview · Share)
- Card footer: `px-4 py-3 border-t border-border`
  Title (font-semibold) · Last edited date (text-xs text-tertiary)
  Row 2: ATS badge (green pill) · Status badge (Active/Draft) · 3-dot menu btn

[UPGRADE CARD — sidebar]
`bg-gradient-to-br from-primary/15 to-accent/10 rounded-xl p-4 border border-primary/20`
Crown icon + "Upgrade to Pro" bold + short benefit line
"Upgrade Now" button: full-width, bg-primary, h-9, text-sm
```

---

## SCREEN 3 — CV Builder Interface (Split-Pane Editor & Live Preview)

```
Generate a production-ready React component for a Split-Pane CV Builder Editor. 
The left pane is an accordion-based form editor; the right pane is a live, 
real-time PDF-like preview. Dark editor, white preview pane (to simulate paper). 
Use Tailwind CSS + Inter font. This is the most complex screen.

─── RESPONSIVE LAYOUT MASTERPLAN ──────────────────────────────────────────

MOBILE PORTRAIT (<640px):
- SINGLE PANE TABS: "Edit" | "Preview" pill-toggle at top, h-11.
  Default: Edit tab active. 
  `flex bg-surface-2 rounded-xl p-1 gap-1 mx-4` 
  Active tab: `bg-surface-1 shadow-sm rounded-lg text-primary font-semibold`
- Editor pane: full-screen below tabs. Single-column stacked form modules.
  Sticky bottom action bar (h-16): Save · Share · Download buttons.
- Preview pane: full-screen white canvas, scaled down (transform-scale to fit screen), 
  pinch-to-zoom gesture hint visible.
- Form inputs: h-12 (48px) minimum. Labels above inputs (not floating).
- Accordion sections: full-width, border-b border-border dividers.
- NO side-by-side layout on mobile portrait.

MOBILE LANDSCAPE:
- 2-column layout: Editor (w-1/2) | Preview (w-1/2).
- Shrink accordion padding to py-3.
- Preview: zoom-to-fit the available height.
- Top bar: title + tab icons only (no labels).

TABLET PORTRAIT (640px–1023px):
- Tab toggle still visible at top.
- Editor pane when active: max-w-2xl mx-auto, proper padding px-6.
- Preview: opens as a bottom slide-up drawer (h-[70vh]) triggered by "Preview" tab.
  Drawer has drag handle + close X + "Download PDF" button.

TABLET LANDSCAPE (1024px–1279px):
- Full split-pane: Editor (flex-1) | Preview (w-[45%]).
- Resizable divider: draggable handle in center, cursor-col-resize.
- Sticky editor top bar: template selector dropdown + undo/redo + theme picker dots.
- Preview: white bg, shadow-2xl, mx-auto, max-w-[600px], overflow-y-auto.

DESKTOP (1280px–1535px):
- 3-zone layout:
  LEFT SIDEBAR (w-56, fixed): Section navigator — vertical list of CV sections 
    (Personal Info · Summary · Experience · Education · Skills · Projects · Awards)
    Each item: icon + label + completion dot (green if complete, gray if empty)
    Click: smooth-scrolls editor to that section's accordion.
  CENTER EDITOR (flex-1, max-w-xl, overflow-y-auto): Accordion form modules.
  RIGHT PREVIEW (w-[42%], fixed right): Live preview pane.

  TOP APP BAR (h-14, border-b, glassmorphism):
    Left: Back button + "My CVs" breadcrumb.
    Center: CV title (editable inline, click to rename). 
    Right: Theme picker (5 color dots + "All themes" popover) · Undo/Redo · 
           "Share" button · "Download PDF" primary button.

ULTRAWIDE (>1536px):
- Left sidebar w-64.
- Center editor max-w-2xl.
- Right preview max-w-3xl (A4 paper at near-natural size).
- Preview shows actual page-count footer: "Page 1 of 2".

─── EDITOR COMPONENTS ──────────────────────────────────────────────────

[SECTION NAVIGATOR — desktop left sidebar]
`flex flex-col gap-1 p-3`
Each nav item: `flex items-center gap-3 h-10 px-3 rounded-lg text-sm hover:bg-surface-2 
cursor-pointer transition-colors`
Active: `bg-primary/10 text-primary font-medium`
Completion indicator: `ml-auto h-2 w-2 rounded-full` 
  (bg-success if complete, bg-border if empty, bg-warning if partial)
Drag handle (::before): allows section reordering (drag-and-drop)

[ACCORDION MODULES — center editor]
Container: `flex flex-col gap-3`
Each module: `rounded-xl border border-border overflow-hidden bg-surface-1`
  Header: `flex items-center gap-3 h-14 px-5 cursor-pointer hover:bg-surface-2`
    Left: drag handle (GripVertical icon) + section icon + label (font-semibold)
    Right: completion badge (text-xs text-success) + ChevronDown (rotates on open)
  Content: `px-5 pb-5 pt-2 border-t border-border space-y-4`
    Animates open/close with max-height transition.

[FORM FIELD COMPONENTS]
Text input: h-11, rounded-lg, bg-surface-3, border border-border, px-4, text-sm.
  Label: text-xs font-medium text-secondary mb-1.5 block.
Textarea: min-h-24, resize-y, same styling as input.
Date range: 2 inputs side-by-side + "Present" checkbox (right-aligned).
Rich text toolbar (for Summary, descriptions): 
  `flex gap-1 mb-2 p-1 rounded-lg bg-surface-2 border border-border`
  Buttons: B I U · Link · List — each h-8 w-8 rounded-md hover:bg-surface-3.
Skill tags: input + Enter to add tags. Tags: `badge with × close button`.
  `flex flex-wrap gap-2 mt-2`
  Each tag: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs 
  font-medium bg-primary/10 text-primary border border-primary/20`

[REPEATABLE ITEM GROUPS — Experience, Education]
Each entry: `rounded-xl bg-surface-2 p-4 border border-border relative group`
  Drag handle (top-left, visible on hover).
  Delete button (top-right, visible on hover): icon button, text-danger on hover.
  Fieldset: grid grid-cols-2 gap-4 (company + title, start date + end date, etc.)
  Description textarea: full-width.
  "Add bullet" helper: text-xs text-primary underline cursor-pointer.
"+ Add Experience" button: `w-full h-11 rounded-xl border border-dashed border-border 
hover:border-primary/50 hover:bg-primary/5 text-sm text-secondary hover:text-primary 
flex items-center justify-center gap-2 transition-all`

[THEME PICKER POPOVER — top bar]
Trigger: a row of 5 colored circles (selected has ring-2 ring-offset-2 ring-white).
Popover: `absolute top-full right-0 mt-2 w-72 rounded-2xl bg-surface-1 border 
border-border shadow-2xl p-4 z-50`
  Header: "Choose Theme" text-sm font-semibold + "29 themes" badge.
  Grid: `grid grid-cols-6 gap-2` — each theme: h-9 w-9 rounded-full, 
  the theme's primary color as bg. Tooltip on hover (theme name).
  Preview switch: Light / Dark toggle for theme preview mode.

[LIVE PREVIEW PANE]
Container: `bg-gray-100 overflow-y-auto flex justify-center py-8`
Paper: `bg-white shadow-2xl rounded-sm mx-auto` 
  Width: 595px (A4) on desktop. Scales down responsively.
  Min-height: 842px (A4 height).
  Padding: 48px 56px.
CV content rendered as: font-[Georgia,serif], text-gray-800, with semantic hierarchy.
  Name: text-3xl font-bold text-gray-900.
  Section headers: text-xs uppercase tracking-widest text-primary border-b border-primary mb-2.
  Company/Title: font-semibold + location (text-sm text-gray-600).
  Date: text-xs text-gray-500.
  Bullets: pl-4 list-disc text-sm leading-relaxed text-gray-700.
Zoom controls: bottom-right of preview pane, floating:
  `absolute bottom-4 right-4 flex items-center gap-2 bg-surface-1 
  border border-border rounded-xl px-3 py-2 shadow-lg text-sm`
  − btn · "100%" · + btn

[STICKY ACTION BAR — mobile only]
`fixed bottom-0 inset-x-0 h-16 bg-surface-1/90 backdrop-blur-md 
border-t border-border flex items-center justify-between px-5`
Left: last-saved timestamp ("Saved 2s ago · ✓" in text-xs text-success)
Right: "Share" ghost btn + "Download PDF" primary btn
```

---

## SCREEN 4 — VIP Public Portfolio Page

```
Generate a production-ready React component for a minimalist, high-end Public Portfolio Page. 
This is a personalized public profile page for a professional showcasing their work. 
Clean white/light default, with a user-selectable dark option. 
Fonts: Syne (display, headings) + Inter (body). Restrained, editorial aesthetic.
No flashy gradients — the work should speak. Motion: subtle scroll-reveals only.

─── RESPONSIVE LAYOUT MASTERPLAN ──────────────────────────────────────────

MOBILE PORTRAIT (<640px):
- Single column. px-5.
- Header: avatar (h-16 w-16 rounded-full, ring-2) + name (text-2xl Syne) + role (text-sm).
  Contact row: icon links for Email · LinkedIn · GitHub — icon-only, h-9 w-9 rounded-full 
  border border-border hover:bg-surface-2.
- Bio: text-sm text-secondary, max-w-prose.
- Section tabs: "Projects" · "Skills" · "Experience" · "CV"  
  Horizontal scroll pill tabs below bio.
- Projects: single column card stack.
- "Download CV" button: full-width, h-12.
- Navigation: NO sidebar, top bar with name + theme toggle.

MOBILE LANDSCAPE:
- 2-column project grid.
- Tabs persist at top (sticky, bg-white border-b).
- Sidebar hidden. Content max-w-2xl centered.

TABLET PORTRAIT (640px–1023px):
- Header: 2-column (60/40): text + avatar/action area.
- Projects: 2-column masonry grid (`columns-2 gap-4`).
- Skills: 2-column grid of skill clusters.
- Bio: max-w-xl.

TABLET LANDSCAPE (1024px–1279px):
- 2-panel layout: 
  Left sticky column (w-72): Profile card (avatar + name + bio + social links + 
  "Download CV") — this stays fixed while right side scrolls.
  Right content (flex-1): Projects · Skills · Experience sections.

DESKTOP (1280px–1535px):
- 2-panel layout (same as tablet landscape but more spacious):
  Left: w-80, fixed sidebar. max-w-screen-lg mx-auto outer container.
  Right: 2-column or 3-column project grid.
  Top of page: full-width hero strip (thin, h-48) — user's custom cover image or 
  abstract gradient. Below: the 2-panel layout begins.

ULTRAWIDE (>1536px):
- max-w-screen-2xl mx-auto.
- Left panel w-96.
- Project grid: 3-column masonry.
- Skills section: tag-cloud layout with size-weighted tags.
- Subtle parallax on hero strip.

─── SECTIONS TO GENERATE ──────────────────────────────────────────────

[HERO STRIP]
Full-width, h-40 (mobile) → h-56 (desktop).
Background: user's cover photo OR a default abstract gradient:
`bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900`
No text over hero. Clean, atmospheric.

[PROFILE SIDEBAR / HEADER CARD]
Avatar: `h-20 w-20 rounded-full ring-4 ring-white shadow-xl -mt-10 relative z-10` 
  (overlaps hero strip bottom edge)
Name: `text-2xl font-bold tracking-tight` (Syne)
Role: `text-sm text-secondary font-medium`
Location badge: `inline-flex items-center gap-1.5 text-xs text-tertiary`
  (MapPin icon + "Singapore · Open to Remote")
Bio: `text-sm text-secondary leading-relaxed mt-3 max-w-xs`

Social links row: `flex gap-2 mt-4`
  Each: `h-9 w-9 flex items-center justify-center rounded-full 
  border border-border hover:border-primary hover:text-primary hover:bg-primary/5 
  transition-all duration-150`
  Icons: Github · Linkedin · Twitter/X · Website · Email

"Download CV" CTA: `mt-6 w-full h-11 rounded-xl bg-surface-1 border border-border 
font-semibold text-sm hover:bg-primary hover:text-white hover:border-primary 
transition-all duration-200 flex items-center justify-center gap-2`
  Download icon + "Download CV (PDF)"

Stats row: `grid grid-cols-3 gap-3 mt-6`
  Each: `text-center rounded-xl bg-surface-1 border border-border p-3`
  Number (text-lg font-bold) + label (text-2xs text-tertiary uppercase)
  "12 Projects" · "5 Yrs Exp" · "8 Skills"

[PROJECTS SECTION — masonry grid]
Section heading: `text-xs font-semibold uppercase tracking-widest text-tertiary mb-6`
Filter chips: `flex gap-2 flex-wrap mb-6`
  Each: `px-4 h-8 rounded-full border border-border text-sm hover:border-primary 
  hover:text-primary cursor-pointer transition-all`
  Active: `bg-primary text-white border-primary`
  Labels: All · Web · Design · Open Source · Writing

Project cards — 2 sizes (large and small, alternated for visual rhythm):
LARGE CARD: `rounded-2xl overflow-hidden border border-border group cursor-pointer`
  Image area: `aspect-video overflow-hidden bg-surface-2`
    Placeholder: abstract gradient or dark bg with project initials.
    `group-hover:scale-[1.02] transition-transform duration-500`
  Content: `p-5`
    Tags: `flex gap-2 mb-3` — tech stack chips (text-2xs rounded-full px-2 py-0.5 
    bg-surface-2 text-tertiary border border-border)
    Title: `text-lg font-semibold` (Syne)
    Description: `text-sm text-secondary mt-1 line-clamp-2`
    Footer: `flex items-center justify-between mt-4`
      Date (text-xs text-tertiary) + "View Project →" (text-sm text-primary font-medium 
      opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 
      transition-all duration-200)

SMALL CARD: same structure but no image, `p-6`, bg-surface-1, `hover:bg-surface-2`.

[SKILLS SECTION]
Two-column layout (desktop): Technical Skills (left) + Soft Skills (right).
Each skill cluster:
  Cluster heading: text-xs uppercase tracking-widest text-tertiary mb-3.
  Skills: `flex flex-wrap gap-2`
  Each tag: `px-3 py-1.5 rounded-full bg-surface-1 border border-border text-sm 
  font-medium hover:border-primary/40 hover:bg-primary/5 transition-all`
  "Expert" tags: `bg-primary/10 text-primary border-primary/20`

[EXPERIENCE SECTION]
Timeline layout (vertical line on left, content right):
`relative pl-8 before:absolute before:left-[11px] before:top-2 before:bottom-0 
before:w-px before:bg-border`
Each entry:
  Dot: `absolute left-0 top-1.5 h-6 w-6 rounded-full bg-surface-1 border-2 
  border-border flex items-center justify-center`
    Icon inside (briefcase, graduation cap per type).
  Content: `mb-8 ml-4`
    Date: `text-xs text-tertiary font-medium mb-1` (Syne Mono or JetBrains Mono)
    Role: `text-base font-semibold`
    Company: `text-sm text-secondary`
    Description: `text-sm text-secondary mt-2 leading-relaxed`

[CONTACT SECTION]
Minimal, centered. 
H2: "Let's Work Together" (Syne, large)
Subtext: email address as large, copyable link.
`text-2xl font-bold text-primary hover:underline cursor-pointer transition-colors`
Secondary: social icons row (larger, h-11 w-11 version).

[PUBLIC PAGE TOP BAR]
`sticky top-0 z-40 h-14 flex items-center justify-between px-5 
bg-white/80 backdrop-blur-sm border-b border-border`
Left: viewer's perspective — just the person's name initials + name.
Right: "Hire Me" CTA button + Dark/Light mode toggle (sun/moon icon).
```

---

## PART 3 — IMPLEMENTATION NOTES FOR STITCH

### Component Composability Rules

1. **Atomic first:** All buttons, inputs, badges, and avatars should be generated as isolated, exported components before being composed into sections.

2. **Variant props:** Every component must support a `variant` prop (e.g., Button: `primary | ghost | outline | danger`) and a `size` prop (`sm | md | lg`).

3. **Dark mode tokens:** Use CSS custom properties (`var(--color-*)`) rather than hardcoded Tailwind color values wherever possible, enabling the 29-theme system to work by swapping token values.

4. **Framer Motion integration:** All section transitions should use `motion.div` with `initial={{ opacity: 0, y: 40 }}` and `whileInView={{ opacity: 1, y: 0 }}`. Use `viewport={{ once: true, margin: "-80px" }}` to prevent re-animation on scroll-back.

5. **Responsive utilities:** Use Tailwind's built-in prefixes: `sm:` (640px+), `md:` (768px+), `lg:` (1024px+), `xl:` (1280px+), `2xl:` (1536px+). Never use arbitrary breakpoints when standard ones suffice.

6. **Accessibility baseline:**
   - All icon-only buttons: `aria-label` required.
   - Focus rings: always visible (`focus-visible:ring-2`), never `outline-none` without replacement.
   - Color contrast: minimum 4.5:1 for body text (WCAG AA).
   - Motion: wrap animations in `@media (prefers-reduced-motion: no-preference)` or use Framer's `useReducedMotion()` hook.

7. **Performance:** Images use `loading="lazy"` + `decoding="async"`. Large sections use React `Suspense` boundaries.

---

*End of Stitch Design System & Screen Prompt Blueprint*  
*Version 1.0 — Ready for `generate_screen_from_text` execution*
