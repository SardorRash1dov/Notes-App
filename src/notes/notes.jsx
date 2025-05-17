import './notes.css'

function Notes({ event, handleDelete, handleEdit }) {
  return (
    <div className="container_flex">
      {event.map((event) => {
        return (
          <div className="container" key={event.id}>
            <div className="date">
              <h3 className="title">{event.title}</h3>
              <h5 className="data">{event.date}</h5>
            </div>
            <div className="text">{event.note}</div>
            <div className="buttons">
              <button className="delete" onClick={() => handleDelete(event.id)}>
                Delete
              </button>
              <button className="edit" onClick={() => handleEdit(event.id)}>
                Edit
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Notes;
