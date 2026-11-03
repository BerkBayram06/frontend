import { createContext, useContext, useState, type ReactNode } from "react";
import type { CampusEvent, Category } from "../types/campus-event";
import type { EventFormData } from "../types/EventFormData";
import { initialEvents } from "../data/events";

export interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

function toEvent(id: string, data: EventFormData, existingImage?: string): CampusEvent {
  return {
    id,
    title: data.title.trim(),
    category: data.category as Category,
    capacity: Number(data.capacity),
    date: data.date,
    time: data.time,
    location: data.location.trim(),
    description: data.description.trim(),
    image: existingImage || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop"
  };
}

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  function addEvent(data: EventFormData) {
    setEvents([...events, toEvent(`event-${Date.now()}`, data)]);
  }

  function updateEvent(id: string, data: EventFormData) {
    setEvents(events.map((e) => (e.id === id ? toEvent(id, data, e.image) : e)));
  }

  function deleteEvent(id: string) {
    setEvents(events.filter((e) => e.id !== id));
  }

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents(): EventsContextValue {
  const value = useContext(EventsContext);
  if (value === null) {
    throw new Error("Provider yok");
  }
  return value;
}
