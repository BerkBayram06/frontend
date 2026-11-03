import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import { EventForm } from "../components/forms/EventForm";
import NotFoundPage from "./NotFoundPage";

export function EditEventPage() {
  const { id } = useParams();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();

  const event = findEventById(events, id ?? "");
  if (!event) {
    return <NotFoundPage />;
  }

  return (
    <section>
      <h2 className="bolum-baslik">Etkinlik Güncelle</h2>
      <EventForm
        initialData={{
          title: event.title,
          category: event.category,
          date: event.date,
          time: event.time,
          location: event.location,
          capacity: String(event.capacity),
          description: event.description,
        }}
        submitText="Güncelle"
        onSubmit={(data) => {
          updateEvent(event.id, data);
          navigate("/admin");
        }}
      />
    </section>
  );
}

export default EditEventPage;
