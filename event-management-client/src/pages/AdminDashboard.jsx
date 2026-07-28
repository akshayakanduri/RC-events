import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaChair,
  FaClipboardCheck,
  FaClipboardList,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import API from "../services/api";

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
  fetchEvents();
  fetchBookings();
  fetchCategories();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (err) {
  alert("Failed to load events.");
}
  };

  const fetchBookings = async () => {
  try {

    const token = localStorage.getItem("token");

    const res = await API.get("/bookings", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

    setBookings(res.data);

  } catch (err) {
}
};

const fetchCategories = async () => {
  try {
    const res = await API.get("/categories");

    setCategories(res.data);
  } catch (err) {
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

      alert("Event Deleted Successfully!");

      fetchEvents();

    } catch (err) {

      console.log(err);

      alert("Failed to delete event");

    }

  };

  const approveBooking = async (id) => {
  try {

    const token = localStorage.getItem("token");

    await API.put(
  `/bookings/${id}/approve`,
  {},
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    fetchBookings();

  } catch (err) {
    console.log(err);
  }
};

const rejectBooking = async (id) => {
  try {

    const token = localStorage.getItem("token");

    await API.put(
  `/bookings/${id}/reject`,
  {},
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    fetchBookings();

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="container py-5">

      <div
  className="rounded-4 shadow p-4 mb-4"
  style={{
    background: "#111827",
    color: "white",
  }}
>
  <div className="d-flex justify-content-between align-items-center">

    <div>
      <h2 className="fw-bold mb-1">
        Admin Dashboard
      </h2>

      <p className="mb-0 text-light">
        Manage events and manually confirm bookings.
      </p>
    </div>

    <div className="d-flex gap-2">
  <Link
    to="/admin/categories"
    className="btn btn-outline-light px-4 py-2 fw-semibold rounded-3"
  >
    Manage Categories
  </Link>

  <Link
    to="/admin/create-event"
    className="btn btn-light px-4 py-2 fw-semibold rounded-3"
  >
    + Create Event
  </Link>
</div>

  </div>
</div>


      <div className="row g-4 mb-5">

  <div className="col-lg-2 col-md-4">

  <div
    className="card border-0 rounded-4 p-4 h-100"
    style={{
      boxShadow: "0 10px 25px rgba(0,0,0,.08)",
      borderRadius: "20px",
    }}
  >

    <div className="d-flex align-items-center">

      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          width: "58px",
          height: "58px",
          borderRadius: "50%",
          background: "#F3E8FF",
          color: "#7C3AED",
          fontSize: "22px",
        }}
      >
        <FaCalendarAlt />
      </div>

      <div className="ms-3">

        <small
          className="fw-bold"
          style={{
            color: "#6B7280",
            fontSize: "11px",
          }}
        >
          TOTAL EVENTS
        </small>

        <h2 className="fw-bold mb-0">
          {events.length}
        </h2>

      </div>

    </div>

    <hr />

    <small
      style={{
        color: "#9CA3AF",
        fontSize: "13px",
      }}
    >
      All time events
    </small>

  </div>

</div>

  <div className="col-lg-2 col-md-4">

  <div
    className="card border-0 rounded-4 p-4 h-100"
    style={{
      boxShadow: "0 10px 25px rgba(0,0,0,.08)",
      borderRadius: "20px",
    }}
  >

    <div className="d-flex align-items-center">

      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          width: "58px",
          height: "58px",
          borderRadius: "50%",
          background: "#DCFCE7",
          color: "#16A34A",
          fontSize: "22px",
        }}
      >
        <FaClipboardCheck />
      </div>

      <div className="ms-3">

        <small className="fw-bold" style={{ color:"#6B7280", fontSize:"11px"}}>
          OPEN EVENTS
        </small>

        <h2 className="fw-bold mb-0 text-success">
          {events.filter(e => e.status === "Open").length}
        </h2>

      </div>

    </div>

    <hr />

    <small style={{color:"#9CA3AF",fontSize:"13px"}}>
      Currently running
    </small>

  </div>

</div>

  <div className="col-lg-2 col-md-4">

<div
className="card border-0 rounded-4 p-4 h-100"
style={{
boxShadow:"0 10px 25px rgba(0,0,0,.08)"
}}
>

<div className="d-flex align-items-center">

<div
className="d-flex align-items-center justify-content-center"
style={{
width:"58px",
height:"58px",
borderRadius:"50%",
background:"#FEF3C7",
color:"#F59E0B",
fontSize:"22px",
}}
>
<FaChair />
</div>

<div className="ms-3">

<small className="fw-bold" style={{color:"#6B7280",fontSize:"11px"}}>
TOTAL VACANCIES
</small>

<h2 className="fw-bold mb-0 text-warning">
{events.reduce((sum,e)=>sum+Number(e.vacancies||0),0)}
</h2>

</div>

</div>

<hr />

<small style={{color:"#9CA3AF",fontSize:"13px"}}>
Available seats
</small>

</div>

</div>

  <div className="col-lg-2 col-md-4">

<div
className="card border-0 rounded-4 p-4 h-100"
style={{
boxShadow:"0 10px 25px rgba(0,0,0,.08)"
}}
>

<div className="d-flex align-items-center">

<div
className="d-flex align-items-center justify-content-center"
style={{
width:"58px",
height:"58px",
borderRadius:"50%",
background:"#DBEAFE",
color:"#2563EB",
fontSize:"22px",
}}
>
<FaClipboardList />
</div>

<div className="ms-3">

<small className="fw-bold" style={{color:"#6B7280",fontSize:"11px"}}>
BOOKING REQUESTS
</small>

<h2 className="fw-bold mb-0 text-primary">
{bookings.length}
</h2>

</div>

</div>

<hr />

<small style={{color:"#9CA3AF",fontSize:"13px"}}>
Pending & Approved
</small>

</div>

</div>

</div>







      <div className="row">

  {/* Left Side */}

  <div className="col-lg-7">

    <div className="card border-0 shadow rounded-4">

      <div className="card-body">

        <h4 className="fw-bold mb-4">
          📅 All Events
        </h4>

        {events.map((event) => (
  <div
    key={event._id}
    className="d-flex align-items-center border rounded-4 p-3 mb-3"
  >
    <img
      src={event.image || event.bannerImage}
      alt={event.title}
      style={{
        width: "110px",
        height: "80px",
        objectFit: "cover",
        borderRadius: "12px",
      }}
    />

    <div className="ms-3 flex-grow-1">

      <h5 className="fw-bold mb-1">
        {event.title}
      </h5>

      <small className="text-muted d-block">
        📅 {new Date(event.date).toLocaleDateString()}
      </small>

      <small className="text-muted d-block">
        📍 {event.location}
      </small>

      <small className="text-success fw-semibold">
        👥 {event.vacancies} Vacancies
      </small>

    </div>

    <div className="text-end">

      <Link
        to={`/admin/edit-event/${event._id}`}
        className="btn btn-primary btn-sm me-2"
      >
        Edit
      </Link>

      <button
        className="btn btn-outline-danger btn-sm"
        onClick={() => deleteEvent(event._id)}
      >
        Delete
      </button>

    </div>

  </div>
))}

      </div>

    </div>

  </div>

  {/* Right Side */}

  <div className="col-lg-5">

    <div className="card border-0 shadow rounded-4">

      <div className="card-body">

  <h4 className="fw-bold mb-4">
    📩 Booking Requests
  </h4>

  {bookings.length === 0 ? (

    <p className="text-muted">
      No booking requests.
    </p>

  ) : (

    bookings
      .filter((booking) => booking.event && booking.user)
      .map((booking) => (

        <div
          key={booking._id}
          className="border rounded-4 p-3 mb-3 shadow-sm"
          style={{
            transition: "0.3s",
            cursor: "pointer",
          }}
        >

        <h5 className="fw-bold mb-3">
          {booking.event?.title}
        </h5>

        <p className="mb-1">
        👤 <strong>{booking.user?.name}</strong>
        </p>

        <p className="mb-1 text-muted">
        📧 {booking.user?.email}
        </p>

        <p className="mb-1 text-muted">
        📍 {booking.event?.location}
        </p>

        <p className="mb-2 text-muted">
        📅 {booking.event
        ? new Date(booking.event.date).toLocaleDateString()
        : "N/A"}
        </p>

        <span
          className={`badge px-3 py-2 ${
          booking.status === "Approved"
          ? "bg-success"
          : booking.status === "Rejected"
          ? "bg-danger"
          : "bg-warning text-dark"
          }`}
          style={{
          fontSize: "13px",
          borderRadius: "20px",
          }}
          >
          {booking.status}
        </span>

{booking.status === "Pending" && (

  <div className="mt-3 d-flex gap-2">

    <button
      className="btn btn-success rounded-pill px-3"
      onClick={() => approveBooking(booking._id)}
    >
      Approve
    </button>

    <button
      className="btn btn-danger rounded-pill px-3"
      onClick={() => rejectBooking(booking._id)}
    >
      Reject
    </button>

  </div>

)}

      </div>

    ))

  )}

</div>

    </div>

  </div>

</div>

    </div>
  );
}

export default AdminDashboard;