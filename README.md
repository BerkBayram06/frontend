# Kampüs Etkinlikleri — Sprint 6 + Vize 

Web Teknolojileri ve Programlama Dersi — **Sprint 6 + Vize** Teslim Projesi.

## Öğrenci Bilgileri
- **Ad Soyad:** Hamza Berk Bayram
- **Öğrenci Numarası:** 2311012828
- **GitHub Repository:** [https://github.com/BerkBayram06/frontend](https://github.com/BerkBayram06/frontend)
- **Canlı Vercel Yayını:** [https://hamzaberkbayram-frontend.vercel.app](https://hamzaberkbayram-frontend.vercel.app) *(veya Vercel Proje Adresi)*

---

## Proje Hakkında (Sprint 6 Özeti)

Bu sprintte Sprint 5'ten devralınan tek sayfalı (SPA) yapı, **React Router v7** ve **React Context API** kullanılarak çok sayfalı, durum yönetimli ve doğrulamalı modern bir mimariye dönüştürülmüştür.

### Temel Yenilikler ve Mimari:
1. **React Router Entegrasyonu:** Eski callback tabanlı sayfa state'i kaldırılarak 10 adet adres tanımlandı.
2. **React Context API (`EventsContext`):** Etkinliklerin durumu merkezi olarak yönetilir; Ekleme, Güncelleme, Silme işlemleri anında tüm sayfalara (Ana Sayfa, Etkinlikler, Yönetim) yansır.
3. **EventForm ve Doğrulama (`validateEvent`):** React kontrollü form mimarisi, 7 adet katı doğrulama kuralı ve erişilebilir hata bildirimleri (`aria-invalid`, `.hata-metni`).
4. **Yönetim Paneli (`AdminPage`):** Masaüstünde tablo, mobilde duyarlı (responsive) kart görünümü; silme öncesi `window.confirm` onayı.
5. **Giriş ve Kayıt Sayfaları (`LoginPage`, `RegisterPage`, `ForgotPasswordPage`):** Kontrollü formlar, format ve şifre eşleşme doğrulamaları.
6. **Duyarlı (Responsive) Tasarım:** 360–390 px ve üstü ekranlarda yatay taşma olmadan tam mobil uyum ve öğrenci numarasına dayalı renk paleti (`--no: 2311012828;`).

---

## 10 Route Haritası

| Adres | Sayfa Bileşeni | Açıklama |
|---|---|---|
| `/` | `HomePage` | Yaklaşan 2 etkinlik ve hızlı bağlantılar |
| `/events` | `EventsPage` | Arama ve kategori filtreli tüm etkinlikler |
| `/events/:id` | `EventDetailPage` | Dinamik ID parametreli etkinlik detay sayfası |
| `/admin` | `AdminPage` | Etkinlik listesi tablosu, düzenleme ve onaylı silme |
| `/admin/new` | `AddEventPage` | Yeni etkinlik ekleme formu |
| `/admin/:id/edit` | `EditEventPage` | Etkinlik güncelleme formu |
| `/login` | `LoginPage` | Kontrollü giriş formu |
| `/register` | `RegisterPage` | Kontrollü kayıt formu (şifre tekrar kontrolü) |
| `/forgot-password` | `ForgotPasswordPage` | Şifre sıfırlama talep formu (demo) |
| `*` | `NotFoundPage` | 404 Sayfa bulunamadı ekranı |

---

## Proje Klasör Yapısı

```text
frontend/
  src/
    components/
      layout/
        Header.tsx
        Navigation.tsx
        Footer.tsx
      events/
        EventCard.tsx
        EventList.tsx
        EventFilter.tsx
        EventDetail.tsx
      forms/
        EventForm.tsx
    context/
      EventsContext.tsx
    pages/
      HomePage.tsx
      EventsPage.tsx
      EventDetailPage.tsx
      AdminPage.tsx
      AddEventPage.tsx
      EditEventPage.tsx
      LoginPage.tsx
      RegisterPage.tsx
      ForgotPasswordPage.tsx
      NotFoundPage.tsx
    data/
      events.ts
    types/
      campus-event.ts
      EventFormData.ts
    utils/
      filter-events.ts
      format-date.ts
      validate-event.ts
    App.tsx
    App.css
    index.css
    main.tsx
  vercel.json
  package.json
  tsconfig.json
  vite.config.ts
```

---

## Kurulum ve Çalıştırma

### Gereksinimler
- Node.js (v18 veya üzeri)
- npm

### 1. Bağımlılıkları Yükleme
```bash
npm install
```

### 2. Geliştirme Sunucusunu Başlatma
```bash
npm run dev
```

### 3. Üretim Derlemesi (Build)
```bash
npm run build
```

### 4. Derleme Önizleme (Preview)
```bash
npm run preview
```

---

# Kampüs Etkinlikleri — Sprint 7 (Node + Express REST API)

Web Teknolojileri ve Programlama Dersi — **Sprint 7** Teslim Projesi.

Bu sprintte mevcut React + Vite + TypeScript frontend yapısı korunmuş; repo köküne veri sağlayan bağımsız bir Node.js + Express REST API (`backend/`) mimarisi eklenmiştir.

## Sprint 7 Mimarisi

```text
frontend/  → React + Vite · http://localhost:5173 · Bu sprintte değişmedi
backend/   → Node + Express · http://localhost:3000 · Yeni REST API servisi (in-memory)
```

### Backend Ne İşe Yarar?
Backend, kampüs etkinlikleri verisini yönetmek ve istemcilere sunmak üzere tasarlanmış RESTful bir API servisidir:
- **`GET /health`:** API durumunu ve öğrenci numarasını (`2311012828`) doğrular.
- **`GET /events`:** Bellek içi etkinlik listesini döndürür (`?category=...` filtresi destekler).
- **`GET /events/:id`:** Belirli bir etkinliğin detayını döndürür (bulunamadığında 404).
- **`POST /events`:** Doğrulama kurallarından geçen yeni etkinliği ekler (201 döner; eksik veride 400).

Ayrıntılı REST sözleşmesi, mimari detaylar ve Postman koleksiyonu için [backend/README.md](backend/README.md) dosyasını inceleyebilirsiniz.

### Backend Kurulum ve Çalıştırma

```bash
cd backend
npm install
npm run dev
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışmaya başlar.

