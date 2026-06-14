---
name: Obsidian Nexus
colors:
  surface: '#111318'
  surface-dim: '#111318'
  surface-bright: '#37393f'
  surface-container-lowest: '#0c0e13'
  surface-container-low: '#1a1b21'
  surface-container: '#1e1f25'
  surface-container-high: '#282a2f'
  surface-container-highest: '#33353a'
  on-surface: '#e2e2e9'
  on-surface-variant: '#c2c6d7'
  inverse-surface: '#e2e2e9'
  inverse-on-surface: '#2e3036'
  outline: '#8c90a0'
  outline-variant: '#424654'
  surface-tint: '#b1c5ff'
  primary: '#b1c5ff'
  on-primary: '#002c71'
  primary-container: '#2b6ff0'
  on-primary-container: '#ffffff'
  inverse-primary: '#0056d0'
  secondary: '#c0c1ff'
  on-secondary: '#1000a9'
  secondary-container: '#3131c0'
  on-secondary-container: '#b0b2ff'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#a66900'
  on-tertiary-container: '#ffffff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#b1c5ff'
  on-primary-fixed: '#001847'
  on-primary-fixed-variant: '#00409f'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#111318'
  on-background: '#e2e2e9'
  surface-variant: '#33353a'
  plan-student: hsl(152, 69%, 42%)
  plan-student-bg: hsla(152, 69%, 42%, 0.08)
  plan-student-border: hsla(152, 69%, 42%, 0.25)
  plan-pro: hsl(220, 91%, 55%)
  plan-pro-bg: hsla(220, 91%, 55%, 0.10)
  plan-pro-border: hsla(220, 91%, 55%, 0.35)
  plan-company: hsl(38, 92%, 54%)
  plan-company-bg: hsla(38, 92%, 54%, 0.08)
  plan-company-border: hsla(38, 92%, 54%, 0.30)
  locked-overlay: hsla(220, 20%, 6%, 0.70)
  locked-border: hsl(220, 12%, 22%)
  trial-text: hsl(38, 92%, 60%)
  success: '#22C55E'
  warning: '#F59E0B'
typography:
  hero-title:
    fontFamily: Syne
    fontSize: 128px
    fontWeight: '900'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  page-heading:
    fontFamily: Syne
    fontSize: 48px
    fontWeight: '900'
    lineHeight: '1.2'
  pricing-display:
    fontFamily: Syne
    fontSize: 60px
    fontWeight: '900'
    lineHeight: '1'
  pricing-display-idr:
    fontFamily: Syne
    fontSize: 32px
    fontWeight: '900'
    lineHeight: '1'
  section-head:
    fontFamily: Syne
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.4'
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-xs:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gap-swatch: 0.75rem
  gap-card: 1.5rem
  gap-section: 3rem
  max-linear: 42rem
  max-pricing: 72rem
  max-bento: 80rem
  max-wide: 1280px
---

## Brand & Style

The design system embodies a **"Psychological Conversion Hierarchy"**—a strategic blend of professional utility and aspirational prestige. It is designed to evoke high-tech sophistication, driving users through a visual journey from "Potential" to "Power User." 

The aesthetic is a refined **Glassmorphism** mixed with **Corporate Modern** elements. It utilizes layered transparencies, intentional friction (blurred locked states), and "prestige" color-coding to bucket users into clear segments. The interface is not merely a container for data; it is a conversion engine that rewards progression through gamified elements and premium visual feedback. 

Targeting a spectrum from students to enterprise leaders, the system balances clean, utilitarian layouts with moments of high-impact editorial flair, particularly in the "Immersive Dark" hero areas and the Bento-style pricing structures.

## Colors

The palette is anchored in a deep, systematic dark mode (`#0D0F14`). Color is used primarily as a **status indicator and hierarchy driver**.

- **Subscription Tiers**: Each tier has a dedicated color profile. 
    - **Student (Green)**: Signifies growth and accessibility.
    - **Pro (Indigo)**: Represents the "Max Power" tier, used for featured calls-to-action and primary brand moments.
    - **Company (Amber Gold)**: Reserved for enterprise prestige and high-value status.
