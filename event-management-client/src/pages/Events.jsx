import {
  CalendarDays,
  Clock3,
  MapPin,
  Search,
  Users,
  Wallet
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "../styles/events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const resultsRef = useRef(null);

useEffect(() => {
  fetchEvents();
  fetchCategories();
}, []);

const fetchEvents = async (searchValue = search, categoryValue = category) => {
  try {

    const res = await API.get("/events", {
  params: {
    search: searchValue,
    category: categoryValue,
  },
});


    setEvents(res.data);

    if (searchValue || categoryValue) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }

  } catch (err) {
    console.log(err);
  }
};

// 👇 THIS SHOULD BE HERE (outside fetchEvents)
const fetchCategories = async () => {
  try {
    const res = await API.get("/categories");

    setCategories(res.data);
  } catch (err) {
    console.log(err);
  }
};
  

  return (
    <div className="events-page">

<section className="events-hero">

  <div className="hero-overlay">

    <div className="container">

      <div className="events-header">

        <div className="events-tag">
          LIVE OPPORTUNITIES
        </div>

        <h1>
          Discover <span>Premium Events</span>
        </h1>

        <p>
          Browse the latest event opportunities across Bangalore and apply instantly with RC Events.
        </p>

      </div>

    </div>

  </div>

</section>
<div className="container">


        <div className="row g-4">

  <div className="col-md-4">

    <div className="stats-card">

      <h2>{events.length}</h2>

      <p>Live Opportunities</p>

    </div>

  </div>

  <div className="col-md-4">

    <div className="stats-card">

      <h2>
        {[...new Set(events.map(event => event.location))].length}
      </h2>

      <p>Locations</p>

    </div>

  </div>

  <div className="col-md-4">

    <div className="stats-card">

      <h2>
        {events.reduce(
          (total, event) => total + Number(event.vacancies),
          0
        )}
      </h2>

      <p>Total Vacancies</p>

    </div>

  </div>

</div>
<div className="events-search">
  <div className="row justify-content-center g-3">

    <div className="col-md-6">
      <div className="search-box">
        <Search size={20} className="search-icon" />

        <input
  type="text"
  className="form-control rounded-pill shadow-sm search-input"
  placeholder="Search Events..."
  value={search}
  onChange={(e) => {
  setSearch(e.target.value);
  setCategory("");
}}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      fetchEvents(search, "");
    }
  }}
/>
      </div>
    </div>

    <div className="col-md-4">
      <select
        className="form-select rounded-pill shadow-sm"
        value={category}
        onChange={(e) => {
  const value = e.target.value;

  setCategory(value);
  setSearch("");

  fetchEvents("", value);
}}
>
        <option value="">All Categories</option>

        {categories.map((cat) => (
          <option
            key={cat._id}
            value={cat.name}
          >
            {cat.name}
          </option>
        ))}
      </select>
    </div>

  </div>
</div>

      <div
        className="row"
        ref={resultsRef}
      >

        {events.map((event) => {



  return (
    <div className="col-md-6 col-lg-3 mb-4" key={event._id}>
      <div className="event-card h-100">

        <div style={{ position: "relative" }}>
          <img
              src={event.image || event.bannerImage}
              alt={event.title}
              className="event-image"
          />

          <div className="event-overlay"></div>

          <span
            className={`event-status ${
              event.status === "Open"
                ? "status-open"
                : "status-close"
            }`}
          >
            {event.status}
          </span>
        </div>

        <div className="card-body event-body">
                <div className="event-category">
                    {event.category}
                </div>

                <h3 className="event-title">
                    {event.title}
                </h3>

                <div className="event-info">

                <div>
                    <span><MapPin size={18} className="icon-primary" /></span>
                    <p>{event.location}</p>
                </div>

                <div>
                    <span><CalendarDays size={18} className="icon-primary" /></span>
                    <p>{new Date(event.date).toLocaleDateString()}</p>
                </div>

                <div>
                    <span><Clock3 size={18} className="icon-primary" /></span>
                    <p>{event.time}</p>
                </div>

                <div>
                    <span><Users size={18} className="icon-primary" /></span>
                    <p>{event.vacancies} Vacancies</p>
                </div>

                <div>
                    <span><Wallet size={18} className="icon-primary" /></span>
                    <p>₹{event.payment}</p>
                </div>

                </div>

                <Link
                    to={`/events/${event._id}`}
                    className="event-btn"
                >
                    View Details →
                </Link>

                        </div>

          </div>
        </div>
      );
})}

      </div>

    </div>
</div>
  );
}

export default Events;