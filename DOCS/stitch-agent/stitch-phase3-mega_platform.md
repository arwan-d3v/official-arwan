# Obsidian Nexus — Phase 2 Blueprint
## Monetization · VIP Customization · Smart i18n
### Google Stitch Screen Prompts — Continuation of Phase 1

---

## PART 1 — MONETIZATION & RETENTION UI STRATEGY

> Strategic recommendations before the screen prompts. Read this first — it shapes every design decision in Part 2.

---

### 1.1 Conversion Funnel Philosophy

The three plans target fundamentally different jobs-to-be-done:

- **Student** ($2.5 / Rp 12.500): First professional identity. The job is *credibility* — getting that first internship or junior role. Price anxiety is real; friction must be zero.
- **Professional** ($4.5 / Rp 22.500): Career growth and visibility. The job is *differentiation* — standing out in a competitive field. The delta from Student is tiny in cost but enormous in perceived value. **This is the conversion fulcrum.**
- **Company** ($27.5 / Rp 355.000): Brand legitimacy. The job is *trust* — custom domain = enterprise perception. Sell on outcome ROI, not features.

The pricing gap between Student and Professional is only $2/month (Rp 10.000). **Every design decision must make this delta feel irrational to *not* pay.** The Professional plan is the anchor; everything points toward it.

---

### 1.2 Four High-Impact Retention & Conversion Strategies

#### Strategy A — Profile Completeness Gamification (Activation Loop)

**The insight:** Users who complete their profile are 3–4× more likely to stay subscribed because they have invested effort and have a public URL to protect.

**Implementation:**

Build a persistent "Profile Power" meter in the Dashboard sidebar — a circular progress ring (SVG, animated stroke-dashoffset on mount) that fills as the user completes each section. Display as a percentage with a motivating label:

```
0–30%  → "Getting Started"   (gray ring)
31–60% → "Taking Shape"      (amber ring)
61–85% → "Almost There"      (blue ring)
86–99% → "Nearly Perfect"    (green ring)
100%   → "Portfolio Ready ✦" (gold ring, pulse animation)
```

Each incomplete section shows as a clickable chip below the ring: `+ Add Work Experience · + Add Skills` — direct deep-links into the CV Builder accordion. Completing a section triggers a confetti micro-animation (canvas-confetti, 0.8s burst) + a toast: "Work Experience added — Profile Power: 72%".

**Upsell hook:** At 85% completion, surface a modal: *"Your profile is almost perfect. Unlock a Premium Layout to make it unforgettable."* — with a one-click trial start, no credit card required for the first 7 days.

---

#### Strategy B — Premium Layout Preview (Desire Before the Wall)

**The insight:** Users can't want what they can't see. Locked features that are only shown as a padlock icon create resentment, not desire. Showing a *blurred, interactive preview* of the locked layout creates desire.

**Implementation:**

In the Layout Themes tab of the Customization Hub, locked layouts render as fully visible but non-interactive previews wrapped in a `blur-[2px]` + `pointer-events-none` container. Overlaid on top:

```
[Blurred Bento Layout Preview]
    ┌────────────────────────────────┐
    │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░  │  ← actual rendered layout, blurred
    │  ░░ [Project Card] ░░ [Card]░  │
    │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
    ├────────────────────────────────┤
    │  🔒 Professional Layout        │
    │  "Unlock with Professional"    │
    │  [See What's Included →]       │
    └────────────────────────────────┘
```

Clicking "See What's Included →" opens a side drawer showing a full, unblurred live demo of the layout *with placeholder content* — letting the user explore it before hitting the paywall. The drawer CTA: "Start Professional — Rp 22.500/bln".

**Why this works:** The user has now spent 30–60 seconds inside a feature they don't own. Ownership desire is activated. The price, shown *after* the demo, feels small compared to the value they just experienced.

---

#### Strategy C — Trial FOMO with Countdown Anchoring

**The insight:** "Free trial" is weak language. "Your trial ends in 3 days" with a visible countdown is 40–60% more effective at converting trial-to-paid.

**Implementation:**

During a 7-day free trial of Professional:

1. **Dashboard top banner** (dismissible, but re-appears daily): `bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/20` — showing: `"Professional Trial · 3 days left · [Upgrade Now — Rp 22.500/bln]"` with a real-time countdown `HH:MM:SS` rendered via `useEffect` + `setInterval`. The countdown creates urgency without aggression.

2. **On trial expiry:** Don't hard-lock the account. Instead, show a "Paused" state — the user can *see* their premium layouts/themes grayed out with a "Resume" nudge. This is less punishing than a hard lock and reduces churn from frustration. The dashboard still functions (free tier), but premium assets are visible and beckoning.

3. **Winback email trigger** (design the UI state for this): 24 hours after trial expires, show a re-engagement modal on next login: *"Your Bento Layout is waiting. Resume Professional for Rp 22.500."* — with a one-click "Resume" button.

---

#### Strategy D — Social Proof at the Moment of Doubt (Pricing Page)

**The insight:** Conversion drop-off is highest at the pricing page. Users hesitate at the payment step, not the awareness step. Social proof *on the pricing card itself* — not in a separate testimonials section below — reduces this hesitation.

**Implementation:**

Each pricing card includes a compact social proof element directly beneath the price:

- **Student card:** `"Used by 12,400+ students at UI, ITB, and UGM"` (logos of 3 universities, 16px grayscale)
- **Professional card:** `"Avg. 340% more profile views after upgrading"` + 5-star rating from 4.9/5 from 2,100+ reviews
- **Company card:** `"50+ agencies and studios use Company plan"` + a row of 4 client logo placeholders

These are shown directly inside the pricing card, above the feature list — occupying a `px-6 py-3 border-b border-border text-xs text-secondary` strip. This removes the "but does it work?" doubt precisely when the user is deciding.

---

## PART 2 — DESIGN SYSTEM EXTENSIONS (Phase 2 Additions)

> These tokens extend the Phase 1 Obsidian Nexus system. Feed into `create_design_system_from_design_md` alongside Part 1.

---

### 2.1 Subscription Tier Tokens

```css
/* ── Plan Identity Colors ── */
--plan-student:       152 69% 42%;    /* Emerald Green — growth, education */
--plan-student-bg:    152 69% 42% / 0.08;
--plan-student-border:152 69% 42% / 0.25;

--plan-pro:           220 91% 55%;    /* Indigo — same as primary, max power */
--plan-pro-bg:        220 91% 55% / 0.10;
--plan-pro-border:    220 91% 55% / 0.35;
--plan-pro-glow:      0 0 40px hsl(220 91% 55% / 0.20);

--plan-company:       38 92% 54%;     /* Amber Gold — prestige, enterprise */
--plan-company-bg:    38 92% 54% / 0.08;
--plan-company-border:38 92% 54% / 0.30;

/* ── Lock State Tokens ── */
--locked-overlay:     220 20% 6% / 0.70;   /* dark overlay on locked items */
--locked-blur:        2px;                  /* blur-sm equivalent */
--locked-border:      220 12% 22%;          /* same as --color-border, subdued */

/* ── Trial Banner ── */
--trial-banner-bg:    38 92% 54% / 0.08;
--trial-banner-border:38 92% 54% / 0.25;
--trial-text:         38 92% 60%;
```