- **Functional States**: Use `locked-overlay` with high opacity to create "Desire before the Wall," obscuring premium content without hiding its existence. Use `trial-text` (Amber) for urgent countdowns and banners.
- **Success & Warning**: Standardized via Tailwind-aligned greens and ambers for progress meters ("Taking Shape" vs "Nearly Perfect").

## Typography

The typographic system utilizes **Syne** for high-impact display moments—leveraging its "Black" weight to create a brutalist yet modern editorial feel. **Inter** handles all functional and body copy to ensure maximum legibility across dense data views.

**i18n Pricing Logic**: 
When displaying Indonesian Rupiah (IDR) or other high-character currency strings, the `pricing-display-idr` level must be used. This drops the font size significantly to prevent horizontal overflow in tiered cards.

**Technical Data**: 
Use **JetBrains Mono** exclusively for timeline dates, technical statistics, and system-level logs to maintain a "developer-friendly" aesthetic.

## Layout & Spacing

This design system uses a **flexible grid** based on a 4px unit, scaling to accommodate distinct layout modes:

- **Linear Layout**: Focused `max-w-2xl` for reading and FAQ content.
- **Bento Grid**: A structured `max-w-7xl` grid used for dashboard features and plan breakdowns.
- **Pricing Layout**: A `max-w-6xl` container where the primary "Pro" card is visually emphasized.

**Responsive Reflow**: 
- The **Pro Card** features a 1.04x scale transform on desktop to create visual dominance. This transform must be removed (`scale-100`) on mobile devices to ensure the card fits the viewport width.
- Gaps transition from `gap-12` (desktop sections) to `gap-6` on mobile to maintain density.

## Elevation & Depth

Hierarchy is established through **Layered Glassmorphism** rather than traditional shadows.

- **The Desire Wall**: Locked premium features use a `2px` backdrop blur (`--locked-blur`) and a semi-transparent overlay to suggest value while restricting access.
- **Pro Tier Glow**: The featured subscription tier utilizes a colored ambient glow (`0 0 60px hsl(220 91% 55% / 0.20)`) instead of a neutral shadow to signify its "Max Power" status.
- **Sticky Elements**: Top navigation bars use a high-saturation backdrop blur to stay legible over varied background content.
- **Floating UI**: The "Upsell Drawer" uses a heavy `shadow-2xl` to denote it is the highest layer in the z-index stack, demanding immediate user attention.

## Shapes

The shape language is primarily **Rounded**, transitioning to **Pill-shaped** for interactive and micro-elements.

- **Standard Cards**: Use `rounded-2xl` (1.5rem) for a modern, approachable feel.
- **Bento Blocks**: Large containers use `rounded-3xl` to emphasize the modular architecture.
- **Interactive Elements**: All buttons, swatches, and profile rings are `rounded-full`.
- **Inner Content**: Smaller banners and layout tags within cards use `rounded-xl` to create a nested "inner-radius" effect.

## Components

### Subscription Cards
- **Pro Card**: Must feature a `2px` indigo border and the signature glow. Scale slightly (1.04x) on hover.
- **Free/Student Cards**: Use a **Dashed Border** style for the Free tier to imply its "placeholder" or basic status.
- **Pricing Toggle**: Implement spring physics for the "Annual Savings" badge. When toggled, the price should animate with a 200ms `translateY` and `opacity` fade.

### Buttons & Chips
- **CTAs**: Large, `rounded-full` buttons. The primary CTA uses the Pro Indigo, while tier-specific buttons (Student/Company) use their respective brand colors.
- **Badges**: Pro badges require a subtle shadow (`0 2px 8px`) in the plan's accent color to pop against the dark background.

### Input & Feedback
- **Power Meter**: Use a circular SVG progress meter with an animated `stroke-dashoffset` (1000ms ease-out). Color should transition from `amber-500` to `green-500` based on completion.
- **Locked States**: Elements should be clearly marked with a `h-8` Lucide Lock icon centered over the blurred content.

### i18n Elements
- **Language Toggles**: Use hairline `1px` dividers and `label-xs` typography. Ensure the container can expand to accommodate longer localized strings without breaking the layout grid.