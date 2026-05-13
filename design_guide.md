# BanavatNest — Design System & Style Guide

A comprehensive reference distilled from the entire codebase to ensure **visual consistency** across all future pages, components, and features.

> **v2 Update:** Color theme updated to match the official BanavatNest logo — navy blue primary, teal accent, and leaf green CTA. The previous lime-green (`#84CC16`) and warm brown (`#5D3A1A`) palette has been fully replaced.

---

## 1. Color Palette

### Primary Brand Colors

| Role | Light Mode | Dark Mode | Tailwind Class | Hex |
|---|---|---|---|---|
| **Primary (Navy)** | Deep navy | Deep navy | `text-[#2D3561]`, `bg-[#2D3561]` | `#2D3561` |
| **Primary (hover)** | Darker navy | Darker navy | `hover:bg-[#1f2545]` | `#1f2545` |
| **Accent (Teal)** | Teal | Teal | `text-[#3A9B9B]`, `bg-[#3A9B9B]` | `#3A9B9B` |
| **Accent (hover)** | Darker teal | Darker teal | `hover:bg-[#2a7676]` | `#2a7676` |
| **CTA Button** | Leaf green | Teal | `bg-[#5BBD4A]` / `dark:bg-[#3A9B9B]` | `#5BBD4A` |
| **CTA Button (hover)** | Darker green | Darker teal | `hover:bg-[#3a8a2c]` / `dark:hover:bg-[#2a7676]` | `#3a8a2c` |

### Neutral / Background Colors

| Surface | Light | Dark | Usage |
|---|---|---|---|
| **Page Background** | `bg-zinc-50` | `dark:bg-[#09090b]` | All pages, body |
| **Card / Surface** | `bg-white` | `dark:bg-zinc-900/50` or `dark:bg-zinc-900` | Cards, sections, modals |
| **Footer Background** | `bg-white` | `dark:bg-[#070708]` | Footer only |
| **Navbar** | `bg-white/90` | `dark:bg-[#09090b]/90` | Fixed top nav with `backdrop-blur-xl` |
| **Input Fields** | `bg-zinc-50` or `bg-white` | `dark:bg-zinc-950` | Form elements |
| **Subtle Surface** | `bg-[#E8F7F7]` or `bg-[#EAF8EA]` | `dark:bg-zinc-800/50` | Secondary panels, icon bg |

### Text Colors

| Level | Light | Dark |
|---|---|---|
| **Heading / Primary** | `text-zinc-900` | `dark:text-zinc-100` |
| **Body / Secondary** | `text-zinc-600` or `text-gray-500` | `dark:text-zinc-400` |
| **Muted / Tertiary** | `text-zinc-500` or `text-gray-400` | `dark:text-zinc-500` |
| **Active Nav / Highlight** | `text-[#3A9B9B]` | `text-[#3A9B9B]` |
| **Brand Name — "Banavat"** | `text-[#2D3561]` | `dark:text-zinc-100` |
| **Brand Name — "Nest"** | `text-[#3A9B9B]` | `text-[#3A9B9B]` |

### Border Colors

| Context | Light | Dark |
|---|---|---|
| **Card / Section Borders** | `border-zinc-100` or `border-zinc-200` | `dark:border-zinc-800` |
| **Navbar Border** | `border-gray-100/50` | `dark:border-zinc-800/50` |
| **Footer Separator** | `border-gray-100` | `dark:border-zinc-900` |
| **Focus State (forms)** | `focus:border-[#3A9B9B]` | `focus:border-[#3A9B9B]` |
| **Card hover (teal)** | `hover:border-[#3A9B9B]/30` | `dark:hover:border-[#3A9B9B]/30` |

### Accent Colors (per domain / focus area)

These secondary accents are used **only for domain-specific cards** (icon tint, hover borders, gradient blobs):

| Domain | Accent | Usage |
|---|---|---|
| AI/ML | `text-blue-500` / `text-[#2D3561]` | R&D, AI cards |
| Cybersecurity | `text-[#3A9B9B]` / `text-teal-500` | Cyber cards |
| Smart Systems | `text-purple-500` / `text-violet-500` | Smart cards |
| Agriculture | `text-[#5BBD4A]` / `text-emerald-500` | Agri cards |

