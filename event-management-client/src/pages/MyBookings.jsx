import {
  CalendarDays,
  Clock3,
  MapPin,
  // Users,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "../styles/events.css";
import "./MyBookings.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/bookings/my", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bookings-page">
      <div className="container py-5">
      <h1 className="bookings-title">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center mt-5">
          <h4>No bookings yet.</h4>

          <Link
            to="/events"
            className="btn btn-dark mt-3"
          >
            Explore Events
          </Link>
        </div>
      ) : (
        <div className="row">
          {bookings
            .filter((booking) => booking.event)
            .map((booking) => (
            <div
              className="col-md-4 mb-4"
              key={booking._id}
            >
              <div className="event-card h-100">

              <div style={{ position: "relative" }}>

                <img
                  src={booking.event.image || booking.event.bannerImage}
                  alt={booking.event.title}
                  className="event-image"
                />

                <div className="event-overlay"></div>

                <span className="event-status status-open">
                  {booking.status}
                </span>

              </div>

              <div className="event-body">

                    <div className="event-category">
                        {booking.event.category}
                    </div>

                  <h3 className="event-title">
                    {booking.event.title}
                  </h3>

                  <div className="event-info">

                      <div>
                          <span>
                              <MapPin size={18} className="icon-primary" />
                          </span>
                          <p>{booking.event.location}</p>
                      </div>

                      <div>
                          <span>
                              <CalendarDays size={18} className="icon-primary" />
                          </span>
                          <p>
                              {new Date(booking.event.date).toLocaleDateString()}
                          </p>
                      </div>

                      <div>
                          <span>
                              <Clock3 size={18} className="icon-primary" />
                          </span>
                          <p>{booking.event.time}</p>
                      </div>

                      <div>
                          <span>
                              <Wallet size={18} className="icon-primary" />
                          </span>
                          <p>₹{booking.event.payment}</p>
                      </div>

                  </div>

                  <span className="status-approved">
                    {booking.status}
                  </span>

                  <Link
                      to={`/events/${booking.event._id}`}
                      className="event-btn"
                  >
                      View Event →
                  </Link>

                  </div>

                </div>
              {/* </div> */}
            </div>
          ))}
            </div>
      )}
      </div>
    </div>
  );
}

export default MyBookings;