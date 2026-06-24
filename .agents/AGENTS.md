# 🤖 AI Agent Rules & Architecture Constraints

> [!IMPORTANT]
> YOU MUST STRICTLY ADHERE TO THESE RULES FOR EVERY CODE GENERATION, REFACTORING, OR MODIFICATION TASK. DO NOT VIOLATE THE ARCHITECTURAL BOUNDARIES DEFINED BELOW.

## 1. 🌐 Localization & Language Rule (CRITICAL)
- **Zero Hardcoded Text:** You are absolutely FORBIDDEN from hardcoding any user-facing strings, labels, logs, button texts, or email templates in Turkish or any language other than English.
- **Default Language:** The default and native language of this entire codebase is strictly **English**.
- **i18n Readiness:** All user-facing components must use a translation wrapper (e.g., `{t("key")}`). Dynamic feedback or validation errors must return a translation key (e.g., `VALIDATION.INVALID_EMAIL`) rather than raw text.

## 2. 🏗️ Content vs. User Data Separation
- **No Mixing:** External API data (TMDB, AniList, Google Books data like posters, descriptions, trailers) must NEVER be stored or mixed within the core user tables.
- **Referential Tracking:** Keep external data cached or reference it strictly by its external ID. User-generated data (ratings, comments, watchlists) must live separately in our own database tables, linking to items via unique identifiers.

## 3. 🎨 Theming & Styling Constraints
- **Tailwind CSS 4 & CSS Variables:** Do not hardcode hex, rgb, or hsl color values directly into Tailwind classes if they represent core theme elements. 
- **Centralized Tokens:** Use CSS custom properties (e.g., `var(--background)`, `var(--accent-primary)`) for all background colors, text colors, and branding elements to allow seamless dark/light or custom theme swapping.
- **Mobile-First Responsiveness:** Every single UI component generated must be fully responsive, visually optimized for mobile viewports, and adhere to a mobile-first design approach.

## 4. 📊 Data Flexibility & Prisma Rules
- **Category-Agnostic Extensibility:** When writing queries or modifying the database layer, ensure the `Item` model treats categories abstractly. 
- **JSON Metadata:** Use the `metadata` JSON/String field for category-specific properties (e.g., page counts for books, episode numbers for anime) to avoid polluting the core schema.
- **Supported Types:** Always design models to support `MOVIE`, `SERIES`, `ANIME`, `BOOK`, and future expansions like `GAME` or `MUSIC` without requiring schema overhauls.

## 5. 🧱 Component Modularity
- **Reusable UI:** Ensure elements like content cards, carousels, lists, and modals are generic. A card component must work identically across all media types with consistent hover animations, glow effects, and responsive behaviors.

## 6. 🔒 Security Checklist for Code Generation
- Ensure all input endpoints implement strict sanitization against XSS and SQL injection.
- Use `class-validator` and DTOs in NestJS to drop unvalidated payload properties.
- Ensure passwords are handling through safe hashing pipelines (`bcrypt`) and never exposed or logged.
