import { useRef, useEffect } from "react";
import "./addNote.css";
import { v4 as uuidv4 } from "uuid";

function AddNote({ newEvent, editEvent, updateEvent }) {
  const title = useRef();
  const date = useRef();
  const note = useRef();
  const form = useRef();

  useEffect(() => {
    if (editEvent) {
      title.current.value = editEvent.title;
      date.current.value = editEvent.date;
      note.current.value = editEvent.note;
    } else {
      form.current.reset();
    }
  }, [editEvent]);

  const resetInput = () => {
    form.current.reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const event = {
      title: title.current.value,
      note: note.current.value,
      date: date.current.value,
      id: editEvent ? editEvent.id : uuidv4(),
    };

    if (editEvent) {
      updateEvent(event);
    } else {
      newEvent(event);
    }
    resetInput();
  };

  return (
    <div className="textarea">
      <form ref={form} onSubmit={handleSubmit}>
        <div className="title">
          <span>Title</span>
          <input type="text" required placeholder="Title..." ref={title} />
        </div>
        <textarea
          name="text"
          ref={note}
          required
          id="note"
          placeholder="Notes..."
        ></textarea>
        <div className="date">
          <span>Date</span>
          <input type="date" ref={date} required id="data" />
        </div>
        <button type="submit">{editEvent ? "Update" : "Submit"}</button>
      </form>
    </div>
  );
}

export default AddNote;
