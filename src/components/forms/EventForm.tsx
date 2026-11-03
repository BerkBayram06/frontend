import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Category } from "../../types/campus-event";
import type { EventFormData, EventFormErrors } from "../../types/EventFormData";
import { validateEvent } from "../../utils/validate-event";

interface EventFormProps {
  initialData: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}

const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

export function EventForm({ initialData, submitText, onSubmit }: EventFormProps) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEvent(data);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      onSubmit(data);
    }
  }

  return (
    <form className="form" noValidate onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Etkinlik Adı</label>
        <input
          id="title"
          name="title"
          type="text"
          value={data.title}
          onChange={handleChange}
          aria-invalid={errors.title ? true : undefined}
          placeholder="Etkinlik adını girin"
        />
        {errors.title && <span className="hata-metni">{errors.title}</span>}
      </div>

      <div>
        <label htmlFor="category">Kategori</label>
        <select
          id="category"
          name="category"
          value={data.category}
          onChange={handleChange}
          aria-invalid={errors.category ? true : undefined}
        >
          <option value="">Seçiniz</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && <span className="hata-metni">{errors.category}</span>}
      </div>

      <div>
        <label htmlFor="date">Tarih</label>
        <input
          id="date"
          name="date"
          type="date"
          value={data.date}
          onChange={handleChange}
          aria-invalid={errors.date ? true : undefined}
        />
        {errors.date && <span className="hata-metni">{errors.date}</span>}
      </div>

      <div>
        <label htmlFor="time">Saat</label>
        <input
          id="time"
          name="time"
          type="time"
          value={data.time}
          onChange={handleChange}
          aria-invalid={errors.time ? true : undefined}
        />
        {errors.time && <span className="hata-metni">{errors.time}</span>}
      </div>

      <div>
        <label htmlFor="location">Yer</label>
        <input
          id="location"
          name="location"
          type="text"
          value={data.location}
          onChange={handleChange}
          aria-invalid={errors.location ? true : undefined}
          placeholder="Yer veya salon adı"
        />
        {errors.location && <span className="hata-metni">{errors.location}</span>}
      </div>

      <div>
        <label htmlFor="capacity">Kontenjan</label>
        <input
          id="capacity"
          name="capacity"
          type="number"
          value={data.capacity}
          onChange={handleChange}
          aria-invalid={errors.capacity ? true : undefined}
          placeholder="1 - 1000"
        />
        {errors.capacity && <span className="hata-metni">{errors.capacity}</span>}
      </div>

      <div>
        <label htmlFor="description">Açıklama</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={data.description}
          onChange={handleChange}
          aria-invalid={errors.description ? true : undefined}
          placeholder="Etkinlik açıklaması (en az 10 karakter)"
        />
        {errors.description && (
          <span className="hata-metni">{errors.description}</span>
        )}
      </div>

      <button type="submit" className="buton">
        {submitText}
      </button>
    </form>
  );
}

export default EventForm;
