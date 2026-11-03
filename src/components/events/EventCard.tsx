import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="kart">
      <h3>{event.title}</h3>
      <span className="kategori-etiket">{event.category}</span>
      <p><strong>Tarih:</strong> {formatDate(event.date)}, {event.time}</p>
      <p><strong>Yer:</strong> {event.location}</p>
      <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
      <p className="kart-aciklama">{event.description}</p>
      <Link
        to={`/events/${event.id}`}
        className="detay-link-btn"
      >
        Detayları gör
      </Link>
    </article>
  );
}

export default EventCard;