---

### 2.2 i18n Token Architecture

```typescript
// i18n token structure — define once, use everywhere
type Locale = 'en' | 'id';

interface PricingToken {
  symbol:    string;   // '$' | 'Rp'
  separator: string;   // '.' | '.'  (thousands separator)
  decimal:   string;   // '.' | ','  (decimal separator)
  period:    string;   // '/mo' | '/bln'
  periodAnn: string;   // '/yr' | '/thn'
}

const pricingTokens: Record<Locale, PricingToken> = {
  en: { symbol: '$',  separator: ',', decimal: '.', period: '/mo',  periodAnn: '/yr'  },
  id: { symbol: 'Rp', separator: '.', decimal: ',', period: '/bln', periodAnn: '/thn' },
};

// Price display function
function formatPrice(amount: number, locale: Locale): string {
  if (locale === 'id') {
    return `Rp ${amount.toLocaleString('id-ID')}`;  // → "Rp 12.500"
  }
  return `$${amount.toFixed(1)}`;                    // → "$2.5"
}

// Plan prices
const plans = {
  student:     { usd: 2.5,  idr: 12500  },
  professional:{ usd: 4.5,  idr: 22500  },
  company:     { usd: 27.5, idr: 355000 },
};

// Annual discount (30% off)
const annualDiscount = 0.70;
```

---

### 2.3 Layout Theme Registry

```typescript
// Layout variant definitions — feeds the Customization Hub
type LayoutVariant = {
  id:          string;
  name:        string;
  nameId:      string;      // Indonesian name
  description: string;
  descriptionId: string;
  minPlan:     'free' | 'student' | 'professional' | 'company';
  thumbnail:   string;      // SVG thumbnail path
  tags:        string[];
};

const layouts: LayoutVariant[] = [
  {
    id: 'linear',
    name: 'Linear',
    nameId: 'Linear',
    description: 'Clean, top-to-bottom single column. Classic and ATS-friendly.',
    descriptionId: 'Kolom tunggal dari atas ke bawah. Klasik dan ramah ATS.',
    minPlan: 'free',
    tags: ['Simple', 'ATS-Safe'],
  },
  {
    id: 'split',
    name: 'Split Sidebar',
    nameId: 'Sidebar Terpisah',
    description: 'Fixed left sidebar with contact details, scrollable content right.',
    descriptionId: 'Sidebar kiri tetap dengan detail kontak, konten kanan bisa di-scroll.',
    minPlan: 'student',
    tags: ['Modern', 'Professional'],
  },
  {
    id: 'bento',
    name: 'Bento Grid',
    nameId: 'Grid Bento',
    description: 'Asymmetric mosaic grid. Makes a strong visual impression.',
    descriptionId: 'Grid mosaik asimetris. Membuat kesan visual yang kuat.',
    minPlan: 'professional',
    tags: ['Creative', 'Visual', 'VIP'],
  },
  {
    id: 'magazine',
    name: 'Magazine',
    nameId: 'Majalah',
    description: 'Editorial layout with large featured project image.',
    descriptionId: 'Layout editorial dengan gambar proyek unggulan besar.',
    minPlan: 'professional',
    tags: ['Creative', 'Bold', 'VIP'],
  },
  {
    id: 'immersive',
    name: 'Immersive Dark',
    nameId: 'Gelap Imersif',
    description: 'Full-viewport sections with cinematic scroll transitions.',
    descriptionId: 'Seksi layar penuh dengan transisi scroll sinematik.',
    minPlan: 'company',
    tags: ['Luxury', 'Cinematic', 'Company'],
  },
];
```

---

## PART 3 — GOOGLE STITCH SCREEN PROMPTS (PHASE 2)

> Feed each prompt individually into `generate_screen_from_text`. These extend the Obsidian Nexus design system from Phase 1.

---

## SCREEN 5 — Monetization Pricing Page (Geo-Adaptive, i18n-Ready)

