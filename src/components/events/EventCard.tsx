import type { CampusEvent } from "../../types/campus-event";

function formatDate(dateStr: string): string {
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  }
  return dateStr;
}

interface EventCardProps {
  event: CampusEvent;
  onSelect: (id: string) => void;
}

export function EventCard({ event, onSelect }: EventCardProps) {
  return (
    <article className="kart">
      <h3>{event.title}</h3>
      <span className="kategori-etiket">{event.category}</span>
      <p><strong>Tarih:</strong> {formatDate(event.date)}, {event.time}</p>
      <p><strong>Yer:</strong> {event.location}</p>
      <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
      <p className="kart-aciklama">{event.description}</p>
      <button
        type="button"
        className="detay-link-btn"
        onClick={() => onSelect(event.id)}
      >
        Detayları gör
      </button>
    </article>
  );
}