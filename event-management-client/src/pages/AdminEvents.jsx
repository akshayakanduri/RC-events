import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      console.log(res.data);

      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEvent = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {

        const token = localStorage.getItem("token");

        await API.delete(`/events/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

        alert("Event deleted successfully!");

        fetchEvents();

    } catch (err) {

        console.log(err);

        alert("Failed to delete event.");

    }
    };
  
  return (
    <div className="container py-5">

        <h1 className="text-center mb-5">
            Manage Events
        </h1>

      <div className="row">

        {events.map((event) => (

          <div className="col-lg-6 mb-4" key={event._id}>

            <div className="card shadow border-0 h-100">

            <img
              src={event.image || event.bannerImage}
              alt={event.title}
              className="card-img-top"
              style={{
                height: "250px",
                objectFit: "cover",
              }}
            />

            <div className="card-body">

                <h3 className="fw-bold mb-3">
                  {event.title}
                </h3>

                <p><strong>📍 Location:</strong> {event.location}</p>
                <p>
                  <strong>📅 Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p><strong>⏰ Time:</strong> {event.time}</p>
                <p>
                  <strong>💰 Payment:</strong> ₹{event.payment}
                </p>
                <p><strong>👥 Vacancies:</strong> {event.vacancies}</p>
                <p><strong>👕 Dress Code:</strong> {event.dressCode}</p>

                <span
                  className={`badge ${
                    event.status === "Open"
                      ? "bg-success"
                      : "bg-danger"
                  } mb-3`}
                >
                  {event.status}
                </span>

                <br />

                <div className="mt-3">

            <Link
                to={`/admin/edit-event/${event._id}`}
                className="btn btn-primary"
            >
                Edit
            </Link>

            <button
                className="btn btn-danger ms-2"
                onClick={() => deleteEvent(event._id)}
            >
                Delete
            </button>

            </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Events;