```
Generate a production-ready React component for a high-end SaaS Pricing Page 
that is geo-adaptive (EN/USD and ID/IDR modes), supports Monthly/Annual billing toggle, 
and presents three subscription tiers with psychological conversion hierarchy.
This screen extends the "Obsidian Nexus" design system: dark background #0D0F14, 
Syne (headings) + Inter (body), indigo primary (#2B6FF0), CSS custom property tokens.

─── LOCALE CONTEXT ──────────────────────────────────────────────────────

Render in TWO locale states. The component receives a `locale: 'en' | 'id'` prop 
and a `billing: 'monthly' | 'annual'` prop. All text, prices, and labels adapt.

EN LOCALE strings:
  Page heading: "Simple, Honest Pricing"
  Subheading: "Start free. Upgrade when you're ready."
  Toggle label left: "Monthly"
  Toggle label right: "Annual"
  Annual savings badge: "Save 30%"
  CTA Free: "Start for Free"
  CTA Student: "Start Student"
  CTA Professional: "Start Professional — Most Popular"
  CTA Company: "Contact Sales"
  Feature label prefix: "Everything in Student, plus:"

ID LOCALE strings:
  Page heading: "Harga yang Jelas, Tanpa Kejutan"
  Subheading: "Mulai gratis. Upgrade kapan pun kamu siap."
  Toggle label left: "Bulanan"
  Toggle label right: "Tahunan"
  Annual savings badge: "Hemat 30%"
  CTA Free: "Mulai Gratis"
  CTA Student: "Mulai Student"
  CTA Professional: "Mulai Professional — Paling Populer"
  CTA Company: "Hubungi Sales"
  Feature label prefix: "Semua fitur Student, plus:"

PRICE DISPLAY RULES:
  EN Monthly:  "$2.5/mo"  · "$4.5/mo"  · "$27.5/mo"
  EN Annual:   "$21/yr"   · "$37.8/yr" · "$231/yr"  (30% off, show crossed-out monthly price)
  ID Monthly:  "Rp 12.500/bln"  · "Rp 22.500/bln"  · "Rp 355.000/bln"
  ID Annual:   "Rp 105.000/thn" · "Rp 189.000/thn" · "Rp 2.989.000/thn"
  
  Crossed-out original: displayed above the discounted price as 
  `line-through text-tertiary text-sm` when annual billing is selected.

─── RESPONSIVE LAYOUT ───────────────────────────────────────────────────

MOBILE PORTRAIT (<640px):
- Single column card stack. px-4.
- Billing toggle at top, centered. 
  `flex items-center gap-3 justify-center mb-8`
- Cards: full-width, rounded-2xl, gap-4 between cards.
- Professional card: NOT scaled up on mobile (scale causes horizontal overflow).
  Instead: `border-2 border-[hsl(var(--plan-pro))] shadow-[0_0_30px_hsl(var(--plan-pro)/0.2)]`
- Language toggle: top-right corner, pill shape `EN | ID`.
- "Most Popular" badge floats above Professional card 
  (absolute -top-3.5, centered, translate-x-[-50%] left-[50%]).
- Feature list: max 5 visible items, "+ 3 more" expand toggle.
- University logos: 1×3 horizontal row, max-w-[180px] each, grayscale, opacity-50.
- CTA buttons: h-12, full-width.

TABLET PORTRAIT (640px–1023px):
- 2-column grid for the 3 cards: Student + Professional on top row, Company below 
  `grid grid-cols-2 gap-5`. Company card: `col-span-2 max-w-xl mx-auto`.
- Billing toggle + language toggle: same horizontal row, justified between.
- Professional card: scale-[1.03] transform for subtle elevation.

TABLET LANDSCAPE / DESKTOP (1024px+):
- 4-column grid: `grid grid-cols-4 gap-5 max-w-6xl mx-auto`
  [Free (ghost/minimal)] [Student] [Professional (featured)] [Company]
- Professional card: 
  `scale-[1.04] relative z-10` (taller, more prominent)
  `shadow-[0_0_60px_hsl(220_91%_55%_/_0.20)]`
  `border-2 border-[hsl(var(--plan-pro))]`
- Free card is intentionally minimal: `border border-dashed border-border opacity-80`
  It exists to anchor the value of paid plans, not to convert.
- Cards: `h-full flex flex-col` so all cards are equal height, CTA pinned to bottom.
- Max width: 1280px, sections px-8 py-24.

ULTRAWIDE (>1536px):
- max-w-screen-xl mx-auto.
- Cards wider, more internal padding (p-10 vs p-8).
- Social proof strip between page heading and cards: 
  horizontal row of "127K CVs · 4.9★ · Trusted by 50+ Companies" stats.

─── COMPONENT ARCHITECTURE ───────────────────────────────────────────

[LOCALE + BILLING CONTROL ROW]
`flex flex-col sm:flex-row items-center justify-between gap-4 mb-12`

Language Toggle (top-right on mobile, right side on desktop):
`flex items-center gap-0 rounded-xl border border-border overflow-hidden`
Each option: `px-4 h-9 text-sm font-medium cursor-pointer transition-colors`
Active: `bg-surface-2 text-text-primary`
Inactive: `text-text-tertiary hover:text-text-secondary`
Between: `w-px h-5 bg-border self-center`
— "EN" and "ID" labels. On toggle: re-render all pricing text and labels.

Billing Toggle:
`relative flex items-center gap-3`
Label left: `text-sm font-medium text-text-primary`
Track: `relative w-12 h-6 rounded-full bg-surface-3 border border-border cursor-pointer`
  Thumb: `absolute left-1 top-1 h-4 w-4 rounded-full bg-primary transition-transform`
  When annual: `translate-x-6`
Label right: `text-sm font-medium text-text-primary`
Annual badge: `ml-2 px-2 py-0.5 rounded-full text-xs font-semibold 
  bg-[hsl(var(--plan-student-bg))] text-[hsl(var(--plan-student))] 
  border border-[hsl(var(--plan-student-border))]`
  Label: locale === 'en' ? "Save 30%" : "Hemat 30%"

[FREE PLAN CARD — Minimal, anchor card]
`rounded-2xl border border-dashed border-border p-8 flex flex-col gap-6 opacity-75`
Header: plan name (text-base font-semibold text-secondary) + description
Price: `text-3xl font-bold text-text-primary` — "Free" / "Gratis"
No social proof strip (free plan has no conversion role here).
Feature list: 4 items only (basic CV builder, 1 theme, no custom URL).
CTA: `w-full h-11 rounded-xl border border-border text-sm font-medium 
text-text-secondary hover:bg-surface-2 transition-colors`

[STUDENT PLAN CARD]
`rounded-2xl bg-surface-1 border border-[hsl(var(--plan-student-border))] p-8 flex flex-col gap-6`
Header:
  Plan badge: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
    bg-[hsl(var(--plan-student-bg))] text-[hsl(var(--plan-student))]
    border border-[hsl(var(--plan-student-border))]`
  Badge label: EN "Student" / ID "Pelajar"
  Plan description: EN "Your first professional identity online." 
                    ID "Identitas profesional pertamamu secara online."

Price block:
  `flex flex-col gap-0.5`
  Annual state: crossed-out original price above:
    `text-sm text-text-tertiary line-through` — EN "$2.5/mo" / ID "Rp 12.500/bln"
  Main price: `text-4xl font-black text-text-primary` (Syne)
    EN monthly: "$2" + `.5` (superscript fraction) + `/mo`
    EN annual: "$21" + `/yr`
    ID monthly: "Rp 12.500" + `/bln` — note: use `text-2xl` for IDR to accommodate length
    ID annual: "Rp 105.000" + `/thn`
  Helper: `text-xs text-text-tertiary mt-1`
    EN: "Billed monthly · Cancel anytime"
    ID: "Tagihan bulanan · Batalkan kapan saja"

Social proof strip:
  `px-4 py-3 -mx-8 border-y border-border bg-surface-2 text-xs text-text-secondary`
  EN: "Used by 12,400+ students at top Indonesian universities"
  ID: "Dipakai oleh 12.400+ mahasiswa di kampus terkemuka Indonesia"
  Below: 3 university logo placeholders (SVG gray rounded rects, h-5)

Feature list:
  `flex flex-col gap-2.5 flex-1`
  Label: `text-xs font-semibold uppercase tracking-widest text-text-tertiary mb-1`
    EN: "Included" / ID: "Termasuk"
  Each item: `flex items-start gap-2.5 text-sm text-text-secondary`
    Check icon: `h-4 w-4 text-[hsl(var(--plan-student))] flex-shrink-0 mt-0.5`
  Items (EN/ID bilingual format below, show only active locale):
    EN: "Save CV Builder progress"          / ID: "Simpan progres CV Builder"
    EN: "3 Premium Color Themes"            / ID: "3 Tema Warna Premium"
    EN: "Custom public URL (/username)"     / ID: "URL publik kustom (/username)"
    EN: "Public Portfolio Page"             / ID: "Halaman Portofolio Publik"
    EN: "ATS Score Checker"                 / ID: "Pemeriksa Skor ATS"

CTA: `w-full h-12 rounded-xl bg-[hsl(var(--plan-student))] text-white font-semibold text-sm
  hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2`

[PROFESSIONAL PLAN CARD — PRIMARY CONVERSION TARGET]
`relative rounded-2xl bg-surface-1 border-2 border-[hsl(var(--plan-pro))] 
p-8 flex flex-col gap-6 scale-[1.04] z-10
shadow-[0_0_60px_hsl(220_91%_55%_/_0.15),0_0_0_1px_hsl(220_91%_55%_/_0.20)]`