> [!IMPORTANT]
> The **primary accent is always `#3A9B9B` (teal)**. The **CTA / submit color is `#5BBD4A` (leaf green)**. The **brand primary is `#2D3561` (navy)**. Domain-specific accents are only for icon tints and hover borders on cards. Every other UI element (nav highlight, active indicator, focus rings, links) must use `#3A9B9B`.

---

## 2. Typography

### Font Families

| Locale | Font | CSS Variable |
|---|---|---|
| English | **Inter** | `--font-inter` |
| Hindi / Punjabi | **Noto Sans Devanagari** | `--font-devanagari` |
| Bengali | **Noto Sans Bengali** | `--font-bengali` |

### Font Weight Usage

| Weight | Tailwind | Usage |
|---|---|---|
| 300 | `font-light` | Rarely used |
| 400 | `font-normal` | — |
| 500 | `font-medium` | Body text, descriptions, subtitles |
| 600 | `font-semibold` | Read More buttons |
| 700 | `font-bold` | Nav links, labels, card headings, list items |
| 800 | `font-extrabold` / `font-black` | Page titles, hero text, section headings |

> [!TIP]
> The site is **font-weight-heavy** by design. Prefer `font-bold` (700) as the baseline for nav/labels and `font-black` (800) for page headings. Avoid `font-normal` except for long prose.

### Heading Scale

| Level | Size | Class |
|---|---|---|
| Hero / H1 | 5xl → 7xl (responsive) | `text-5xl md:text-7xl font-black tracking-tighter` |
| Section H2 | 3xl → 4xl | `text-3xl md:text-4xl font-black tracking-tighter` |
| Card H3 | 2xl → 3xl | `text-2xl md:text-3xl font-bold` |
| Body Text | lg or xl | `text-lg` or `text-xl font-medium leading-relaxed` |
| Labels / Captions | xs → sm | `text-sm font-bold` or `text-xs font-bold uppercase tracking-widest` |

---

## 3. Spacing & Layout

### Content Containers
- **Max width**: `max-w-7xl mx-auto`
- **Horizontal padding**: `px-4 sm:px-6 lg:px-8`
- **Section vertical padding**: `py-24` or `pt-24 pb-20`

### Grid System
- **2-column layout**: `grid grid-cols-1 md:grid-cols-2 gap-12`
- **4-column footer**: `grid grid-cols-1 md:grid-cols-4 gap-12`
- **Bento grid (cards)**: `grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8`

### Navbar
- **Height**: `h-20` (80px)
- **Position**: `fixed top-0 w-full z-50`
- All pages should have `pt-20` or equivalent to offset the fixed nav

---

## 4. Border Radius System

| Token | Value | Usage |
|---|---|---|
| `rounded-full` | 9999px | Buttons (CTA), badges, pill shapes, dots |
| `rounded-[4rem]` | 64px | Board member cards (largest) |
| `rounded-[2.5rem]` | 40px | Feature cards, content panels, image carousels |
| `rounded-2xl` | 16px | Dropdowns, inner image frames, icon boxes |
| `rounded-xl` | 12px | Inputs, small buttons, mobile menu items |
| `rounded-lg` | 8px | Form inputs (PartnersFeedback variant) |

> [!IMPORTANT]
> **New cards and panels should use `rounded-[2.5rem]`**. This is the primary shape token for the site. Use `rounded-full` for all pill buttons and badges. Use `rounded-2xl` for nested/inner elements.

---

## 5. Shadows & Depth

| Level | Class | Usage |
|---|---|---|
| **Default card** | `shadow-sm` | Resting state for cards |
| **Elevated card (hover)** | `shadow-xl` → `hover:shadow-2xl` | Card hover states |
| **Navbar** | None (uses border + backdrop-blur) | Nav bar |
| **CTA buttons** | `shadow-lg` or `shadow-xl` | Primary actions |
| **Dark mode glow** | `dark:hover:shadow-[0_0_40px_rgba(58,155,155,0.15)]` | Board cards, special hover states |
| **Image overlays** | `shadow-2xl` | Image carousels |

> **Updated:** Dark mode glow now uses teal (`rgba(58,155,155,0.15)`) instead of lime green.

---

## 6. Dark Mode Strategy

- **Method**: Class-based (`.dark` on `<html>`)
- **Persistence**: `localStorage.getItem('theme')` with system preference fallback
- **Flash prevention**: Inline `<script>` in `<head>` sets `.dark` before render
- **Transition**: All themes use `transition-colors duration-300`

