import { useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import type { EventFormData } from "../types/EventFormData";
import { EventForm } from "../components/forms/EventForm";

const emptyForm: EventFormData = {
  title: "",
  category: "",
  date: "",
  time: "",
  location: "",
  capacity: "",
  description: "",
};

export function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  return (
    <section>
      <h2 className="bolum-baslik">Etkinlik Ekle</h2>
      <EventForm
        initialData={emptyForm}
        submitText="Kaydet"
        onSubmit={(data) => {
          addEvent(data);
          navigate("/admin");
        }}
      />
    </section>
  );
}

export default AddEventPage;