Most Popular badge (absolute, top of card):
`absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap
inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold
bg-[hsl(var(--plan-pro))] text-white shadow-[0_2px_8px_hsl(220_91%_55%_/_0.4)]`
  EN: "⭐ Most Popular" / ID: "⭐ Paling Populer"

Plan badge: same as Student but `bg-[hsl(var(--plan-pro-bg))] text-[hsl(var(--plan-pro))]`
  Label: "Professional"

Description: 
  EN: "For professionals who want to be found and remembered."
  ID: "Untuk profesional yang ingin dikenal dan diingat."

Price block: same pattern as Student but larger:
  `text-5xl font-black` (Syne) for the main number
  EN monthly: "$4.5/mo"  · EN annual: "$37.8/yr"
  ID monthly: "Rp 22.500/bln" (`text-3xl` for IDR length) · ID annual: "Rp 189.000/thn"

Social proof strip: `bg-[hsl(var(--plan-pro-bg))] border-[hsl(var(--plan-pro-border))]`
  EN: "Avg. 340% more profile views after upgrading · ★★★★★ 4.9/5 from 2,100+ reviews"
  ID: "Rata-rata 340% lebih banyak tampilan profil setelah upgrade · ★★★★★ 4.9/5 dari 2.100+ ulasan"

Feature list label: 
  EN: "Everything in Student, plus:" / ID: "Semua fitur Student, plus:"
Items:
  EN: "All 29 Color Themes unlocked"        / ID: "Semua 29 Tema Warna terbuka"
  EN: "3 Premium Layout Themes"             / ID: "3 Tema Layout Premium"
  EN: "Advanced Portfolio Showcase"          / ID: "Showcase Portofolio Lanjutan"
  EN: "Project Links & Case Studies"         / ID: "Tautan Proyek & Studi Kasus"
  EN: "Portfolio Analytics Dashboard"        / ID: "Dashboard Analitik Portofolio"
  EN: "Priority Support"                    / ID: "Dukungan Prioritas"

Value emphasis callout (between feature list and CTA):
  `rounded-xl bg-[hsl(var(--plan-pro-bg))] border border-[hsl(var(--plan-pro-border))] p-4`
  `text-xs text-[hsl(var(--plan-pro))]`
  EN: "💡 That's less than one coffee per month for a career-defining portfolio."
  ID: "💡 Kurang dari harga satu kopi per bulan untuk portofolio yang mengubah karir."

CTA: `w-full h-12 rounded-xl bg-[hsl(var(--plan-pro))] text-white font-bold text-sm
  hover:shadow-[0_0_20px_hsl(220_91%_55%_/_0.4)] hover:scale-[1.01]
  active:scale-[0.98] transition-all flex items-center justify-center gap-2`
  Arrow-right icon (Lucide ArrowRight) trailing.

[COMPANY PLAN CARD]
`rounded-2xl bg-surface-1 border border-[hsl(var(--plan-company-border))] p-8 flex flex-col gap-6`
Plan badge: `bg-[hsl(var(--plan-company-bg))] text-[hsl(var(--plan-company))]`
  Label: EN "Company" / ID "Perusahaan"

Price block:
  EN: "$27.5/mo" → annual "$231/yr"
  ID: "Rp 355.000/bln" (`text-xl` for IDR, accommodate full length) → "Rp 2.989.000/thn"

Social proof: 
  EN: "50+ agencies and design studios trust Company plan"
  ID: "50+ agensi dan studio desain mempercayai paket Perusahaan"
  Row of 4 company logo placeholder rects below.

Features:
  EN: "All 29 Color Themes"                 / ID: "Semua 29 Tema Warna"
  EN: "All 5 Layout Themes"                 / ID: "Semua 5 Tema Layout"
  EN: "Custom Company Domain Mapping"        / ID: "Pemetaan Domain Perusahaan Kustom"
  EN: "Team member portfolios (up to 10)"   / ID: "Portofolio anggota tim (hingga 10 orang)"
  EN: "White-label branding"                / ID: "Branding white-label"
  EN: "Dedicated account manager"           / ID: "Manajer akun khusus"
  EN: "SLA: 99.9% uptime guarantee"         / ID: "SLA: Garansi uptime 99,9%"

CTA: `w-full h-12 rounded-xl border border-[hsl(var(--plan-company-border))]
  text-[hsl(var(--plan-company))] font-semibold text-sm
  hover:bg-[hsl(var(--plan-company-bg))] transition-colors flex items-center justify-center gap-2`
  PhoneCall icon (Lucide) leading.

[FAQ ACCORDION — below pricing cards]
3 questions only. Compact.
`max-w-2xl mx-auto mt-16 divide-y divide-border`
Each: `py-5 cursor-pointer`
  Question: `flex items-center justify-between text-sm font-semibold text-text-primary`
  ChevronDown (rotates 180° on open, transition-transform duration-200)
  Answer: `text-sm text-text-secondary mt-3 leading-relaxed` (collapsible, max-h transition)

EN questions:
  "Can I change plans later?" — "Yes, upgrade or downgrade anytime. Changes apply at next billing cycle."
  "What payment methods do you accept?" — "Credit cards, PayPal, and GoPay (Indonesia)."
  "Is my data safe if I cancel?" — "Yes, we retain your data for 90 days after cancellation. Download your CV anytime."

ID questions (same answers, Indonesian):
  "Apakah bisa ganti paket nanti?" / "Bisakah saya upgrade atau downgrade kapan saja? Perubahan berlaku di siklus tagihan berikutnya."
  "Metode pembayaran apa yang diterima?" / "Kartu kredit, PayPal, dan GoPay."
  "Apakah data saya aman jika berhenti berlangganan?" / "Ya, kami menyimpan data Anda selama 90 hari setelah pembatalan."
```

---

## SCREEN 6 — Dashboard Customization Hub (Theme & Layout Selector)

```
Generate a production-ready React component for a Dashboard Customization Hub — 
a full-page panel where users personalize their CV and Portfolio appearance.
It has two main tabs: "Color Themes" and "Layout Themes". Premium options are 
visually locked behind subscription gates with unlock nudges.
This extends the Obsidian Nexus system: dark bg #0D0F14, Syne + Inter fonts.
The component receives props: `userPlan: 'free' | 'student' | 'professional' | 'company'`
and `locale: 'en' | 'id'`.

─── RESPONSIVE LAYOUT ───────────────────────────────────────────────────

MOBILE PORTRAIT (<640px):
- Full-screen view. Top: back arrow + "Personalize" title (h-14).
- Tab bar: `flex gap-0 bg-surface-2 rounded-xl p-1 mx-4 mb-4`
  Tabs: EN "Color Themes" / "Layout Themes" | ID "Tema Warna" / "Tema Layout"
  Active tab: bg-surface-1 rounded-lg shadow-sm text-primary font-semibold.
