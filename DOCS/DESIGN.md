# Arwan Centralized Ecosystem SaaS - Design System

## HSL Color Tokens (29 Themes)

This document serves as the Single Source of Truth for the project's color architecture.

### Public Themes (27 Total)

**Free Tier (2 Themes)**
1. **Minimalist (Light):**
   - Background: `0 0% 100%`
   - Foreground: `0 0% 10%`
   - Primary: `0 0% 20%`
   - Secondary: `0 0% 90%`
   - Accent: `0 0% 50%`

2. **Dark Neon (Dark):**
   - Background: `240 10% 4%`
   - Foreground: `0 0% 98%`
   - Primary: `260 100% 60%`
   - Secondary: `240 20% 15%`
   - Accent: `320 100% 60%`

**VIP Tier (25 Themes)**
3. **Cyberpunk Red:** Background `0 100% 5%`, Primary `0 100% 50%`
4. **Ocean Blue:** Background `200 50% 10%`, Primary `210 100% 50%`
5. **Forest Green:** Background `120 40% 10%`, Primary `130 80% 40%`
6. **Sunset Orange:** Background `30 50% 10%`, Primary `25 100% 50%`
7. **Royal Purple:** Background `280 40% 10%`, Primary `275 80% 50%`
8. **Gold Luxury:** Background `45 50% 10%`, Primary `45 100% 50%`
9. **Rose Quartz:** Background `340 30% 15%`, Primary `345 80% 60%`
10. **Emerald City:** Background `150 50% 10%`, Primary `155 100% 40%`
11. **Midnight Indigo:** Background `250 50% 8%`, Primary `245 90% 60%`
12. **Coral Reef:** Background `15 40% 12%`, Primary `10 80% 60%`
13. **Slate Gray:** Background `210 10% 15%`, Primary `215 20% 60%`
14. **Mint Fresh:** Background `160 30% 10%`, Primary `165 80% 50%`
15. **Lavender Dream:** Background `270 20% 12%`, Primary `275 60% 60%`
16. **Crimson Shadow:** Background `350 40% 8%`, Primary `355 90% 50%`
17. **Sapphire Deep:** Background `220 50% 8%`, Primary `225 100% 50%`
18. **Amber Glow:** Background `40 40% 10%`, Primary `35 90% 50%`
19. **Teal Matrix:** Background `180 50% 8%`, Primary `180 100% 40%`
20. **Ruby Rich:** Background `355 40% 10%`, Primary `350 90% 40%`
21. **Cobalt Strike:** Background `215 50% 12%`, Primary `210 90% 55%`
22. **Olive Drab:** Background `80 30% 15%`, Primary `85 60% 40%`
23. **Plum Velvet:** Background `300 40% 10%`, Primary `295 80% 50%`
24. **Tangerine Pop:** Background `20 40% 10%`, Primary `25 90% 55%`
25. **Cerulean Clear:** Background `195 40% 12%`, Primary `190 85% 55%`
26. **Magenta Shock:** Background `315 40% 10%`, Primary `320 90% 50%`
27. **Charcoal Elegance:** Background `0 0% 12%`, Primary `0 0% 80%`

### Admin Themes (2 Total)

28. **Nvidia Light:**
   - Background: `0 0% 98%` (Clean White)
   - Foreground: `0 0% 15%` (Dark Charcoal)
   - Primary: `120 100% 35%` (Nvidia Green)
   - Secondary: `0 0% 90%`
   - Accent: `120 50% 50%`

29. **AMD/MSI Dark:**
   - Background: `0 0% 5%` (Pitch Black)
   - Foreground: `0 0% 95%`
   - Primary: `180 100% 50%` (Cyan)
   - Secondary: `0 100% 50%` (Red)
   - Accent: `0 80% 40%`

## Component Hierarchy

- **Page Layout**
  - `MegaMenu.tsx` (Navbar, Theme Toggle Admin, Dropdowns)
  - `Hero Section` (Landing)
  - `Project Grid`
  - `KiroiXTelemetry.tsx` (MT5 EA Dashboard Widget)
  - `Pricing Funnel`
  - `ThemeSelector.tsx` (27 Theme Grid with VIP Lock)
  - `GlobalFooter.tsx` (Glassmorphism, Social Nodes, Status)
