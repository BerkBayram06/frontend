import { useState, useEffect } from "react";
import "./App.css";
import type { CampusEvent, Category, PageName } from "./types/campus-event";
import { events } from "./data/events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

function formatDate(dateStr: string): string {
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  }
  return dateStr;
}

interface FormErrors {
  title?: string;
  category?: string;
  date?: string;
  time?: string;
  location?: string;
  capacity?: string;
}

export default function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  // Form State'leri
  const [formData, setFormData] = useState({
    title: "",
    category: "" as Category | "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    description: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitResult, setSubmitResult] = useState<CampusEvent | null>(null);

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    setErrors({});
    setSubmitResult(null);

    // Güncelleme moduna geçildiyse formu etkinliğin bilgileriyle doldur
    if (next === "update" && id) {
      const target = findEventById(events, id);
      if (target) {
        setFormData({
          title: target.title,
          category: target.category,
          date: target.date,
          time: target.time,
          location: target.location,
          capacity: String(target.capacity),
          description: target.description
        });
      }
    } else if (next === "add") {
      setFormData({
        title: "",
        category: "",
        date: "",
        time: "",
        location: "",
        capacity: "",
        description: ""
      });
    }
  }

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  useEffect(() => {
    let title = "Ana Sayfa";
    if (page === "events") title = "Tüm Etkinlikler";
    else if (page === "add") title = "Etkinlik Ekle";
    else if (page === "update") title = "Etkinlik Güncelle";
    else if (page === "detail") title = selected ? selected.title : "Etkinlik Detayı";

    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [page, selected]);

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const filtered = filterByCategory(searchEvents(events, searchText), selectedCategory);
  const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitResult(null);

    const newErrors: FormErrors = {};

    if (formData.title.trim().length < 3) {
      newErrors.title = "Etkinlik adı en az 3 karakter olmalı.";
    }
    if (!formData.category) {
      newErrors.category = "Lütfen bir kategori seçiniz.";
    }
    if (!formData.date) {
      newErrors.date = "Tarih alanı boş bırakılamaz.";
    }
    if (!formData.time) {
      newErrors.time = "Saat alanı boş bırakılamaz.";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Yer alanı boş bırakılamaz.";
    }
    const capNum = Number(formData.capacity);
    if (!formData.capacity || isNaN(capNum) || capNum < 1 || capNum > 1000) {
      newErrors.capacity = "Kontenjan 1 ile 1000 arasında bir sayı olmalıdır.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Başarılı durum
    setErrors({});
    const finalData: CampusEvent = {
      id: page === "update" && selectedId ? selectedId : `event-${Date.now()}`,
      title: formData.title.trim(),
      category: formData.category as Category,
      date: formData.date,
      time: formData.time,
      location: formData.location.trim(),
      capacity: capNum,
      description: formData.description.trim()
    };
    setSubmitResult(finalData);
  }

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <span className="kategori-etiket">{event.category}</span>
        <p><strong>Tarih:</strong> {formatDate(event.date)}, {event.time}</p>
        <p><strong>Yer:</strong> {event.location}</p>
        <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
        <p className="kart-aciklama">{event.description}</p>
        <button
          type="button"
          className="detay-link-btn"
          onClick={() => go("detail", event.id)}
        >
          Detayları gör
        </button>
      </article>
    );
  }

  return (
    <>
      <header>
        <h1>Kampüs Etkinlikleri</h1>
        <nav>
          <ul>
            <li>
              <a
                href="#home"
                aria-current={page === "home" ? "page" : undefined}
                onClick={(e) => { e.preventDefault(); go("home"); }}
              >
                Ana Sayfa
              </a>
            </li>
            <li>
              <a
                href="#events"
                aria-current={page === "events" ? "page" : undefined}
                onClick={(e) => { e.preventDefault(); go("events"); }}
              >
                Etkinlikler
              </a>
            </li>
            <li>
              <a
                href="#add"
                aria-current={page === "add" ? "page" : undefined}
                onClick={(e) => { e.preventDefault(); go("add"); }}
              >
                Ekle
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {/* ANA SAYFA */}
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <section className="etkinlik-listesi">
              {upcoming.map(renderCard)}
            </section>
            <div style={{ marginTop: "1.5rem" }}>
              <button
                type="button"
                className="buton-link"
                onClick={() => go("events")}
              >
                Tüm etkinlikleri gör
              </button>
            </div>
          </>
        )}

        {/* ETKİNLİKLER LİSTESİ */}
        {page === "events" && (
          <>
            <h2>Tüm Etkinlikler</h2>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  id="arama"
                  type="search"
                  placeholder="atölye, kariyer..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </form>

            <p id="sonuc">
              {filtered.length === 0
                ? "Aradığınız kriterlere uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <section className="etkinlik-listesi">
              {filtered.map(renderCard)}
            </section>
          </>
        )}

        {/* DETAY SAYFASI */}
        {page === "detail" && (
          <>
            {!selected ? (
              <div className="hata-kutusu">
                <h2>Etkinlik bulunamadı!</h2>
                <p>Aradığınız etkinlik bulunamadı veya geçersiz bir seçim yaptınız.</p>
                <button
                  type="button"
                  className="link-vurgu-btn"
                  onClick={() => go("events")}
                >
                  ← Listeye dön
                </button>
              </div>
            ) : (
              <article className="detay-kart">
                <h2>{selected.title}</h2>
                <div className="detay-kapsayici">
                  {selected.image && (
                    <figure>
                      <img src={selected.image} alt={selected.title} />
                      <figcaption>Şekil 1: Etkinlik afişi</figcaption>
                    </figure>
                  )}

                  <dl>
                    <dt>Tarih</dt>
                    <dd>{formatDate(selected.date)}, {selected.time}</dd>

                    <dt>Yer</dt>
                    <dd>{selected.location}</dd>

                    <dt>Kategori</dt>
                    <dd>{selected.category}</dd>

                    <dt>Kontenjan</dt>
                    <dd>{selected.capacity} kişi</dd>
                  </dl>
                </div>

                <p className="aciklama-metin">{selected.description}</p>

                <div className="detay-butonlar">
                  <button
                    type="button"
                    className="buton-link"
                    onClick={() => go("update", selected.id)}
                  >
                    Bu etkinliği güncelle
                  </button>
                  <button
                    type="button"
                    className="link-vurgu-btn"
                    onClick={() => go("events")}
                  >
                    ← Listeye dön
                  </button>
                </div>
              </article>
            )}
          </>
        )}

        {/* EKLE VE GÜNCELLEME SAYFASI */}
        {(page === "add" || page === "update") && (
          <>
            {page === "update" && !selected ? (
              <div className="hata-kutusu">
                <h2>Geçersiz Bağlantı!</h2>
                <p>Güncellenecek etkinlik bulunamadı. Lütfen bir etkinlik seçiniz.</p>
                <button
                  type="button"
                  className="buton-link"
                  style={{ marginTop: "1rem" }}
                  onClick={() => go("events")}
                >
                  Etkinliklere git
                </button>
              </div>
            ) : (
              <>
                <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>

                {Object.keys(errors).length > 0 && (
                  <div className="hata-kutusu" style={{ marginBottom: "1rem" }}>
                    Formda hatalı veya eksik alanlar var. Lütfen kontrol ediniz.
                  </div>
                )}

                {submitResult && (
                  <div className="basari-kutusu" style={{ marginBottom: "1rem" }}>
                    <p><strong>{page === "update" ? "Etkinlik başarıyla güncellendi!" : "Etkinlik başarıyla eklendi!"}</strong></p>
                    <pre>{JSON.stringify(submitResult, null, 2)}</pre>
                  </div>
                )}

                <form className="form" noValidate onSubmit={handleFormSubmit}>
                  <div>
                    <label htmlFor="title">Etkinlik Adı</label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      maxLength={80}
                      placeholder="Etkinlik adını girin"
                      value={formData.title}
                      onChange={handleInputChange}
                      aria-invalid={errors.title ? "true" : undefined}
                    />
                    {errors.title && <span className="hata-alani">{errors.title}</span>}
                  </div>

                  <div>
                    <label htmlFor="category">Kategori</label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      aria-invalid={errors.category ? "true" : undefined}
                    >
                      <option value="">Seçiniz ▾</option>
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    {errors.category && <span className="hata-alani">{errors.category}</span>}
                  </div>

                  <div>
                    <label htmlFor="date">Tarih</label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      aria-invalid={errors.date ? "true" : undefined}
                    />
                    {errors.date && <span className="hata-alani">{errors.date}</span>}
                  </div>

                  <div>
                    <label htmlFor="time">Saat</label>
                    <input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      aria-invalid={errors.time ? "true" : undefined}
                    />
                    {errors.time && <span className="hata-alani">{errors.time}</span>}
                  </div>

                  <div>
                    <label htmlFor="location">Yer</label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="Örn: A Blok Salon"
                      value={formData.location}
                      onChange={handleInputChange}
                      aria-invalid={errors.location ? "true" : undefined}
                    />
                    {errors.location && <span className="hata-alani">{errors.location}</span>}
                  </div>

                  <div>
                    <label htmlFor="capacity">Kontenjan (1-1000)</label>
                    <input
                      id="capacity"
                      name="capacity"
                      type="number"
                      placeholder="Örn: 100"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      aria-invalid={errors.capacity ? "true" : undefined}
                    />
                    {errors.capacity && <span className="hata-alani">{errors.capacity}</span>}
                  </div>

                  <div>
                    <label htmlFor="description">Açıklama</label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      placeholder="Açıklama giriniz"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button type="submit">
                    {page === "add" ? "Kaydet" : "Güncelle"}
                  </button>
                </form>
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}