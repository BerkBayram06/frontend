import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="sayfa-bulunamadi" style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
      <h2 className="bolum-baslik" style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>
        Sayfa bulunamadı
      </h2>
      <p style={{ color: "var(--metin-acik)", marginBottom: "1.5rem" }}>
        Aradığınız sayfa ya da etkinlik yok.
      </p>
      <Link to="/" className="buton-link" style={{ textDecoration: "none" }}>
        Ana sayfaya dön
      </Link>
    </section>
  );
}

export default NotFoundPage;
