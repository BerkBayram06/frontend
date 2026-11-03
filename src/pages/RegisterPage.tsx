import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
}

export function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: RegisterErrors = {};

    if (name.trim().length < 3) {
      found.name = "Ad Soyad en az 3 karakter olmalı.";
    }
    if (!email.includes("@")) {
      found.email = "Geçerli bir e-posta girin.";
    }
    if (password.length < 6) {
      found.password = "Şifre en az 6 karakter olmalı.";
    }
    if (password2 !== password) {
      found.password2 = "Şifreler aynı değil.";
    }

    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <section>
      <h2 className="bolum-baslik">Kayıt Ol</h2>

      {sent && (
        <p className="mesaj mesaj-basari">
          Kayıt başarılı (demo). Gerçek hesap oluşturma Sprint 10'da.
        </p>
      )}

      <form className="form" noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reg-name">Ad Soyad</label>
          <input
            id="reg-name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            placeholder="Adınız ve Soyadınız"
          />
          {errors.name && <span className="hata-metni">{errors.name}</span>}
        </div>

        <div>
          <label htmlFor="reg-email">E-posta</label>
          <input
            id="reg-email"
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
          <label htmlFor="reg-password">Şifre</label>
          <input
            id="reg-password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={errors.password ? true : undefined}
            placeholder="En az 6 karakter"
          />
          {errors.password && <span className="hata-metni">{errors.password}</span>}
        </div>

        <div>
          <label htmlFor="reg-password-confirm">Şifre (tekrar)</label>
          <input
            id="reg-password-confirm"
            name="password2"
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            aria-invalid={errors.password2 ? true : undefined}
            placeholder="Şifrenizi tekrar girin"
          />
          {errors.password2 && (
            <span className="hata-metni">{errors.password2}</span>
          )}
        </div>

        <button type="submit" className="buton">
          Kayıt ol
        </button>

        <div style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
          <Link to="/login" style={{ color: "var(--renk-ana)" }}>
            Zaten hesabın var mı? Giriş yap
          </Link>
        </div>
      </form>
    </section>
  );
}

export default RegisterPage;
