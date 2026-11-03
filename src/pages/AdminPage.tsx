import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { formatDate } from "../utils/format-date";

export function AdminPage() {
  const { events, deleteEvent } = useEvents();

  function handleDelete(id: string, title: string) {
    if (window.confirm(`"${title}" silinsin mi?`)) {
      deleteEvent(id);
    }
  }

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2 className="bolum-baslik">Etkinlik Yönetimi</h2>
      </div>

      <div style={{ marginBottom: "1.25rem" }}>
        <Link to="/admin/new" className="buton-link" style={{ textDecoration: "none" }}>
          + Yeni etkinlik
        </Link>
      </div>

      {events.length === 0 ? (
        <p>Henüz etkinlik yok.</p>
      ) : (
        <table className="tablo">
          <thead>
            <tr>
              <th>Etkinlik</th>
              <th>Tarih</th>
              <th>Kategori</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td data-baslik="Etkinlik">{event.title}</td>
                <td data-baslik="Tarih">{formatDate(event.date)}</td>
                <td data-baslik="Kategori">{event.category}</td>
                <td data-baslik="İşlemler" className="islemler">
                  <Link
                    to={`/admin/${event.id}/edit`}
                    className="buton-duzenle"
                    style={{ textDecoration: "none" }}
                  >
                    Düzenle
                  </Link>
                  <button
                    type="button"
                    className="buton-sil"
                    onClick={() => handleDelete(event.id, event.title)}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default AdminPage;
