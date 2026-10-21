import type { PageName } from "../../types/campus-event";
import { Navigation } from "./Navigation";

interface HeaderProps {
  page: PageName;
  onNavigate: (next: PageName) => void;
}

export function Header({ page, onNavigate }: HeaderProps) {
  return (
    <header>
      <h1>Kampüs Etkinlikleri</h1>
      <Navigation page={page} onNavigate={onNavigate} />
    </header>
  );
}