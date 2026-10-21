import { useState, useEffect } from "react";
import "./App.css";
import type { CampusEvent, Category, PageName } from "./types/campus-event";
import { initialEvents } from "./data/events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { EventList } from "./components/events/EventList";
import { EventDetail } from "./components/events/EventDetail";
import { EventFilter } from "./components/events/EventFilter";
import { EventForm } from "./components/forms/EventForm";

export default function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");
  const [eventsList, setEventsList] = useState<CampusEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 400));
        setEventsList(initialEvents);
      } catch {
        setFetchError("Veriler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const selected = selectedId ? findEventById(eventsList, selectedId) : undefined;

  useEffect(() => {
    let title = "Ana Sayfa";
    if (page === "events") title = "Tüm Etkinlikler";
    else if (page === "add") title = "Etkinlik Ekle";
    else if (page === "update") title = "Etkinlik Güncelle";
    else if (page === "detail") title = selected ? selected.title : "Etkinlik Detayı";
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [page, selected]);

  const upcoming = [...eventsList].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);
  const filtered = filterByCategory(searchEvents(eventsList, searchText), selectedCategory);

  function handleFormSubmitSuccess(payload: CampusEvent) {
    if (page === "add") setEventsList((prev) => [payload, ...prev]);
    else setEventsList((prev) => prev.map((item) => (item.id === payload.id ? payload : item)));
  }

  return (
    <>
      <Header page={page} selectedEvent={selected} onNavigate={go} />
      <main>
        {fetchError && <div className="hata-kutusu">{fetchError}</div>}
        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem", fontWeight: "bold" }}>Etkinlikler yükleniyor...</div>
        ) : (
          <>
            {page === "home" && (
              <>
                <h2>Yaklaşan Etkinlikler</h2>
                <EventList events={upcoming} onSelectEvent={(id) => go("detail", id)} />
                <div style={{ marginTop: "1.5rem" }}>
                  <button type="button" className="buton-link" onClick={() => go("events")}>Tüm etkinlikleri gör</button>
                </div>
              </>
            )}
            {page === "events" && (
              <>
                <h2>Tüm Etkinlikler</h2>
                <EventFilter searchText={searchText} onSearchChange={setSearchText} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
                <p id="sonuc">{filtered.length === 0 ? "Aradığınız kriterlere uygun etkinlik bulunamadı." : `${filtered.length} etkinlik listeleniyor.`}</p>
                <EventList events={filtered} onSelectEvent={(id) => go("detail", id)} />
              </>
            )}
            {page === "detail" && <EventDetail selected={selected} onNavigate={go} />}
            {(page === "add" || page === "update") && (
              <EventForm page={page} selectedId={selectedId} selectedEvent={selected} onSubmitSuccess={handleFormSubmitSuccess} onNavigate={go} />
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}