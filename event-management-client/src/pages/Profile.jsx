import {
  CalendarDays,
  LayoutDashboard,
  //   Clock3,
  //   Users,
  //   Wallet,
  //  Shirt,
  Mail,
  Pencil,
  Ticket
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "../styles/profile.css";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

const [bookingCount, setBookingCount] = useState(0);

useEffect(() => {
  fetchBookingCount();
}, []);

const fetchBookingCount = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.get("/bookings/my", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

    setBookingCount(res.data.length);
  } catch (err) {
    console.log(err);
  }
};

  return (
    <section className="profile-page">

      <div className="container py-5">

        <div className="profile-card mx-auto">

          <div className="profile-header">

            <div className="profile-avatar">
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="profile-avatar-img"
                />
              ) : (
                user?.name?.charAt(0).toUpperCase()
              )}
            </div>

            <h2>{user?.name}</h2>

          <span className="profile-role">
            RC EVENTS MEMBER
          </span>

          </div>

          <hr />

          <div className="info-item">
              <div className="info-label">
                  <Mail size={20} className="icon-primary" />
                  <span>Email</span>
              </div>

              <p>{user?.email}</p>
          </div>

          <div className="info-item">
              <div className="info-label">
                  <Ticket size={20} className="icon-primary" />
                  <span>Total Bookings</span>
              </div>

              <p>{bookingCount}</p>
          </div>

          <div className="profile-buttons">

            {user?.role === "admin" ? (
              <Link to="/admin" className="btn-primary-custom">
                <LayoutDashboard size={18} /> Admin Dashboard
              </Link>
            ) : (
              <Link to="/bookings" className="btn-primary-custom">
                <CalendarDays size={18} className="icon-primary-prac" /> My Bookings
              </Link>
            )}

            <Link
              to="/edit-profile"
              className="btn btn-outline-dark rounded-pill px-4 profile-edit-btn"
            >
              <Pencil size={18} /> Edit Profile
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Profile;