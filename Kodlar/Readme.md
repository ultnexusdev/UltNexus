\# PROJECT: UltNexus (Digital Life OS)

\*\*Vision:\*\* Unified tracking/community platform for all digital consumption.

\*\*MVP Scope:\*\* Movies, TV Shows, Books, Anime. (Games, Music etc. later).



\## ARCHITECTURE

\- \*\*Pattern:\*\* Modular Monolith (DDD approach).

\- \*\*Communication:\*\* Event-Driven (Event Bus for module decoupling).

\- \*\*API:\*\* BFF (Backend for Frontend) pattern.



\## TECH STACK

\- \*\*Frontend:\*\* Next.js (App Router), TailwindCSS, TypeScript (SEO \& PLG focus).

\- \*\*Backend:\*\* NestJS (Node.js/TS).

\- \*\*DB \& Cache:\*\* PostgreSQL, Redis (Rate limiting, caching).

\- \*\*AI \& Vector:\*\* OpenAI API, Pinecone/Qdrant.

\- \*\*Hosting:\*\* Vercel (FE), Render/Railway (BE+DB).



\## DATABASE SCHEMA (Flexible/Polymorphic)

\- `Users`: id, username, tier (free/pro).

\- `Items`: id (UUID), type (Enum: MOVIE, TV, BOOK, ANIME), external\_id, metadata (JSONB - stores category-specific data).

\- `User\\\\\\\_Items`: user\_id, item\_id, status (COMPLETED, IN\_PROGRESS, etc.), progress (int), rating.

\- `Collections` \& `Activities` (Social feed).



\## API STRATEGY (Adapter Pattern)

\- \*\*Providers:\*\* TMDB (Movies/TV), Jikan/AniList (Anime), OpenLibrary (Books).

\- \*\*Rule:\*\* Never couple directly to external APIs. Use `IContentProvider` interface. Fetch -> Normalize to JSONB -> Save to local DB -> Serve to client.



\## AI STRATEGY

\- Cross-category recommendations using RAG.

\- Generate "User Taste Embeddings" based on highly rated items -> Vector search (Cosine Similarity) -> LLM natural language output.



\## BUSINESS \& PLG

\- \*\*Monetization:\*\* Freemium SaaS. Free (basic limits), Pro (unlimited lists, advanced AI, exports).

\- \*\*Growth:\*\* SEO-indexed public lists, shareable "Wrapped" stats, CSV imports from Letterboxd/Goodreads.