- Color grid: `grid grid-cols-4 gap-3 px-4` — each swatch 64px × 64px.
- Layout cards: `flex flex-col gap-4 px-4` — each card full-width.
- Locked items: grayscale + opacity-50 + lock icon overlay.
- Save button: fixed bottom (above nav bar), full-width `h-14 bg-primary`.
- Profile Power ring: compact version (h-16 w-16) top-right of header row.

TABLET PORTRAIT (640px–1023px):
- Sidebar (w-64) for profile summary (avatar, plan badge, profile power ring).
  Main content: flex-1, tabs + grid.
- Color grid: `grid-cols-6`.
- Layout cards: `grid grid-cols-2 gap-5`.
- Save button: sticky bottom of main content area.

DESKTOP (1280px+):
- 3-column layout:
  LEFT: Navigation sidebar (inherited from Screen 2 dashboard, w-56).
  CENTER: Tab content area, overflow-y-auto, p-8, max-w-3xl.
  RIGHT: Live Preview pane (w-80 fixed), shows portfolio preview updating in real-time.
- Color grid: `grid-cols-8 gap-3`.
- Layout cards: `grid-cols-3 gap-4`.
- No sticky save button — changes auto-save (debounced 800ms). 
  Show save indicator in top bar: `"Saving..." → "All changes saved ✓"`.

ULTRAWIDE (>1536px):
- RIGHT preview pane expands to w-96, shows two preview modes toggle: 
  "Portfolio View" and "CV Preview". 
- Color grid: `grid-cols-10`.

─── COMPONENT ARCHITECTURE ──────────────────────────────────────────────

[PAGE HEADER]
`flex items-center justify-between h-14 px-6 border-b border-border`
Left: Back button (ChevronLeft, h-8 w-8) + 
  Page title: EN "Personalize" / ID "Personalisasi" (text-xl font-bold Syne)
Right: Current plan badge + Profile Power ring (compact, h-10 w-10 circular SVG)
  Plan badge EN: "Student Plan" / ID: "Paket Pelajar" 
  Badge colors from plan identity tokens.
  "Upgrade" text link next to badge for non-company plans.

[TABS COMPONENT]
`flex gap-1 bg-surface-2 rounded-xl p-1 w-fit`
Each tab button: `flex items-center gap-2 px-5 h-10 rounded-lg text-sm font-medium 
  transition-all cursor-pointer`
Active: `bg-surface-1 text-text-primary shadow-sm`
Inactive: `text-text-secondary hover:text-text-primary`
Icons: Palette (Color Themes) · LayoutGrid (Layout Themes) — Lucide, h-4 w-4.

─── TAB 1: COLOR THEMES ─────────────────────────────────────────────────

[SECTION STRUCTURE]
`flex flex-col gap-8`

Section 1: "Free Themes" (EN) / "Tema Gratis" (ID)
Section 2: "Premium Themes — Student+" (EN) / "Tema Premium — Pelajar ke Atas" (ID)
  (Locked if userPlan === 'free')
Section 3: "All Themes — Professional+" (EN) / "Semua Tema — Professional ke Atas" (ID)
  (Locked if userPlan === 'free' || 'student')

Section header format:
`flex items-center gap-3 mb-4`
  Label: `text-xs font-semibold uppercase tracking-widest text-text-tertiary`
  Divider: `flex-1 h-px bg-border`
  Lock badge (for locked sections): 
    `inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium
     bg-surface-2 text-text-tertiary border border-border`
    Lock icon (Lucide Lock, h-3 w-3) + plan name
    EN: "🔒 Unlock with Professional" / ID: "🔒 Buka dengan Professional"

[COLOR SWATCH GRID]
`grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3`
Each swatch: `relative group cursor-pointer`
  Circle: `h-14 w-14 rounded-full border-2 transition-all duration-150`
    Default border: border-transparent
    Hover: `scale-110 shadow-md`
    Selected: `border-white ring-2 ring-offset-2 ring-offset-bg ring-[theme-color] scale-110`
  Theme name tooltip: `absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap
    text-2xs text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity`

LOCKED SWATCH STATE:
`relative cursor-not-allowed`
  Circle: `h-14 w-14 rounded-full opacity-30 grayscale border-2 border-transparent`
  Lock overlay: `absolute inset-0 flex items-center justify-center`
    Lock icon: `h-5 w-5 text-text-tertiary`
  On hover: show mini tooltip `"Unlock with Professional"` above swatch.
  On click: trigger upsell modal (see below).

29 themes total. Example naming (EN/ID):
  Free: Obsidian (dark indigo) · Slate (neutral gray) · Ivory (light warm)
  Student+: Ocean (teal) · Forest (emerald) · Dusk (purple-rose) · [4 more]
  Professional+: Neon Noir · Copper · Crimson · Arctic · Sakura · Solar · [17 more]

Selected theme preview:
`mt-6 rounded-2xl overflow-hidden border border-border shadow-card`
  `flex h-48 gap-0`
  Left strip (w-1/3): sidebar color preview.
  Right area (w-2/3): content preview with accent elements.
  Label below: `text-sm font-semibold` (theme name) + EN "Currently applied" / ID "Sedang diterapkan"

─── TAB 2: LAYOUT THEMES ────────────────────────────────────────────────

[LAYOUT CARD GRID]
`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5`

Each layout card: `relative rounded-2xl overflow-hidden border transition-all duration-200`
  UNLOCKED:
    `border-border hover:border-primary/40 cursor-pointer group`
    Selected: `border-primary shadow-[0_0_0_2px_hsl(var(--plan-pro)/0.3)]`
  LOCKED:
    `border-border cursor-pointer` (clickable to trigger upsell)
    Has lock overlay (see below)

[UNLOCKED LAYOUT CARD]
`relative rounded-2xl overflow-hidden border border-border group 
cursor-pointer hover:border-primary/40 transition-all duration-200`

Card body: `bg-surface-1`
  Thumbnail area: `aspect-[4/3] bg-surface-2 relative overflow-hidden`
    SVG thumbnail illustrating the layout structure (wireframe-style).
    Hover: `bg-surface-3 transition-colors`
    Selected: overlay with checkmark badge (top-right, h-6 w-6 rounded-full bg-primary flex items-center justify-center)
  
  Footer: `p-4 border-t border-border`
    Row 1: Layout name (text-sm font-semibold Syne) + plan badge (right)
    Row 2: Description (text-xs text-text-secondary mt-1)
    Row 3: Tags `flex gap-1 mt-2`
      Each tag: `px-2 py-0.5 rounded-full text-2xs bg-surface-2 text-text-tertiary border border-border`

[LOCKED LAYOUT CARD]
`relative rounded-2xl overflow-hidden border border-border cursor-pointer group`

