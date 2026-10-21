import type { CampusEvent, PageName } from "../../types/campus-event";

interface EventDetailProps {
  selected?: CampusEvent;
  onNavigate: (next: PageName, id?: string | null) => void;
}

export function EventDetail({ selected, onNavigate }: EventDetailProps) {
  if (!selected) {
    return (
      <div className="hata-kutusu">
        <h2>Etkinlik Bulunamadı!</h2>
        <p>Aradığınız etkinlik mevcut değil veya kaldırılmış olabilir.</p>
        <button
          type="button"
          className="buton-link"
          style={{ marginTop: "1rem" }}
          onClick={() => onNavigate("events")}
        >
          Tüm Etkinliklere Dön
        </button>
      </div>
    );
  }

  const imageUrl =
    selected.image && selected.image.trim() !== ""
      ? selected.image
      : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop";

  return (
    <article className="detay-kart">
      <h2>{selected.title}</h2>

      <figure style={{ margin: "1rem 0" }}>
        <img
          src={imageUrl}
          alt={selected.title}
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
        <p><strong>Tarih:</strong> {selected.date}, {selected.time}</p>
        <p><strong>Yer:</strong> {selected.location}</p>
        <p><strong>Kategori:</strong> {selected.category}</p>
        <p><strong>Kontenjan:</strong> {selected.capacity} kişi</p>
      </div>

      <p className="detay-aciklama" style={{ margin: "1.5rem 0" }}>
        {selected.description}
      </p>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <button
          type="button"
          className="buton-link"
          onClick={() => onNavigate("update", selected.id)}
        >
          Bu etkinliği güncelle
        </button>

        <button
          type="button"
          className="link-vurgu-btn"
          onClick={() => onNavigate("events")}
        >
          ← Listeye dön
        </button>
      </div>
    </article>
  );
}