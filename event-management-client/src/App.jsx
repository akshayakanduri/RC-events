import { Route, Routes, useLocation } from "react-router-dom";

import AdminRoute from "./utils/AdminRoute";
import PrivateRoute from "./utils/PrivateRoute";

import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import AdminDashboard from "./pages/AdminDashboard";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import EventDetails from "./pages/EventDetails";
import Events from "./pages/Events";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";

import About from "./pages/About";
import AdminCategories from "./pages/AdminCategories";
import AdminEvents from "./pages/AdminEvents";
import EditProfile from "./pages/EditProfile";
function App() {

  const location = useLocation();

  const hideSidebar =
  location.pathname === "/login" ||
  location.pathname === "/register" ||
  location.pathname === "/verify-otp";

  return (
    <>

      <ScrollToTop />
      
      {!hideSidebar && <Navbar />}

      <div
        style={{
          padding: 0,
        }}
      >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/home" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<About />} />          
          {/* <Route path="/bookings" element={<MyBookings />} /> */}
          <Route
  path="/bookings"
  element={
    <PrivateRoute>
      <MyBookings />
    </PrivateRoute>
  }
/>
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route
  path="/profile"
  element={
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  }
/>
          <Route path="/events/:id" element={<EventDetails />} />
          {/* <Route path="/admin" element={<AdminDashboard />} /> */}
          <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>
          {/* <Route path="/admin/create-event" element={<CreateEvent />} /> */}
          <Route
  path="/admin/create-event"
  element={
    <AdminRoute>
      <CreateEvent />
    </AdminRoute>
  }
/>
          {/* <Route path="/admin/edit-event/:id" element={<EditEvent />} /> */}
          <Route
  path="/admin/edit-event/:id"
  element={
    <AdminRoute>
      <EditEvent />
    </AdminRoute>
  }
/>
          {/* <Route path="/admin/events" element={<AdminEvents />} /> */}
          <Route
  path="/admin/events"
  element={
    <AdminRoute>
      <AdminEvents />
    </AdminRoute>
  }
/>
          {/* <Route path="/admin/categories" element={<AdminCategories />} /> */}
          <Route
  path="/admin/categories"
  element={
    <AdminRoute>
      <AdminCategories />
    </AdminRoute>
  }
/>
          {/* <Route path="/edit-profile" element={<EditProfile />} /> */}
          <Route
  path="/edit-profile"
  element={
    <PrivateRoute>
      <EditProfile />
    </PrivateRoute>
  }
/>
        </Routes>
      </div>
    </>
  );
}

export default App;