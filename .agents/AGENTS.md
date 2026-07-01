# 🤖 AI Agent Rules & Architecture Constraints

> [!IMPORTANT]
> YOU MUST STRICTLY ADHERE TO THESE RULES FOR EVERY CODE GENERATION, REFACTORING, OR MODIFICATION TASK. DO NOT VIOLATE THE ARCHITECTURAL BOUNDARIES DEFINED BELOW.

## 1. 🌐 Localization & Language Rule (CRITICAL)
- **Zero Hardcoded Text:** You are absolutely FORBIDDEN from hardcoding any user-facing strings, labels, logs, button texts, or email templates in Turkish or any language other than English.
- **Default Language:** The default and native language of this entire codebase is strictly **English**.
- **i18n Readiness:** All user-facing components must use a translation wrapper (e.g., `{t("key")}`). Dynamic feedback or validation errors must return a translation key (e.g., `VALIDATION.INVALID_EMAIL`) rather than raw text.
- **Türkçe Karakter Hassasiyeti:** Çeviri dosyalarında ve görünür arayüz metinlerinde Türkçe karakterler (ı, ş, ğ, ç, ö, ü) eksiksiz ve doğru kullanılmalıdır.

## 2. 🏗️ Content vs. User Data Separation
- **No Mixing:** External API data (TMDB, AniList, Google Books data like posters, descriptions, trailers) must NEVER be stored or mixed within the core user tables.
- **Referential Tracking:** Keep external data cached or reference it strictly by its external ID. User-generated data (ratings, comments, watchlists) must live separately in our own database tables, linking to items via unique identifiers.

## 3. 🎨 Theming & Styling Constraints
- **Tailwind CSS 4 & CSS Variables:** Do not hardcode hex, rgb, or hsl color values directly into Tailwind classes if they represent core theme elements. 
- **Centralized Tokens:** Use CSS custom properties (e.g., `var(--background)`, `var(--accent-primary)`) for all background colors, text colors, and branding elements to allow seamless dark/light or custom theme swapping.
- **Mobile-First Responsiveness:** Every single UI component generated must be fully responsive, visually optimized for mobile viewports, and adhere to a mobile-first design approach. Uygulama kullanıcıları arşivi sıklıkla mobilden yöneteceğinden menüler, butonlar ve formlar mobil ekranlarda taşmadan çalışmalıdır.
- **Mobil Akordiyon Kart Deseni:** Geniş veri tabloları (arşiv listeleri), mobil ekranlarda (`lg:hidden` ile) dikey akordiyon kart listelerine dönüştürülmelidir.
- **Dokunma Boyutları (Touch Targets):** Mobil ekranlardaki butonlar, kart başlıkları ve aksiyon alanları en az 44px boyutunda olmalı, parmakla kolay basılabilir spacing/padding değerlerine sahip olmalıdır.

## 4. 📊 Data Flexibility & Prisma Rules
- **Category-Agnostic Extensibility:** When writing queries or modifying the database layer, ensure the `Item` model treats categories abstractly. 
- **JSON Metadata:** Use the `metadata` JSON/String field for category-specific properties (e.g., page counts for books, episode numbers for anime) to avoid polluting the core schema.
- **Supported Types:** Always design models to support `MOVIE`, `SERIES`, `ANIME`, `BOOK`, and future expansions like `GAME` or `MUSIC` without requiring schema overhauls.
- **Veritabanı ve Kimlik Doğrulama:** Veritabanı işlemleri Prisma ORM üzerinden, Hetzner/Coolify üzerindeki PostgreSQL sunucusu kullanılarak yapılmalıdır. Supabase kullanılmayacaktır; kimlik doğrulama işlemleri (JWT vb.) kendi backend'imiz (NestJS) üzerinden yönetilmelidir.
- **Yumuşak Silme (Soft Delete):** Veritabanındaki arşiv veya profil dökümanları fiziksel olarak silinmemelidir. Yerine kayıtlara `isDeleted: true` (veya silinme durumu gösteren benzer bir) bayrağı eklenmeli ve tüm Prisma `findMany` sorgularında bu kayıtlar filtrelenmelidir.
- **Zaman Damgaları (Timestamps):** Eklenen veya güncellenen her veride `createdAt` ve `updatedAt` alanları standart olarak tutulmalı ve güncellenmelidir.