Card body: same thumbnail + footer structure, but:
  Global overlay: `absolute inset-0 bg-[hsl(var(--locked-overlay))] backdrop-blur-[2px]
    flex flex-col items-center justify-center gap-3 z-10`
    
  Overlay content:
    Lock icon: `h-8 w-8 text-white/80` (Lucide Lock)
    Layout name: `text-sm font-semibold text-white` (Syne)
    Plan required badge: 
      `px-3 py-1.5 rounded-full text-xs font-semibold text-white border border-white/20 bg-white/10`
      EN: "Requires Professional" or "Requires Company" based on `minPlan`
      ID: "Butuh Professional" or "Butuh Perusahaan"
    Preview button:
      `px-4 h-9 rounded-lg text-xs font-semibold border border-white/30 text-white
       bg-white/10 hover:bg-white/20 transition-colors`
      EN: "Preview Layout →" / ID: "Pratinjau Layout →"

  On hover: overlay lightens slightly (`bg-[hsl(var(--locked-overlay)/0.85)]`)
  On click (not Preview button): trigger upsell drawer.

[UPSELL DRAWER — slide-in from right on locked click]
`fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-surface-1 border-l border-border shadow-2xl
 flex flex-col`

Drawer header: `flex items-center justify-between px-6 h-16 border-b border-border`
  Title: EN "Upgrade to Unlock" / ID "Upgrade untuk Membuka"
  Close: X button (h-9 w-9)

Drawer body: `flex-1 overflow-y-auto`
  
  LAYOUT LIVE PREVIEW (top half of drawer, h-56):
  `bg-surface-2 relative overflow-hidden` — unblurred, interactive preview of the locked layout
  with placeholder content. User can scroll/interact to see it fully.
  
  Overlay label: `absolute top-3 right-3`
    `px-2.5 py-1 rounded-full text-xs font-medium bg-primary text-white`
    EN: "Unlocked Preview" / ID: "Pratinjau Terbuka"

  Plan comparison (below preview): `px-6 py-5`
    Current plan row: `flex items-center justify-between py-3 border-b border-border`
      EN: "Your plan: Student" · "Active" badge (green)
    Required plan row: `flex items-center justify-between py-3`
      EN: "Required: Professional" · `text-2xl font-black text-text-primary` "$4.5/mo" or "Rp 22.500/bln"
    
    Delta callout: `rounded-xl bg-primary/5 border border-primary/20 p-4 mt-4`
      `text-xs text-text-secondary`
      EN: "Just $2/mo more unlocks this layout, all Premium Themes, and Portfolio Analytics."
      ID: "Hanya Rp 10.000/bln lebih untuk membuka layout ini, semua Tema Premium, dan Analitik Portofolio."

Drawer footer: `px-6 pb-6 pt-4 border-t border-border flex flex-col gap-3`
  Primary CTA: full-width, h-12, bg-primary, rounded-xl, font-bold
    EN: "Upgrade to Professional" / ID: "Upgrade ke Professional"
  Secondary: text button, `text-sm text-text-tertiary hover:text-text-primary`
    EN: "See all plan features →" / ID: "Lihat semua fitur paket →"

[PROFILE POWER METER — desktop right sidebar or mobile compact]
FULL VERSION (desktop):
`flex flex-col items-center gap-4 p-6 bg-surface-1 rounded-2xl border border-border`

SVG Ring (h-32 w-32):
  Outer track: `stroke-[hsl(var(--color-border))] stroke-[8]` circle, fill-none
  Progress arc: `stroke-[hsl(var(--color-primary))] stroke-[8] stroke-linecap-round`
    stroke-dasharray: `${circumference}` 
    stroke-dashoffset: `${circumference * (1 - completion / 100)}`
    Transition: `transition-all duration-1000 ease-out` (animates on mount)
    Color shifts based on completion:
      0-30%: hsl(var(--plan-company)) (amber — incomplete)
      31-85%: hsl(var(--color-primary)) (indigo — in progress)  
      86-100%: hsl(var(--plan-student)) (green — complete)
  
  Center text:
    `${completion}%` — `text-2xl font-black text-text-primary` (Syne)
    EN: "Power" / ID: "Kekuatan" — `text-xs text-text-tertiary`

Completion checklist `flex flex-col gap-2 w-full`:
  Each item: `flex items-center gap-2.5 text-xs`
    Complete: CheckCircle2 icon (text-success) + label (text-text-secondary line-through)
    Incomplete: Circle icon (text-text-tertiary) + label (text-text-primary)
    The incomplete items are clickable links → CV Builder deep-links.

  EN items: "Personal Info · Work Experience · Education · Skills · Projects · Summary"
  ID items: "Info Pribadi · Pengalaman Kerja · Pendidikan · Keahlian · Proyek · Ringkasan"

At 85%+ completion: 
  `mt-4 rounded-xl bg-primary/8 border border-primary/20 p-3 text-xs text-primary`
  EN: "🔥 Almost perfect. Add a Premium Layout to stand out."
  ID: "🔥 Hampir sempurna. Tambahkan Layout Premium untuk tampil beda."
  "Unlock Now" button: `mt-2 w-full h-9 rounded-lg bg-primary text-white text-xs font-semibold`
```

---

## SCREEN 7 — Professional Portfolio (Dynamic Layout Variants)

```
Generate a production-ready React component that renders a Public Portfolio Page 
in multiple structural layout variants based on the user's subscription tier. 
The component receives `layout: 'linear' | 'split' | 'bento' | 'magazine' | 'immersive'` 
and `locale: 'en' | 'id'` props.
This screen shows HOW the same content is architecturally restructured per layout — 
the information is identical, but the structural experience is radically different.
Extends Obsidian Nexus: dark default bg #0D0F14, Syne + Inter, CSS token system.

─── LAYOUT VARIANT BLUEPRINTS ────────────────────────────────────────────

The component renders DIFFERENT structural HTML/CSS for each layout value.
Use a top-level conditional: `{layout === 'linear' && <LinearLayout />}` etc.

━━━ VARIANT A: LINEAR (Free Tier) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Structure: Single-column, top-to-bottom. Max-w-2xl, mx-auto. Clean and minimal.

[TOP BAR]: sticky, glassmorphism, h-14, EN "John's Portfolio" / ID "Portofolio John"
[AVATAR + NAME + ROLE]: centered stack (text-center). Avatar h-20, name text-3xl Syne.
[BIO]: max-w-prose mx-auto, text-center text-text-secondary.
[SOCIAL LINKS]: horizontal, centered, icon-only links.
[SECTION DIVIDER]: `w-16 h-px bg-border mx-auto my-8`
[PROJECTS]: `flex flex-col gap-6` — each project: horizontal card 
  `flex gap-5 p-5 rounded-2xl bg-surface-1 border border-border`
  Thumbnail left (h-24 w-32 flex-shrink-0 rounded-lg bg-surface-2)
  Content right: title, description, tags.
[SKILLS]: `flex flex-wrap gap-2 justify-center`
[EXPERIENCE]: vertical timeline (see Phase 1 Screen 4 spec).
[CONTACT]: centered section.

