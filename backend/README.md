# Kampüs Etkinlikleri — Backend REST API (Sprint 7)

Bu proje, Web Teknolojileri ve Programlama dersi **Sprint 7** kapsamında geliştirilen Node.js + Express tabanlı REST API sunucusudur.

## Öğrenci Bilgileri
- **Ad Soyad:** Hamza Berk Bayram
- **Öğrenci Numarası:** 2311012828

---

## Mimari ve Dosya Yapısı

Bütün kodun tek `server.js` dosyasında toplanmaması için sorumluluklar katmanlara ayrılmıştır:

```text
backend/
  src/
    app.js                  # Express uygulaması, middleware'ler (cors, json), route bağlama, 404 yönetimi
    server.js               # Ortam değişkenleri (.env), HTTP sunucu başlatma ve port dinleme
    routes/
      event-routes.js       # /events endpoint yönlendirmeleri
    controllers/
      event-controller.js   # İstek işleme, doğrulama ve yanıt döndürme mantığı
    data/
      events.js             # Bellek içi (in-memory) özgün etkinlik veri dizisi
  requests/
    kampus-api.json         # Postman Collection v2.1 test koleksiyonu (6 standart istek)
  .env                      # Yerel ortam değişkenleri (Git'e gitmez)
  .env.example              # Örnek ortam değişkenleri şablonu
  .gitignore                # node_modules ve .env dosyalarını yok sayma kuralları
  package.json              # Paket bağımlılıkları ve npm betikleri
  README.md                 # Backend dokümantasyonu
```

---

## Kurulum ve Çalıştırma

### 1. Bağımlılıkları Yükleme
```bash
cd backend
npm install
```

### 2. Ortam Değişkeni (.env) Ayarı
`.env.example` dosyasını `.env` olarak kopyalayın:
```bash
cp .env.example .env
```
Varsayılan yapılandırma:
```env
PORT=3000
```
Sunucu, ortam değişkenlerinde `PORT` tanımlıysa o portu, tanımlı değilse varsayılan `3000` portunu kullanır.

### 3. Geliştirme Sunucusunu Başlatma (Hot-Reload / Watch)
Node.js 18+ yerel `--watch` mekanizması ile:
```bash
npm run dev
```

### 4. Üretim Modunda Başlatma
```bash
npm start
```

---

## REST Sözleşmesi

| Yöntem (Method) | Uç Nokta (Endpoint) | Amaç | Başarılı Yanıt | Hata Yanıtı | Durum |
|---|---|---|---|---|---|
| GET | `/health` | Sistem ve öğrenci sağlık kontrolü | `200 OK` | — | Bu sprint (Sprint 7) |
| GET | `/events` | Tüm etkinlik listesi (isteğe bağlı `?category=...`) | `200 OK` | — | Bu sprint (Sprint 7) |
| GET | `/events/:id` | Belirtilen ID'ye sahip tek etkinlik detayı | `200 OK` | `404 Not Found` | Bu sprint (Sprint 7) |
| POST | `/events` | Yeni etkinlik oluşturma | `201 Created` | `400 Bad Request` | Bu sprint (Sprint 7) |
| PATCH | `/events/:id` | Etkinlik güncelleme | `200 OK` | `400, 404` | Sprint 9 |
| DELETE | `/events/:id` | Etkinlik silme | `204 No Content` | `404` | Sprint 9 |

### Hata Yanıt Biçimi
Tüm hata yanıtları standart JSON şemasına uygundur:
```json
{
  "error": {
    "message": "Hata açıklaması"
  }
}
```

---

## Postman ile Test
`backend/requests/kampus-api.json` koleksiyonu Postman v2.1 şemasına uygun olarak hazırlanmıştır. Postman içerisine import edilerek 6 temel istek test edilebilir:
1. `1 Health` (GET /health)
2. `2 Etkinlik listesi` (GET /events)
3. `3 Tek etkinlik` (GET /events/event-2)
4. `4 Olmayan etkinlik (404)` (GET /events/yok)
5. `5 Etkinlik oluştur (201)` (POST /events)
6. `6 Eksik veri (400)` (POST /events)
