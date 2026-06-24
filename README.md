<p align="center">
  <img src="https://placehold.co/120x120/8b5cf6/ffffff?text=U" alt="UltNexus Logo" width="120" />
</p>

<h1 align="center">UltNexus</h1>
<p align="center"><strong>Your Ultimate Entertainment Hub</strong></p>
<p align="center">
  Track, rate, and discover movies, series, animes, and books — all in one place.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-Next.js_16-black?logo=nextdotjs" alt="Next.js" />
  <img src="https://img.shields.io/badge/Backend-NestJS_11-e0234e?logo=nestjs" alt="NestJS" />
  <img src="https://img.shields.io/badge/Database-Prisma_+_SQLite-2d3748?logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/Language-TypeScript-3178c6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Styling-Tailwind_CSS_4-38bdf8?logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/License-Private-red" alt="License" />
</p>

---

## 📖 About
UltNexus is a modern media tracking and community platform where users can discover, rate, review, and organize their favorite entertainment content across four main categories: Movies, Series, Animes, and Books.

*Note: For AI Agent instructions and strict coding rules, please refer to `.agents/AGENTS.md`.*

---

## 🏗️ Architecture Overview

```
UltNexus/
├── frontend/          # Next.js 16 (React 19, Tailwind CSS 4)
│   ├── src/
│   │   ├── app/           # Pages (Home, Movies, Series, Animes, Books)
│   │   ├── components/    # Reusable UI components
│   │   └── lib/           # Utilities, data, helpers
│   └── public/            # Static assets
│
├── backend/           # NestJS 11 (REST API)
│   ├── src/               # API modules, services, controllers
│   └── prisma/            # Database schema & migrations
│
└── README.md          # This file
```

---

## 🎯 Core Design Principles

### 1. Content vs. User Data Separation
External API data (film details, posters, trailers) is **never mixed** with user-generated data (ratings, comments, lists). External content is cached and referenced by ID; user interactions live in our own database.

### 2. Fully Dynamic — No Hardcoded Text
All user-facing text (button labels, headings, descriptions) will be managed through a **centralized translation system** (`i18n`). Nothing is hardcoded into components.

### 3. Full Mobile Responsiveness (Mobile-First Approach):** The platform is built to provide a seamless and adaptive user experience across all mobile devices. This principle applies strictly to the current state and all future updates; every UI component must remain fully responsive and visually optimized for mobile viewports.

```
❌  <button>Save</button>
✅  <button>{t("save_button")}</button>
```

This enables seamless multi-language support in the future (Turkish, Spanish, Japanese, etc.).

### 3. Theming via CSS Variables
All colors, fonts, spacing, and visual properties are controlled through **CSS custom properties** and a centralized design token system. Switching from dark to light theme — or creating entirely new themes — requires zero component changes.

```css
--background: #030014;
--accent-primary: #8b5cf6;
--accent-secondary: #06b6d4;
```

### 4. Modular Component Library
Every UI element (cards, buttons, sections, modals) is a reusable component. A content card designed for movies works identically for books, animes, or any future category — with consistent hover animations, responsive behavior, and styling.

### 5. Widget-Based Homepage
The homepage is **not hardcoded**. It is composed of sections (widgets) that can be reordered, added, or removed via configuration:

| Section          | Type         | Order | Status |
|------------------|--------------|-------|--------|
| Trending Movies  | Carousel     | 1     | Active |
| New Releases     | Grid         | 2     | Active |
| Movie Clash      | Interactive  | 3     | Active |
| World Cup Scores | Live Widget  | 4     | Draft  |

Future admin panel will manage this dynamically.

### 6. MVP-First Approach
Development follows a modular, iterative path. **Movies** category is built first with full depth (detail pages, reviews, voting). Once perfected, the same patterns are replicated for Series, Animes, and Books.

---

## 🔑 Feature Roadmap

### Phase 1 ✅ — Project Foundation
- [x] GitHub repository setup
- [x] NestJS backend initialization
- [x] Next.js frontend initialization
- [x] Project structure & tooling

### Phase 2 ✅ — Database & API Layer
- [x] Prisma ORM setup with SQLite (→ PostgreSQL in production)
- [x] Database models: `User`, `Item`, `UserItem`
- [x] PrismaService integration with NestJS
- [x] FREE / PRO user tier system

### Phase 3 ✅ — Premium Frontend UI
- [x] Dark-mode design system with glassmorphism
- [x] Responsive Navbar with mobile hamburger menu
- [x] Footer with category links & social media
- [x] Hero section with animated gradient orbs
- [x] Content cards with hover effects & glow animations
- [x] Category showcase sections (horizontal scroll)
- [x] Individual category pages (Movies, Series, Animes, Books)
- [x] Feature highlights section
- [x] CTA sections

### Phase 4 🔜 — External API Integration
- [ ] TMDB API integration (Movies, Series)
- [ ] Anime API integration (Jikan / AniList)
- [ ] Google Books API integration
- [ ] API response caching layer (prevent rate limit issues)
- [ ] Replace mock data with real content

### Phase 5 — Authentication & User System
- [ ] User registration & login (email/password)
- [ ] Social authentication (Google, Discord, Apple)
- [ ] JWT token-based session management
- [ ] User profile pages (avatar, bio, social links)
- [ ] FREE vs PRO tier enforcement

### Phase 6 — User Interactions
- [ ] Rating system (1-10 scale)
- [ ] Review & comment system (multi-language support)
- [ ] Watchlist / Read list management
- [ ] Status tracking (Watching, Completed, Plan to Watch, Dropped)
- [ ] Progress tracking (episode/page numbers)
- [ ] Favorite lists (public & private)

