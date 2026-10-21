import { useState, useEffect } from "react";
import type { CampusEvent, Category, PageName } from "../../types/campus-event";

interface FormErrors {
  title?: string;
  category?: string;
  date?: string;
  time?: string;
  location?: string;
  capacity?: string;
}

interface EventFormProps {
  page: PageName;
  selectedId: string | null;
  selectedEvent?: CampusEvent;
  onSubmitSuccess: (event: CampusEvent) => void;
  onNavigate: (next: PageName) => void;
}

const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

export function EventForm({
  page,
  selectedId,
  selectedEvent,
  onSubmitSuccess,
  onNavigate
}: EventFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "" as Category | "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    description: "",
    image: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitResult, setSubmitResult] = useState<CampusEvent | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (page === "update" && selectedEvent) {
      setFormData({
        title: selectedEvent.title,
        category: selectedEvent.category,
        date: selectedEvent.date,
        time: selectedEvent.time,
        location: selectedEvent.location,
        capacity: String(selectedEvent.capacity),
        description: selectedEvent.description,
        image: selectedEvent.image || ""
      });
    } else {
      setFormData({
        title: "",
        category: "",
        date: "",
        time: "",
        location: "",
        capacity: "",
        description: "",
        image: ""
      });
    }
  }, [page, selectedEvent]);

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitResult(null);

    const newErrors: FormErrors = {};
    if (formData.title.trim().length < 3) newErrors.title = "Etkinlik adı en az 3 karakter olmalı.";
    if (!formData.category) newErrors.category = "Lütfen bir kategori seçiniz.";
    if (!formData.date) newErrors.date = "Tarih alanı boş bırakılamaz.";
    if (!formData.time) newErrors.time = "Saat alanı boş bırakılamaz.";
    if (!formData.location.trim()) newErrors.location = "Yer alanı boş bırakılamaz.";
    const capNum = Number(formData.capacity);
    if (!formData.capacity || isNaN(capNum) || capNum < 1 || capNum > 1000) {
      newErrors.capacity = "Kontenjan 1 ile 1000 arasında bir sayı olmalıdır.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    const payload: CampusEvent = {
      id: page === "update" && selectedId ? selectedId : `event-${Date.now()}`,
      title: formData.title.trim(),
      category: formData.category as Category,
      date: formData.date,
      time: formData.time,
      location: formData.location.trim(),
      capacity: capNum,
      description: formData.description.trim(),
      image: formData.image.trim() || undefined
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onSubmitSuccess(payload);
      setSubmitResult(payload);
    } catch {
      alert("İşlem sırasında bir hata oluştu.");
    } finally {
      setSubmitting(false);
    }
  }

  if (page === "update" && !selectedEvent) {
    return (
      <div className="hata-kutusu">
        <h2>Geçersiz Bağlantı!</h2>
        <p>Güncellenecek etkinlik bulunamadı. Lütfen bir etkinlik seçiniz.</p>
        <button type="button" className="buton-link" style={{ marginTop: "1rem" }} onClick={() => onNavigate("events")}>
          Etkinliklere git
        </button>
      </div>
    );
  }

  return (
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
          <input id="title" name="title" type="text" maxLength={80} placeholder="Etkinlik adını girin" value={formData.title} onChange={handleInputChange} aria-invalid={errors.title ? "true" : undefined} />
          {errors.title && <span className="hata-alani">{errors.title}</span>}
        </div>

        <div>
          <label htmlFor="category">Kategori</label>
          <select id="category" name="category" value={formData.category} onChange={handleInputChange} aria-invalid={errors.category ? "true" : undefined}>
            <option value="">Seçiniz ▾</option>
            {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
          {errors.category && <span className="hata-alani">{errors.category}</span>}
        </div>

        <div>
          <label htmlFor="date">Tarih</label>
          <input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} aria-invalid={errors.date ? "true" : undefined} />
          {errors.date && <span className="hata-alani">{errors.date}</span>}
        </div>

        <div>
          <label htmlFor="time">Saat</label>
          <input id="time" name="time" type="time" value={formData.time} onChange={handleInputChange} aria-invalid={errors.time ? "true" : undefined} />
          {errors.time && <span className="hata-alani">{errors.time}</span>}
        </div>

        <div>
          <label htmlFor="location">Yer</label>
          <input id="location" name="location" type="text" placeholder="Örn: A Blok Salon" value={formData.location} onChange={handleInputChange} aria-invalid={errors.location ? "true" : undefined} />
          {errors.location && <span className="hata-alani">{errors.location}</span>}
        </div>

        <div>
          <label htmlFor="capacity">Kontenjan (1-1000)</label>
          <input id="capacity" name="capacity" type="number" placeholder="Örn: 100" value={formData.capacity} onChange={handleInputChange} aria-invalid={errors.capacity ? "true" : undefined} />
          {errors.capacity && <span className="hata-alani">{errors.capacity}</span>}
        </div>

        <div>
          <label htmlFor="image">Afiş Görseli URL (İsteğe bağlı)</label>
          <input id="image" name="image" type="text" placeholder="Örn: /afis.svg veya https://..." value={formData.image} onChange={handleInputChange} />
        </div>

        <div>
          <label htmlFor="description">Açıklama</label>
          <textarea id="description" name="description" rows={4} placeholder="Açıklama giriniz" value={formData.description} onChange={handleInputChange} />
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Gönderiliyor..." : page === "add" ? "Kaydet" : "Güncelle"}
        </button>
      </form>
    </>
  );
}