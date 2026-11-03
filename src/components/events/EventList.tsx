import type { CampusEvent } from "../../types/campus-event";
import { EventCard } from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
}

export function EventList({ events }: EventListProps) {
  return (
    <section className="etkinlik-listesi">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}

export default EventList;
