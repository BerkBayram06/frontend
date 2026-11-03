import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = email.includes("@") ? "" : "Geçerli bir e-posta girin.";
    setError(found);
    setSent(found === "");
  }

  return (
    <section>
      <h2 className="bolum-baslik">Şifremi Unuttum</h2>
      <p style={{ color: "var(--metin-acik)", margin: "0.75rem 0" }}>
        Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.
      </p>

      {sent && (
        <p className="mesaj mesaj-basari">
          Bağlantı {email} adresine gönderildi (demo).
        </p>
      )}

      <form className="form" noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="forgot-email">E-posta</label>
          <input
            id="forgot-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={error ? true : undefined}
            placeholder="ornek@ogrenci.edu.tr"
          />
          {error && <span className="hata-metni">{error}</span>}
        </div>

        <button type="submit" className="buton">
          Bağlantı gönder
        </button>

        <div style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
          <Link to="/login" style={{ color: "var(--renk-ana)" }}>
            ← Girişe dön
          </Link>
        </div>
      </form>
    </section>
  );
}

export default ForgotPasswordPage;
