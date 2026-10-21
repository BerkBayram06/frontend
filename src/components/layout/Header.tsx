import type { CampusEvent, PageName } from "../../types/campus-event";
import { Navigation } from "./Navigation";

interface HeaderProps {
  page: PageName;
  selectedEvent?: CampusEvent;
  onNavigate: (next: PageName) => void;
}

export function Header({ page, selectedEvent, onNavigate }: HeaderProps) {
  // Eğer detay sayfasındaysak ve seçili etkinlik varsa onun adını, değilse genel başlığı basıyoruz
  const headerTitle = page === "detail" && selectedEvent ? selectedEvent.title : "Kampüs Etkinlikleri";

  return (
    <header>
      <h1>{headerTitle}</h1>
      <Navigation page={page} onNavigate={onNavigate} />
    </header>
  );
}