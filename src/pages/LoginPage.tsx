import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: { email?: string; password?: string } = {};
    if (!email.includes("@")) {
      found.email = "Geçerli bir e-posta girin.";
    }
    if (password.length < 6) {
      found.password = "Şifre en az 6 karakter olmalı.";
    }
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <section>
      <h2 className="bolum-baslik">Giriş Yap</h2>

      {sent && (
        <p className="mesaj mesaj-basari">Gerçek giriş Sprint 10'da</p>
      )}

      <form className="form" noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login-email">E-posta</label>
          <input
            id="login-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            placeholder="ornek@ogrenci.edu.tr"
          />
          {errors.email && <span className="hata-metni">{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="login-password">Şifre</label>
          <input
            id="login-password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={errors.password ? true : undefined}
            placeholder="En az 6 karakter"
          />
          {errors.password && <span className="hata-metni">{errors.password}</span>}
        </div>

        <button type="submit" className="buton">
          Giriş yap
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginTop: "0.5rem", flexWrap: "wrap", fontSize: "0.9rem" }}>
          <Link to="/forgot-password" style={{ color: "var(--renk-ana)" }}>
            Şifremi unuttum
          </Link>
          <Link to="/register" style={{ color: "var(--renk-ana)" }}>
            Hesabın yok mu? Kayıt ol
          </Link>
        </div>
      </form>
    </section>
  );
}

export default LoginPage;
