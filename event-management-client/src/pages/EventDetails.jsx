import {
  CalendarDays,
  Clock3,
  MapPin,
  Shirt,
  Users,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import "../styles/eventDetails.css";

function EventDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const res = await API.get(`/events/${id}`);

      setEvent(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const applyNow = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Please login first.");
      navigate("/login");
      return;
    }

    await API.post(
  "/bookings",
  {
    eventId: id,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      // toast.success("Applied successfully!");

      navigate("/bookings");

    } catch (err) {
      console.log(err);

      if (err.response?.data?.message) {
        toast.warning(err.response.data.message);
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  if (!event) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading...</h3>
      </div>
    );
  }

//   console.log(event);
// console.log(event.location);

  return (
    <div className="event-details-page">
      <div className="container py-5">

      <div className="event-details-card mx-auto">

        <div style={{ position: "relative" }}>

  <img
    src={event.image || event.bannerImage}
    alt={event.title}
    className="event-banner"
  />

  <div className="event-overlay"></div>

  <div className="event-banner-content">
    <h1 className="event-heading">
      {event.title}
    </h1>

    <div className="d-flex align-items-center gap-3 flex-wrap">

      <span
        className={`badge rounded-pill px-4 py-2 ${
          event.status === "Open"
            ? "bg-success"
            : "bg-danger"
        }`}
      >
        {event.status}
      </span>

      <span className="fs-5">
        <MapPin size={18} className="icon-primary" /> {event.location}
      </span>

    </div>

  </div>

</div>
</div>

<div className="event-body">

          <hr className="my-4" />

          <div className="row g-3 mb-4">

          <div className="col-md-6">
            <div className="info-card">
              <h6 className="text-muted mb-1"><MapPin size={18} className="icon-primary" /> Location</h6>
              <h5>{event.location}</h5>
            </div>
          </div>

          <div className="col-md-6">
            <div className="info-card">
              <h6 className="text-muted mb-1"><CalendarDays size={18} className="icon-primary" /> Date</h6>
              <h5>{new Date(event.date).toLocaleDateString()}</h5>
            </div>
          </div>

          <div className="col-md-6">
            <div className="info-card">
              <h6 className="text-muted mb-1"><Clock3 size={18} className="icon-primary" /> Time</h6>
              <h5>{event.time}</h5>
            </div>
          </div>

          <div className="col-md-6">
            <div className="info-card">
              <h6 className="text-muted mb-1"><Wallet size={18} className="icon-primary" /> Payment</h6>
              <h5>₹{event.payment}</h5>
            </div>
          </div>

          <div className="col-md-6">
            <div className="info-card">
              <h6 className="text-muted mb-1"><Users size={18} className="icon-primary" /> Vacancies</h6>
              <h5>{event.vacancies}</h5>
            </div>
          </div>

          <div className="col-md-6">
            <div className="info-card">
              <h6 className="text-muted mb-1"><Shirt size={18} className="icon-primary" /> Dress Code</h6>
              <h5>{event.dressCode}</h5>
            </div>
          </div>

        </div>


          <hr className="my-4" />

          <h4 className="section-title">
            Description
          </h4>

          <p className="event-description">
            {event.description}
          </p>

        <div className="mt-4 d-grid gap-3 d-md-flex">

  {event.status === "Closed" || event.vacancies <= 0 ? (
    <button
      className="apply-btn"
      disabled
      style={{
        background: "#dc3545",
        cursor: "not-allowed",
        opacity: 0.8,
      }}
    >
      Event Closed
    </button>
  ) : (
    <button
      className="apply-btn"
      onClick={applyNow}
    >
      Apply Now
    </button>
  )}

  <a
    href={event.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="location-btn"
  >
    <MapPin size={18} className="icon-primary" /> View Location
  </a>

</div>

        </div>

      </div>

    </div>
  );
}

export default EventDetails;