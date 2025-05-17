import "./App.css";
import Notes from "./notes/notes";
import Modal from "./modal/modal";
import { useState, useEffect } from "react";
import AddNote from "./addNote/addNote";
import noteimg from "./photos/pencil.png";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // edit qilish uchun

  useEffect(() => {
    const storedEvents = localStorage.getItem("notes");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(events));
  }, [events]);

  const newEvent = (event) => {
    setEvents((prev) => [...prev, event]);
    setShowModal(false);
  };

  const updateEvent = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev))
    );
    setSelectedEvent(null);
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleDelete = (id) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

  const handleEdit = (id) => {
    const eventToEdit = events.find((ev) => ev.id === id);
    setSelectedEvent(eventToEdit);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setSelectedEvent(null);
    setShowModal(true);
  };

  return (
    <div>
      <div className="navbar">
        <div className="note-img">
          <img src={noteimg} alt="Note" />
          <h1>Notes...</h1>
        </div>
        <button onClick={handleAddNew}>+ New Note</button>
      </div>
      {showModal && (
        <Modal closeModal={closeModal}>
          <AddNote
            newEvent={newEvent}
            editEvent={selectedEvent}
            updateEvent={updateEvent}
          />
        </Modal>
      )}
      <div className="notes">
        <Notes
          event={events}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
}

export default App;
