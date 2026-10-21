import type { CampusEvent } from "../../types/campus-event";
import { EventCard } from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  onSelectEvent: (id: string) => void;
}

export function EventList({ events, onSelectEvent }: EventListProps) {
  return (
    <section className="etkinlik-listesi">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onSelect={onSelectEvent} />
      ))}
    </section>
  );
}