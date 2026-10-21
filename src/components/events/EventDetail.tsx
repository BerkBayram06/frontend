import type { CampusEvent, PageName } from "../../types/campus-event";

function formatDate(dateStr: string): string {
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  }
  return dateStr;
}

interface EventDetailProps {
  selected?: CampusEvent;
  onNavigate: (next: PageName, id?: string | null) => void;
}

export function EventDetail({ selected, onNavigate }: EventDetailProps) {
  if (!selected) {
    return (
      <div className="hata-kutusu">
        <h2>Etkinlik bulunamadı!</h2>
        <p>Aradığınız etkinlik bulunamadı veya geçersiz bir seçim yaptınız.</p>
        <button
          type="button"
          className="link-vurgu-btn"
          onClick={() => onNavigate("events")}
        >
          ← Listeye dön
        </button>
      </div>
    );
  }

  return (
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