## 5. 🧱 Component Modularity
- **Reusable UI:** Ensure elements like content cards, carousels, lists, and modals are generic. A card component must work identically across all media types with consistent hover animations, glow effects, and responsive behaviors.

## 6. 🔒 Security Checklist for Code Generation
- Ensure all input endpoints implement strict sanitization against XSS and SQL injection.
- Use `class-validator` and DTOs in NestJS to drop unvalidated payload properties.
- Ensure passwords are handling through safe hashing pipelines (`bcrypt`) and never exposed or logged.
- **Kullanıcı Veri İzolasyonu (User Isolation):** Uygulama bir arşiv sitesi olduğu için, her kütüphane kaydı (film, kitap vb.) mutlaka ait olduğu kullanıcının ID'sini (`userId`) barındırmalıdır. Kullanıcıların, başkalarının arşiv verilerine erişimi backend (NestJS) tarafındaki kontroller ve Prisma sorgu filtreleri ile kesinlikle engellenmelidir.
- **Rol ve İzin Yönetimi:** Kullanıcı rolleri (Standart Üye, Admin vb.) veritabanından doğrulanmalı, kullanıcıların kendi rollerini yetkisiz şekilde değiştirmeleri backend API güvenlik katmanları (Guards) ile engellenmelidir.
- **Hata Yakalama:** Veritabanı ve API üzerinden yapılan tüm işlemler try-catch blokları ile sarılmalı, hatalar konsola raporlanırken son kullanıcıya anlaşılır ve temiz mesajlar gösterilmelidir.

## 7. 🛠️ TypeScript ve Kod Kalitesi
- **Sıfır Implicit "any" Politikası:** TypeScript dosyalarında hiçbir değişken/parametre örtülü `any` bırakılmamalıdır.
- **Şema Senkronizasyonu:** Veritabanı modelinde (`schema.prisma`) yapılan her değişiklik, UI tarafında kullanılan ortak türlerle (interface/type) senkronize edilmelidir.

## 8. 🤖 Ajan Davranış ve Değişiklik Kuralları
- **Önce Anla, Sonra Değiştir (Read-Modify-Write):** Dosyalarda değişiklik yapmadan önce mevcut yapıyı oku, gereksiz kod eklemekten kaçın.
- **Kapsam Sınırlarına Sadık Kal (Scope Ceilings):** İstenmeyen hiçbir ek özelliği, şemayı veya karmaşık animasyonu projeye dahil etme. Yalnızca istenen göreve odaklan.
- **Kısa, Odaklı Cevaplar (No Cumulative Responses) [KRİTİK]:** Her işlemden sonra geçmiş turların özetlerini birleştirerek devasa raporlar sunmaktan kaçın. Sadece son isteğe doğrudan, net ve sade cevap ver.
- **Türkçe İletişim [KRİTİK]:** Açıklamalarında ve iletişiminde kesinlikle Türkçe kullan. Kod içi değişkenler İngilizce kalabilir.

## 9. 📝 Oturum Özeti (Session State) Kuralı
- **Durum Takibi:** Ajan, projenin hangi aşamada olduğunu ve nelerin tamamlandığını unutmamak için kök dizindeki `STATE.md` dosyasını güncel tutmakla yükümlüdür.
- **Okuma:** Yeni bir sohbete/oturuma başlandığında ilk iş olarak `STATE.md` dosyası okunmalı ve bağlam (context) kurulmalıdır.
- **Güncelleme:** Önemli bir aşama geçildiğinde veya oturum sonlandırılırken, tamamlanan işlemler ve bir sonraki adım `STATE.md` içerisine kaydedilmelidir.
