# ☀️ Greentech Energy Solution — Website

A modern, responsive website for **Greentech Energy Solution**, a solar EPC (Engineering, Procurement & Construction) company based in Aligarh, Uttar Pradesh. The site showcases the company's solar services, features an interactive solar system configurator with live pricing, and supports bilingual content (English / Hindi) with light and dark themes.

> **Live domain:** [greentechenergysolution.com](https://greentechenergysolution.com)

---

## ✨ Features

| Feature | Description |
|---|---|
| **Interactive Solar Configurator** | 8-step wizard to design a solar system — choose panels, inverters, batteries, mounting, BOS — with a **live price sidebar** that updates in real-time. Configuration state persists in `localStorage`. |
| **Bilingual (EN / HI)** | Full English and Hindi content via a JSON-driven i18n system. Language preference is saved to `localStorage`. |
| **Dark / Light Theme** | Class-driven (`html.dark`) theme toggle with FOUC-free initialisation via an inline `<script>` in `index.html`. |
| **Product Catalogue** | Dedicated Products page with solar panel, inverter, battery, and BOS product data. |
| **Subsidy Information** | Subsidies page detailing PM Surya Ghar Yojana and state-level incentives. |
| **Project Gallery** | Image gallery of real 431+ completed installations (1,442 kWp installed). |
| **Responsive Layout** | Mobile-first design with a sticky mobile CTA bar, WhatsApp floating button, and adaptive navigation. |
| **SEO Optimised** | Open Graph, Twitter Card meta tags, semantic HTML, structured heading hierarchy. |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev) with TypeScript 6 |
| **Build Tool** | [Vite 8](https://vite.dev) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) (CSS-first config, `@tailwindcss/vite` plugin) |
| **Routing** | [React Router 7](https://reactrouter.com) |
| **Animations** | [Framer Motion 13](https://motion.dev) |
| **Icons** | [Lucide React](https://lucide.dev) |
| **UI Primitives** | [Headless UI 2](https://headlessui.com) |
| **Linting** | [OXLint](https://oxc.rs/docs/guide/usage/linter) |
| **Font** | [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts) |

---

## 📁 Project Structure

```
solar-setup/
├── index.html                  # Entry HTML with SEO meta & dark-mode init script
├── vite.config.ts              # Vite + React + Tailwind plugins
├── package.json
├── tsconfig.json
│
├── public/
│   ├── favicon.svg
│   ├── icons.svg               # SVG sprite for brand logos
│   ├── logo.png
│   └── images/                 # Gallery images (gallery-1..5.jpg)
│
├── src/
│   ├── main.tsx                # React DOM entry point
│   ├── App.tsx                 # Root component — routing & providers
│   ├── App.css
│   ├── index.css               # Design system — tokens, custom utilities, animations
│   │
│   ├── pages/
│   │   ├── Home.tsx            # Landing page (hero, gallery, FAQ, CTA, etc.)
│   │   ├── Configurator.tsx    # 8-step solar system builder
│   │   ├── Products.tsx        # Product catalogue
│   │   ├── Subsidies.tsx       # Government subsidy information
│   │   └── About.tsx           # Company story & team
│   │
│   ├── components/
│   │   ├── home/               # Home page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── WhyZenbright.tsx
│   │   │   ├── Installations.tsx
│   │   │   ├── ProjectGallery.tsx
│   │   │   ├── SystemTypes.tsx
│   │   │   ├── Brands.tsx
│   │   │   ├── SubsidyHighlight.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── FAQ.tsx
│   │   │   └── HowItWorks.tsx
│   │   │
│   │   ├── configurator/       # Configurator step components
│   │   │   ├── StepHeader.tsx
│   │   │   ├── Step1Basics.tsx       # State, capacity, roof area
│   │   │   ├── Step2SystemType.tsx   # On-grid / Off-grid / Hybrid
│   │   │   ├── Step3Panels.tsx       # Panel selection
│   │   │   ├── Step4Inverter.tsx     # Inverter selection
│   │   │   ├── Step5Battery.tsx      # Battery selection
│   │   │   ├── Step6Mounting.tsx     # Mounting structure
│   │   │   ├── Step7BOS.tsx          # Balance of System accessories
│   │   │   ├── Step8Summary.tsx      # Final quote summary
│   │   │   └── LivePriceBar.tsx      # Sticky price breakdown sidebar
│   │   │
│   │   └── layout/             # Shared layout components
│   │       ├── Navbar.tsx
│   │       ├── Footer.tsx
│   │       ├── WhatsAppButton.tsx
│   │       ├── MobileCTABar.tsx
│   │       ├── LanguageToggle.tsx
│   │       └── ThemeToggle.tsx
│   │
│   ├── content/                # Bilingual JSON content (i18n)
│   │   ├── en/                 # English translations (18 JSON files)
│   │   ├── hi/                 # Hindi translations (18 JSON files)
│   │   ├── images.ts           # Image path constants
│   │   ├── icons.ts            # Icon sprite references
│   │   └── types.ts            # Content type definitions
│   │
│   ├── data/                   # Product & pricing data
│   │   ├── panels.ts           # Solar panel catalogue
│   │   ├── inverters.ts        # Inverter catalogue
│   │   ├── batteries.ts        # Battery catalogue
│   │   ├── mounting.ts         # Mounting structure options
│   │   ├── bos.ts              # Balance of System accessories
│   │   └── subsidies.ts        # Subsidy rules & calculations
│   │
│   ├── i18n/
│   │   └── LanguageContext.tsx  # Language provider & useContent hook
│   │
│   ├── theme/
│   │   └── ThemeContext.tsx     # Theme provider & useTheme hook
│   │
│   ├── types/
│   │   └── solar.ts            # SystemConfig & product type definitions
│   │
│   └── utils/
│       └── priceCalculator.ts  # Live pricing engine for the configurator
│
└── reference/                  # Design / planning reference files
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 10

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-org>/solar-setup.git
cd solar-setup

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Opens the dev server at `http://localhost:5173` with hot module replacement.

### Build

```bash
npm run build
```

Compiles TypeScript and produces an optimised production bundle in `dist/`.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

Runs [OXLint](https://oxc.rs) for fast, zero-config linting.

---

## 🎨 Design System

The project uses a custom **semantic design-token architecture** defined in [`src/index.css`](src/index.css):

### Color Palette (60 / 30 / 10 distribution)

| Role | Hue | Usage |
|---|---|---|
| **Solar Amber** (H ≈ 36°) | Primary – 60% | CTAs, pricing, headlines, energy visuals |
| **Leaf Green** (H ≈ 150°) | Secondary – 30% | Savings, eco badges, success states |
| **Sky Teal** (H ≈ 195°) | Tertiary – 10% | Trust, info, data visualisation, links |

### Semantic Tokens

All components consume **semantic tokens** (`bg-canvas`, `text-foreground`, `border-border`, etc.) instead of hard-coded colors. Light/dark themes are a contrasting pair by construction — toggling `.dark` on `<html>` automatically flips every surface and text color.

### Custom Utilities

- `.glass` — Frosted glass card (backdrop-blur + semi-transparent background)
- `.bento` / `.bento-hover` — Primary card surface with elevation and hover lift
- `.text-gradient` / `.text-gradient-leaf` — Theme-adaptive gradient text
- `.animate-float` / `.animate-pulse-glow` — Micro-animation keyframes

---

## 🌐 Internationalisation (i18n)

Content is managed via static JSON files under `src/content/{en,hi}/`:

```
src/content/
├── en/       # 18 JSON files — English
└── hi/       # 18 JSON files — Hindi
```

**Usage in components:**

```tsx
import heroEn from '../content/en/hero.json';
import heroHi from '../content/hi/hero.json';
import { useContent } from '../i18n/LanguageContext';

const hero = useContent(heroEn, heroHi);
// → returns the English or Hindi object based on the active language
```

To add a new language, duplicate the `en/` folder, translate the values, and extend the `Language` union type in `LanguageContext.tsx`.

---

## 🌙 Theming

| Aspect | Implementation |
|---|---|
| **Toggle** | `ThemeToggle` component calls `toggleTheme()` from `ThemeContext` |
| **Persistence** | Preference saved to `localStorage` key `site_theme` |
| **FOUC prevention** | Inline `<script>` in `index.html` applies `.dark` before first paint |
| **CSS mechanism** | Tailwind v4 `@custom-variant dark` — `dark:` utilities activate under `.dark` class |

---

## ⚡ Solar Configurator

The configurator (`/configurator`) is the centerpiece interactive feature:

1. **Basics** — State, system capacity (kW), monthly bill, roof area
2. **System Type** — On-grid · Off-grid · Hybrid
3. **Panels** — Select from a catalogue of solar panels
4. **Inverter** — Matching inverter selection
5. **Battery** — Battery selection (skippable for on-grid systems)
6. **Mounting** — Roof / ground mounting structure
7. **BOS** — Balance of System accessories (wire, MCB, earthing, etc.)
8. **Summary** — Full quote breakdown with WhatsApp share

Configuration state is defined by the [`SystemConfig`](src/types/solar.ts) type and is persisted to `localStorage` across sessions. The [`priceCalculator.ts`](src/utils/priceCalculator.ts) utility computes the live price breakdown displayed in the [`LivePriceBar`](src/components/configurator/LivePriceBar.tsx) sidebar.

---

## 📦 Deployment

The `dist/` output is a static SPA. Deploy to any static hosting provider:

- **Vercel** — `vercel --prod`
- **Netlify** — Drag-and-drop the `dist/` folder or connect the Git repo
- **GitHub Pages** — Use the `vite-plugin-gh-pages` plugin or a CI workflow
- **Firebase Hosting** — `firebase deploy`

> **Note:** Since this is a client-side SPA with React Router, configure your host to redirect all routes to `index.html` (e.g., a `_redirects` file for Netlify or `rewrites` in `vercel.json`).

---

## 📄 License

This project is proprietary software. © 2026 Greentech Energy Solution. All rights reserved.