INDICATOR BADGE (for layout preview mode in Customization Hub):
  Top-right floating label: 
  `absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium bg-surface-2 
  border border-border text-text-secondary`
  EN: "Free Layout · Linear" / ID: "Layout Gratis · Linear"

━━━ VARIANT B: SPLIT SIDEBAR (Student+) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Structure: `flex min-h-screen` — Fixed left sidebar (w-72) + scrollable right content.

[LEFT SIDEBAR] `w-72 flex-shrink-0 fixed top-0 bottom-0 left-0 border-r border-border 
  bg-surface-1 flex flex-col px-6 py-8 overflow-y-auto`
  Avatar: h-16 w-16 rounded-full, ring-2 ring-border.
  Name: text-xl font-bold Syne.
  Role: text-sm text-text-secondary.
  Bio: text-xs text-text-tertiary mt-3, leading-relaxed.
  Divider: hr class border-border my-5.
  Contact details (vertical list): each `flex items-center gap-2.5 text-xs text-text-secondary py-1.5`
    Mail · Phone · Location · Website icons (Lucide, h-3.5 w-3.5 text-text-tertiary).
  Skills section: `flex flex-col gap-1 mt-6`
    Section label: text-2xs uppercase tracking-widest text-text-tertiary mb-2.
    Each skill: `flex items-center justify-between text-xs`
      Name + proficiency bar `h-1 flex-1 mx-3 rounded-full bg-border overflow-hidden`
        Fill: `h-full bg-primary rounded-full` with width% from data.
  Download CV button (bottom of sidebar): 
    `mt-auto w-full h-11 rounded-xl border border-border text-sm font-medium 
    flex items-center justify-center gap-2 hover:bg-surface-2 transition-colors`
    EN: "Download CV" / ID: "Unduh CV"

[RIGHT CONTENT] `flex-1 ml-72 p-8 max-w-3xl`
  Projects: `grid grid-cols-2 gap-4`
  Experience: standard timeline.
  Section headers: `text-xs uppercase tracking-widest text-text-tertiary border-b border-border pb-2 mb-6`

INDICATOR BADGE: `bg-[hsl(var(--plan-student-bg))] border-[hsl(var(--plan-student-border))]`
  EN: "Student Layout · Split Sidebar" / ID: "Layout Pelajar · Sidebar Terpisah"

━━━ VARIANT C: BENTO GRID (Professional+) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This is the signature layout. Asymmetric CSS Grid. No linear flow.
`display: grid` with named template areas — content breaks the monotony of columns.

TOP LEVEL GRID (desktop): 
`grid grid-cols-12 grid-rows-[auto] gap-4 p-6 max-w-7xl mx-auto`

HEADER BENTO BLOCK: `col-span-12` 
  `flex items-end justify-between gap-8 p-8 rounded-3xl bg-surface-1 border border-border`
  Left: Name (text-5xl Syne font-black) + Role + Bio (max-w-sm text-text-secondary).
  Right: Avatar (h-24 w-24 rounded-2xl, not circular — intentional grid feel) 
    + Social icon row (vertical, right-aligned).

FEATURED PROJECT BLOCK: `col-span-7 row-span-2`
  `rounded-3xl overflow-hidden aspect-[16/10] relative group cursor-pointer`
  BG: large project image or gradient placeholder.
  Overlay: `absolute inset-0 bg-gradient-to-t from-black/80 to-transparent`
  Content (absolute bottom): project title (text-2xl Syne font-bold text-white) + tags.
  Hover: `group-hover:scale-[1.01] transition-transform duration-500`

STATS BLOCK: `col-span-5`
  `grid grid-cols-2 gap-4 h-full`
  4 stat mini-cards: `rounded-2xl bg-surface-1 border border-border p-4 flex flex-col justify-between`
    EN/ID label: "Projects" / "Proyek", "Experience" / "Pengalaman", "Views" / "Tampilan", "Rating" / "Rating"
    Big number: `text-4xl font-black` (Syne)

SKILLS BENTO BLOCK: `col-span-5`
  `rounded-3xl bg-[hsl(var(--plan-pro-bg))] border border-[hsl(var(--plan-pro-border))] p-6`
  Tag cloud layout: skills as varying-size pills based on proficiency.
  Expert skills: `text-base px-4 py-2`
  Intermediate: `text-sm px-3 py-1.5`
  Beginner: `text-xs px-2 py-1`
  All: `rounded-full border border-[hsl(var(--plan-pro-border))] text-[hsl(var(--plan-pro))]`

PROJECT LIST: `col-span-12`
  `grid grid-cols-3 gap-4`
  Cards: `rounded-2xl bg-surface-1 border border-border overflow-hidden group cursor-pointer`
    Image: `aspect-video bg-surface-2 overflow-hidden`
      `group-hover:scale-[1.03] transition-transform duration-400`
    Content: `p-5` — title, desc line-clamp-2, tag row.
    Hover: border-primary/40.

EXPERIENCE BLOCK: `col-span-7`
  `rounded-3xl bg-surface-1 border border-border p-6`
  Horizontal timeline (scrollable if many items):
  `flex gap-6 overflow-x-auto pb-2 scrollbar-hide`
  Each entry: `flex-shrink-0 w-56 rounded-2xl bg-surface-2 p-4 border border-border`
    Date top (text-xs text-text-tertiary JetBrains Mono) + company + role + 1-line desc.

INDICATOR BADGE: `bg-[hsl(var(--plan-pro-bg))] border-[hsl(var(--plan-pro-border))]`
  EN: "Professional Layout · Bento Grid" / ID: "Layout Professional · Grid Bento"

━━━ VARIANT D: MAGAZINE (Professional+) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Editorial. Newspaper-inspired column grid. Full-bleed section images.

TOP SECTION: `grid grid-cols-12 gap-0 min-h-[60vh]`
  LEFT (col-span-7): Full-bleed image (project hero). 
    `h-full bg-gradient-to-br from-slate-900 to-indigo-950 relative overflow-hidden`
    Large project title as editorial quote, white, centered.
  RIGHT (col-span-5): Profile column.
    `border-l border-border p-8 flex flex-col gap-6`
    Name in vertical text (writing-mode: vertical-rl, text-xl, Syne)... 
    OR horizontal if that's too unusual. Bold editorial name in large type, then bio.
    Stats: thin divider-separated pairs `Role | Years Experience | Location`
    Social links: text links (not icon-only): "@GitHub · /LinkedIn · name@email.com"

BELOW FOLD: `max-w-5xl mx-auto px-8`
  Section label: `text-2xs uppercase tracking-widest text-text-tertiary` — "Selected Work"
  `grid grid-cols-3 gap-6 mt-8`
    Card 1: `col-span-2` (large, image-led)
    Card 2: `col-span-1` (compact, info-dense)
    Card 3: `col-span-1` (compact)
    Card 4: `col-span-2` (large, alternating)
  This alternating L-R rhythm is the magazine signature.