### Rules for Dark Mode:
1. Every `bg-*` must have a `dark:bg-*` counterpart
2. Every `text-*` must have a `dark:text-*` counterpart
3. Every `border-*` must have a `dark:border-*` counterpart
4. Teal accent (`#3A9B9B`) stays the same in both themes
5. CTA buttons adapt: green (`#5BBD4A`) in light → teal (`#3A9B9B`) in dark

---

## 7. Animation & Motion

### Library: **Framer Motion** (`motion`, `AnimatePresence`)

### Standard Patterns

| Pattern | Props | Usage |
|---|---|---|
| **Fade up** | `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}` | Page sections, cards |
| **Scale in** | `initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}` | Badges, hero elements |
| **Hover lift** | `whileHover={{ y: -10 }}` or `whileHover={{ y: -5, scale: 1.1 }}` | Cards, social icons |
| **Button press** | `whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}` | Buttons, toggles |
| **Dropdown** | `initial={{ opacity: 0, y: 10, scale: 0.95 }}` | Nav dropdowns, language switcher |
| **Carousel slide** | Spring-based x-axis + opacity + scale | DomainCarousel, ImageCarousel |
| **Breathing glow** | `animate={{ scale: [1, 1.05, 1], opacity: [0.08, 0.12, 0.08] }}` | Decorative blob (dark mode hero) |
| **Infinite scroll** | `animate={{ x: "-50%" }}` with `repeat: Infinity` | InfiniteUpdateBar |

### CSS Transitions
- All interactive elements: `transition-all 0.3s ease` or `transition-colors`
- Hover scale on buttons: `hover:scale-[1.03] active:scale-95`
- Image zoom on card hover: `transition-transform duration-700 group-hover:scale-110`

---

## 8. Component Patterns

### Page Header (used on **every** inner page)
```tsx
<header className="bg-white dark:bg-zinc-900/50 pt-24 pb-20 border-b border-gray-100 dark:border-zinc-800 grid-bg mb-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl">
      <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-zinc-100 mb-8 tracking-tighter leading-tight">
        Title <span className="text-[#3A9B9B]">Highlight</span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-500 dark:text-zinc-400 font-medium leading-relaxed">
        Subtitle text
      </p>
    </div>
  </div>
</header>
```

### Card Pattern
- Background: `bg-white dark:bg-zinc-900/50`
- Border: `border border-zinc-100 dark:border-zinc-800`
- Radius: `rounded-[2.5rem]`
- Padding: `p-8 md:p-10`
- Hover: `hover:shadow-2xl` + optional `dark:hover:border-teal-500/30`

### Form Inputs
- Background: `bg-zinc-50 dark:bg-zinc-950`
- Border: `border border-zinc-200 dark:border-zinc-800`
- Focus: `focus:outline-none focus:border-[#3A9B9B]`
- Radius: `rounded-xl`
- Padding: `px-4 py-3`

### Buttons

| Type | Light Classes | Dark Classes |
|---|---|---|
| **Primary CTA** | `bg-[#5BBD4A] text-white rounded-full font-black shadow-xl hover:bg-[#3a8a2c]` | `dark:bg-[#3A9B9B] dark:text-white dark:hover:bg-[#2a7676]` |
| **Secondary / Outline** | `border-2 border-[#2D3561] bg-transparent text-[#2D3561] rounded-full font-black` | `dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-700` |
| **Navy / Brand** | `bg-[#2D3561] text-white rounded-full font-black shadow-xl hover:bg-[#1f2545]` | Same |
| **Accent Submit** | `bg-[#3A9B9B] hover:bg-[#2a7676] text-white font-bold rounded-xl` | Same |

---

## 9. Icon System

- **Library**: Lucide React (`lucide-react`)
- **Standard size**: `w-5 h-5` (nav, footer), `w-6 h-6` (cards, contact), `w-7 h-7` (hero domain icons)
- **Icon color follows text**: inherits from parent text color or uses `text-[#3A9B9B]` for accent

---

## 10. Decorative Elements

