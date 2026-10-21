import type { PageName } from "../../types/campus-event";

interface NavigationProps {
  page: PageName;
  onNavigate: (next: PageName) => void;
}

export function Navigation({ page, onNavigate }: NavigationProps) {
  return (
    <nav>
      <ul>
        <li>
          <a
            href="#home"
            aria-current={page === "home" ? "page" : undefined}
            onClick={(e) => { e.preventDefault(); onNavigate("home"); }}
          >
            Ana Sayfa
          </a>
        </li>
        <li>
          <a
            href="#events"
            aria-current={page === "events" ? "page" : undefined}
            onClick={(e) => { e.preventDefault(); onNavigate("events"); }}
          >
            Etkinlikler
          </a>
        </li>
        <li>
          <a
            href="#add"
            aria-current={page === "add" ? "page" : undefined}
            onClick={(e) => { e.preventDefault(); onNavigate("add"); }}
          >
            Ekle
          </a>
        </li>
      </ul>
    </nav>
  );
}