INDICATOR BADGE: `bg-[hsl(var(--plan-pro-bg))] border-[hsl(var(--plan-pro-border))]`
  EN: "Professional Layout · Magazine" / ID: "Layout Professional · Majalah"

━━━ VARIANT E: IMMERSIVE DARK (Company+) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Full-viewport sections. Cinematic. No traditional card UI.
Each section is `min-h-screen` with Framer Motion scroll-triggered parallax.
Background: absolute black `bg-black`. Accent: `--plan-company` amber gold.

SECTION 1 — Hero: `min-h-screen flex flex-col items-center justify-center relative overflow-hidden`
  Background texture: SVG grain noise pattern (subtle, opacity-[0.04]).
  Animated gradient blob: 
    `absolute inset-0 bg-gradient-radial from-amber-900/20 via-transparent to-transparent animate-pulse`
  Name: `text-8xl font-black tracking-tight leading-none` (Syne) — large and architectural.
  Role: `text-sm font-medium tracking-[0.4em] uppercase text-amber-400 mt-4`
  Scroll indicator: animated chevron-down, `absolute bottom-8 left-1/2 -translate-x-1/2`
    `animate-bounce opacity-50`

SECTION 2 — Featured Work: `min-h-screen grid grid-cols-2`
  Left: sticky description text (position: sticky, top: 25vh).
    `p-16 flex flex-col justify-center`
    EN "Selected Work" / ID "Karya Pilihan" — text-xs uppercase tracking-widest text-amber-400.
    Project count: `text-7xl font-black Syne opacity-20` (like "03").
    Title + paragraph.
  Right: scrollable project images stacked vertically.
    Each: `aspect-square overflow-hidden` with large image/gradient.
    Scroll through right side while left stays sticky — classic editorial parallax.

SECTION 3 — About: full-bleed, `bg-[hsl(var(--plan-company-bg))]`
  Large text treatment: bio as pull-quote style, `text-3xl font-light leading-relaxed max-w-3xl mx-auto text-center p-24`

SECTION 4 — Contact: `min-h-[50vh] flex items-center justify-center`
  Email address in massive text: `text-5xl font-black text-amber-400 hover:opacity-80 transition-opacity`
  Cursor changes to pointer on hover.

INDICATOR BADGE: `bg-[hsl(var(--plan-company-bg))] border-[hsl(var(--plan-company-border))]`
  EN: "Company Layout · Immersive Dark" / ID: "Layout Perusahaan · Gelap Imersif"

─── LAYOUT SWITCHER PREVIEW PANEL ──────────────────────────────────────
(Used inside Customization Hub, not the public page itself)

`relative rounded-2xl overflow-hidden border border-border bg-surface-2`
  Inner: `transform scale-[0.45] origin-top-left` — scaled miniature of the actual layout component.
  `pointer-events-none select-none` (non-interactive in preview mode).
  Outer container sized to show the scaled content: 
    `h-[280px] overflow-hidden` (clips the miniature to card size).
  
This technique renders the real layout component at 45% scale inside the card —
not a static image, but a live miniature. Use `React.memo` to prevent unnecessary re-renders.
```

---

## PART 4 — CROSS-CUTTING IMPLEMENTATION NOTES (PHASE 2)

### 4.1 IP-Based Geo Detection

```typescript
// Detect locale from IP on first load (server-side or edge function)
// Fallback: browser Accept-Language header

async function detectLocale(): Promise<'en' | 'id'> {
  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    return data.country_code === 'ID' ? 'id' : 'en';
  } catch {
    // Fallback: parse navigator.language
    return navigator.language.startsWith('id') ? 'id' : 'en';
  }
}

// Store in: React Context + localStorage ('nexus_locale')
// User can override via the Language Toggle (persisted to localStorage)
```

---

### 4.2 Plan Gate HOC (Higher-Order Component)

```typescript
// Wrap any premium feature with this HOC
interface PlanGateProps {
  requiredPlan: 'student' | 'professional' | 'company';
  userPlan:     'free' | 'student' | 'professional' | 'company';
  children:     React.ReactNode;
  onLockedClick?: () => void;  // triggers upsell drawer
  showBlurred?: boolean;       // blur instead of hide
}

const planHierarchy = { free: 0, student: 1, professional: 2, company: 3 };

function PlanGate({ requiredPlan, userPlan, children, onLockedClick, showBlurred }: PlanGateProps) {
  const hasAccess = planHierarchy[userPlan] >= planHierarchy[requiredPlan];
  
  if (hasAccess) return <>{children}</>;
  
  if (showBlurred) {
    return (
      <div className="relative cursor-pointer" onClick={onLockedClick}>
        <div className="pointer-events-none select-none blur-sm opacity-40">
          {children}
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <LockIcon className="h-6 w-6 text-white/70" />
          <span className="text-xs font-semibold text-white/80">
            Requires {requiredPlan.charAt(0).toUpperCase() + requiredPlan.slice(1)}
          </span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="opacity-50 cursor-not-allowed" onClick={onLockedClick}>
      {children}
    </div>
  );
}
```

---

### 4.3 Trial Banner System

```typescript
// Trial state management
interface TrialState {
  isActive:       boolean;
  trialPlan:      'professional' | 'company';
  expiresAt:      Date;
  daysRemaining:  number;
  hoursRemaining: number;
}

// Trial Banner Component
// Position: sticky below top nav, above page content
// z-index: 40 (below modals at 50, above content at 0)
// Dismissible: yes (but reappears on next session if < 2 days left)
// Auto-hides: when trial expires (show "Trial Ended" state instead)

// Visual states:
// 3+ days left:  amber/warning styling, "You have 3 days left on your trial"
// 1-2 days left: orange/urgent, "Your trial ends tomorrow"
// <24h left:     red/danger, live countdown HH:MM:SS + "Upgrade now to keep access"
// Expired:       gray state, "Your trial has ended · Resume Professional"
```

---

### 4.4 Annual vs Monthly Billing Animation

```typescript
// When user toggles billing period, prices animate:
// 1. Old price: scale-down to 80% + opacity 0 (duration: 150ms)
// 2. New price: enters from below (translateY: 8px → 0) + opacity 0 → 1 (duration: 200ms)
// 3. Annual savings badge: bounces in with spring easing on toggle to Annual

// CSS approach with Framer Motion:
const priceVariants = {
  exit:   { opacity: 0, y: -8, scale: 0.9, transition: { duration: 0.15 } },
  enter:  { opacity: 1, y:  0, scale: 1.0, transition: { duration: 0.20, delay: 0.15 } },
};

// Annual badge spring:
const badgeVariants = {
  initial: { opacity: 0, scale: 0, rotate: -10 },
  animate: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 400, damping: 20 } },
};
```

---

*End of Phase 2 Blueprint — Obsidian Nexus Monetization & VIP Customization*  
*Version 2.0 · Continuation of Phase 1 Design System*  
*Screens 5, 6, 7 — Ready for `generate_screen_from_text` execution*