| Element | Implementation |
|---|---|
| **Grid background** | `.grid-bg` class — radial dot pattern (`40px` spacing, `1.5px` dots) |
| **Gradient blobs (dark mode)** | `bg-[#3A9B9B]/10 blur-[130px]` — large blurred teal circles |
| **Secondary blob** | `bg-[#2D3561]/10 blur-[130px]` — navy blob for depth |
| **Hover glow (dark mode)** | `.glow-hover` — `box-shadow: 0 0 40px rgba(58, 155, 155, 0.12)` |
| **Accent bars** | `w-16 h-1 bg-[#3A9B9B]` — section dividers |
| **Dot indicators (lists)** | `w-1.5 h-1.5 rounded-full bg-[#5BBD4A]` or `bg-[#3A9B9B]` |
| **Carousel dots (active)** | `bg-[#3A9B9B] w-8 h-2 rounded-full` |
| **Carousel dots (inactive)** | `bg-gray-300 dark:bg-zinc-700 w-2 h-2` |
| **Text selection** | `background-color: #b2e8e8; color: #18181b` |
| **Glassmorphism** | `backdrop-blur-xl` (navbar), `backdrop-blur-md` (carousel controls) |

---

## 11. Known Inconsistencies to Fix

> [!WARNING]
> The following deviations from the design system were found during the audit, updated to reflect the new color theme:

| File | Issue | Recommended Fix |
|---|---|---|
| `LoadingSpinner.tsx` | Uses `#3b82f6` (blue-500) for spinner border — off-brand | Change to `#3A9B9B` |
| `LoadingSpinner.tsx` | Uses inline styles instead of Tailwind classes | Convert to Tailwind for consistency |
| `PartnersFeedback.tsx` | Form inputs use `rounded-lg` while Contact page uses `rounded-xl` | Standardize to `rounded-xl` |
| All files | Any remaining `#84CC16` lime-green references | Replace with `#3A9B9B` (teal) for accents or `#5BBD4A` (green) for CTA |
| All files | Any remaining `#5D3A1A` / `#4B2C13` warm brown references | Replace with `#2D3561` / `#1f2545` (navy) |
| All files | Dark mode glow using lime rgba | Update to `rgba(58,155,155,0.15)` |

---

## 12. Color Migration Map

> [!NOTE]
> Quick find-and-replace reference when migrating from the old lime/brown palette:

| Old Value | New Value | Role |
|---|---|---|
| `#84CC16` | `#3A9B9B` | Primary accent → Teal accent |
| `#65A30D` | `#2a7676` | Accent hover → Teal hover |
| `#5D3A1A` | `#2D3561` | CTA / Button → Navy primary |
| `#4B2C13` | `#1f2545` | CTA hover → Navy hover |
| `rgba(132,204,22,...)` | `rgba(58,155,155,...)` | Glow / blob → Teal glow |
| `#bef264` (text selection) | `#b2e8e8` | Selection highlight → Teal tint |

---

## 13. Quick Reference Cheat Sheet

```
┌─────────────────────────────────────────────────┐
│  BRAND COLORS                                   │
│  Navy (Primary):    #2D3561                     │
│  Navy Hover:        #1f2545                     │
│  Teal (Accent):     #3A9B9B                     │
│  Teal Hover:        #2a7676                     │
│  Green (CTA):       #5BBD4A                     │
│  Green Hover:       #3a8a2c                     │
│                                                 │
│  TINTS / SURFACES                               │
│  Teal Tint:         #E8F7F7  (cards, badges)   │
│  Green Tint:        #EAF8EA  (badges, tags)     │
│  Navy Tint:         #EAECF5  (subtle panels)    │
│                                                 │
│  BACKGROUNDS                                    │
│  Light Page:        zinc-50  (#fafafa)          │
│  Dark Page:         #09090b                     │
│  Light Card:        white                       │
│  Dark Card:         zinc-900/50                 │
│                                                 │
│  TEXT                                           │
│  Light Heading:     zinc-900                    │
│  Dark Heading:      zinc-100                    │
│  Light Body:        zinc-600 / gray-500         │
│  Dark Body:         zinc-400                    │
│  Nav Active:        #3A9B9B (both modes)        │
│                                                 │
│  SHAPES                                         │
│  Cards:             rounded-[2.5rem]            │
│  Buttons:           rounded-full                │
│  Inputs:            rounded-xl                  │
│                                                 │
│  FONT                                           │
│  Family:            Inter (+ Noto for i18n)     │
│  Headings:          font-black, tracking-tighter│
│  Body:              font-medium, leading-relaxed│
│  Nav/Labels:        font-bold, text-sm          │
│                                                 │
│  MOTION                                         │
│  Library:           Framer Motion               │
│  Fade-in:           opacity 0→1, y 20→0        │
│  Hover lift:        y: -10                      │
│  Button:            scale 1.05→0.95             │
└─────────────────────────────────────────────────┘
```