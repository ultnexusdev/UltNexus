# Projenin Güncel Durum Özeti (Session State)

*Bu dosya, yapay zeka ajanının her oturum sonunda projede nerede kalındığını hatırlaması için otomatik olarak güncellenir.*

## 📌 Mevcut Aşama: Auth Güvenliği ve Gelişmiş Kurallar
- **Veritabanı ve Altyapı:** Hetzner üzerinde Coolify ile kurulan PostgreSQL sunucusuna geçiş yapıldı. Prisma ayarları buna göre güncellendi.
- **Kimlik Doğrulama (Auth) İyileştirmeleri:** 
  - `ForbiddenUsername` (yasaklı kelimeler tablosu) silinip, doğrudan **PostgreSQL CHECK Constraint** içerisine eklendi. Regex güncellendi (`A-Za-z0-9_.`), böylece büyük/küçük harf kullanımına izin verildi fakat `LOWER()` indexleri ile case-insensitive Unique çakışmaları engellendi.
  - Sadece E-posta ile değil, **Kullanıcı Adı (Username) ile Giriş** imkanı da eklendi (Frontend input type'ı dinamik olarak text/email değiştirildi, LoginDto esnetildi).
  - NestJS `@nestjs/throttler` kütüphanesi ile "Doğrulama E-postasını Tekrar Gönder" (resend-verification) servisine **Rate Limiting** (60 sn / 1 istek) eklendi.
- **Güvenlik ve Middleware:**
  - Sosyal hesaplarla giren kişilerin veya profili eksik olanların `isProfileCompleted: false` bayrağı ile JWT Payload üzerinden takip edilmesi sağlandı.
  - Next.js kök dizininde `middleware.ts` kullanılarak `isProfileCompleted === false` olan kullanıcıların uygulama içerisindeki korumalı rotalara erişimi engellendi ve zorunlu olarak `/set-username` sayfasına kilitlendiler.

## 🔜 Bir Sonraki Adım (Sıradaki Görevler)
- Artık Auth/Login/Register ve Güvenlik adımları kusursuz tamamlandığı için ana odak **Kütüphane / Arşiv ekranlarının tasarımı ve inşa edilmesi** olacak.
- Medya türleri (Film, Dizi, Anime, Kitap vb.) için `Card` ve `List` komponentlerinin oluşturulması.
- Mobil uyumlu (Mobile-first) akordiyon listeler, modern typography ve dark mode ağırlıklı premium UI inşası.
- TMDB (Diziler), Jikan (Anime) veya Google Books API entegrasyonlarına tam erişimle devam edilmesi.
