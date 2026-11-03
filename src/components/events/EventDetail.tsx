import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
}

export function EventDetail({ event }: EventDetailProps) {
  const imageUrl =
    event.image && event.image.trim() !== ""
      ? event.image
      : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop";

  return (
    <article className="detay-kart">
      <h2>{event.title}</h2>

      <figure style={{ margin: "1rem 0" }}>
        <img
          src={imageUrl}
          alt={event.title}
          style={{
            maxWidth: "100%",
            height: "auto",
            maxHeight: "350px",
            objectFit: "cover",
            borderRadius: "8px"
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop";
          }}
        />
        <figcaption style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.4rem" }}>
          Şekil 1: Etkinlik afişi
        </figcaption>
      </figure>

      <div className="detay-bilgi">
        <p><strong>Tarih:</strong> {formatDate(event.date)}, {event.time}</p>
        <p><strong>Yer:</strong> {event.location}</p>
        <p><strong>Kategori:</strong> {event.category}</p>
        <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
      </div>

      <p className="detay-aciklama" style={{ margin: "1.5rem 0" }}>
        {event.description}
      </p>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
        <Link
          to={`/admin/${event.id}/edit`}
          className="buton-link"
          style={{ textDecoration: "none" }}
        >
          Bu etkinliği güncelle
        </Link>

        <Link
          to="/events"
          className="link-vurgu-btn"
          style={{ textDecoration: "none" }}
        >
          ← Listeye dön
        </Link>
      </div>
    </article>
  );
}

export default EventDetail;