### Phase 7 — Movie Clash & Event System
- [ ] Event module (independent from categories)
- [ ] Curated content pools (e.g., "Top 10 Horror Movies")
- [ ] User voting with rule engine:
  - 1 positive vote per user per item
  - +1 bonus vote for writing a comment
  - No duplicate positive votes on same item
  - Configurable cooldowns (e.g., 24-hour limit)
  - Admin-configurable rule sets
- [ ] Live leaderboard with real-time ranking
- [ ] Event history & archives

### Phase 8 — Internationalization (i18n)
- [ ] Translation file system (`en.json`, `tr.json`, `es.json`, etc.)
- [ ] `t()` function integration across all components
- [ ] Language selector in Navbar
- [ ] RTL (Right-to-Left) support for Arabic/Hebrew
- [ ] Date/time/number localization

### Phase 9 — Admin Panel
- [ ] Dashboard with analytics overview
- [ ] Homepage widget manager (add, reorder, toggle sections)
- [ ] Content moderation queue (reported comments/reviews)
- [ ] Event manager (create, configure, archive Movie Clash events)
- [ ] User management (ban, promote, tier changes)
- [ ] Banner & announcement manager
- [ ] Site settings (theme, logo, SEO defaults)

### Phase 10 — Gamification
- [ ] Badge system (First Comment, Movie Critic, Horror Master, etc.)
- [ ] User levels & XP
- [ ] Achievement notifications
- [ ] Profile badge showcase

### Phase 11 — Advanced Features
- [ ] Notification system (in-app + push)
- [ ] Global search (movies, series, books, users, actors)
- [ ] Recommendation engine (based on user taste)
- [ ] Follow system (follow other users)
- [ ] Activity feed (see what friends are watching/reading)
- [ ] Custom list creation ("My Top 100 Sci-Fi Movies")

### Phase 12 — Monetization & Business
- [ ] Premium subscription system (Stripe integration)
- [ ] Premium-only features (advanced stats, AI recommendations, custom themes)
- [ ] Dynamic ad placement zones (optional, non-intrusive)
- [ ] Affiliate link integration

### Phase 13 — Production Deployment
- [ ] Hetzner server setup
- [ ] PostgreSQL database migration (from SQLite)
- [ ] Domain & SSL configuration
- [ ] CI/CD pipeline (auto-deploy on push)
- [ ] CDN for static assets & images
- [ ] Monitoring & logging (uptime, errors, performance)

### Phase 14 — Progressive Web App & Mobile
- [ ] PWA manifest & service worker
- [ ] Offline access for saved content
- [ ] Push notifications
- [ ] "Add to Home Screen" support
- [ ] API versioning (`/v1/`, `/v2/`) for future native apps

---

## 🔒 Security Considerations

- **Rate Limiting** — API request throttling to prevent abuse
- **Input Sanitization** — XSS and SQL injection protection on all user inputs
- **CSRF Protection** — Token-based protection on state-changing requests
- **Bot Protection** — CAPTCHA or cooldown systems for voting & comments
- **Content Moderation** — Report system + admin review queue
- **Data Encryption** — Passwords hashed with bcrypt, sensitive data encrypted at rest

---

## ♿ Accessibility (a11y)

- WCAG 2.1 AA compliance target
- Keyboard navigation support
- Screen reader compatibility (ARIA labels)
- Sufficient color contrast ratios
- Focus indicators on interactive elements

---

## 📊 Data Flexibility

The database schema is designed for **category-agnostic extensibility**. While current categories are Movies, Series, Animes, and Books, the `Item` model supports:

- Custom metadata per content type (JSON field)
- Category-specific metrics (watch time, page count, episode progress)
- Future categories (Games, Music, Podcasts) without schema changes

```prisma
model Item {
  id         String   @id @default(uuid())
  type       String   // MOVIE, SERIES, ANIME, BOOK, GAME, MUSIC...
  externalId String   // External API reference
  metadata   String   // Flexible JSON for category-specific data
}
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ installed
- **Git** installed

### Development Setup

```bash
# Clone the repository
git clone https://github.com/ultnexusdev/UltNexus.git
cd UltNexus

# Start the frontend
cd frontend
npm install
npm run dev
# → Open http://localhost:3000

# Start the backend (separate terminal)
cd backend
npm install
npm run start:dev
# → API runs on http://localhost:3000 (NestJS default)
```

### PowerShell Note (Windows)
If you encounter execution policy errors, run this once:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

---

## 🛠️ Tech Stack

| Layer        | Technology                     | Purpose                          |
|--------------|-------------------------------|----------------------------------|
| Frontend     | Next.js 16 + React 19        | Server-side rendering, routing   |
| Styling      | Tailwind CSS 4                | Utility-first styling            |
| Icons        | Lucide React                  | Modern icon library              |
| Backend      | NestJS 11                     | REST API, business logic         |
| ORM          | Prisma                        | Type-safe database access        |
| Database     | SQLite (dev) → PostgreSQL (prod) | Data persistence              |
| Hosting      | Hetzner (planned)             | Production server                |
| Version Control | Git + GitHub               | Code management & collaboration  |

---

## 🤝 Contributing

This is currently a private project under active development. Contribution guidelines will be published when the project reaches a public-ready state.

---

## 📄 License

Private — All rights reserved.

---

<p align="center">
  <strong>Built with ♥ for entertainment lovers worldwide.</strong>
</p>
