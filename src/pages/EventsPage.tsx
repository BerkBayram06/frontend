import { useState } from "react";
import { useEvents } from "../context/EventsContext";
import type { Category } from "../types/campus-event";
import { searchEvents, filterByCategory } from "../utils/filter-events";
import { EventFilter } from "../components/events/EventFilter";
import { EventList } from "../components/events/EventList";

export function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <section>
      <h2 className="bolum-baslik">Tüm Etkinlikler</h2>
      <EventFilter
        searchText={searchText}
        onSearchChange={setSearchText}
        selectedCategory={category}
        onCategoryChange={setCategory}
      />
      <p id="sonuc">
        {filtered.length === 0
          ? "Aradığınız kriterlere uygun etkinlik bulunamadı."
          : `${filtered.length} etkinlik listeleniyor.`}
      </p>
      <EventList events={filtered} />
    </section>
  );
}

export default EventsPage;
