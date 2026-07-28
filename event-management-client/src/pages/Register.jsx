import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import registerBg from "../assets/images/register-bg.png";
import API from "../services/api";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        location: "",
        profileImage: null,
    });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("name", form.name);
  formData.append("email", form.email);
  formData.append("password", form.password);
  formData.append("phone", form.phone);
  formData.append("location", form.location);

  if (form.profileImage) {
    formData.append("profileImage", form.profileImage);
  }

    try {
      await API.post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("OTP sent to your email.");

      navigate("/verify-otp", {
        state: {
          email: form.email,
        },
      });

    } catch (error) {
      toast.error(
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
  <div
    className="register-page"
    style={{
      backgroundImage: `url(${registerBg})`,
    }}
  >
    <div
    className="register-card"
      
    >
      <div className="text-center mb-6">
        <h1 className="fw-bold display-4">Create Account</h1>

        <p
          className="text-muted fs-6"
          style={{ marginTop: "-8px" }}
        >
          Join RC Events and start applying today
        </p>
      </div>

      <form onSubmit={handleSubmit}>

  <div className="row gx-4">

  {/* Left Column */}
  <div className="col-md-6">

    <div className="mb-3">
      <label className="form-label fw-bold">Full Name</label>
      <input
        type="text"
        name="name"
        placeholder="Enter your full name"
        className="form-control py-1 px-3"
        onChange={handleChange}
        required
        style={{ borderRadius: "12px" }}
      />
    </div>

    <div className="mb-3">
      <label className="form-label fw-bold">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Create password"
        className="form-control py-2 px-3"
        onChange={handleChange}
        required
        style={{ borderRadius: "12px" }}
      />
    </div>

    <div className="mb-3">
      <label className="form-label fw-bold">Location</label>
      <input
        type="text"
        name="location"
        placeholder="Location"
        className="form-control py-2 px-3"
        onChange={handleChange}
        required
        style={{ borderRadius: "12px" }}
      />
    </div>

  </div>

  {/* Right Column */}
  <div className="col-md-6">

    <div className="mb-3">
      <label className="form-label fw-bold">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        className="form-control py-2 px-3"
        onChange={handleChange}
        required
        style={{ borderRadius: "12px" }}
      />
    </div>

    <div className="mb-3">
      <label className="form-label fw-bold">Phone</label>
      <input
        type="text"
        name="phone"
        placeholder="Phone number"
        className="form-control py-2 px-3"
        onChange={handleChange}
        required
        style={{ borderRadius: "12px" }}
      />
    </div>

    <div className="mb-3">
      <label className="form-label fw-bold">Profile Image</label>
      <input
        type="file"
        accept="image/*"
        className="form-control py-2 px-3"
        style={{ borderRadius: "12px" }}
        onChange={(e) =>
          setForm({
            ...form,
            profileImage: e.target.files[0],
          })
        }
      />
    </div>

  </div>

</div>

  <button
    type="submit"
    className="btn w-100 py-2 fw-bold mt-2"
    style={{
      background: "#111827",
      color: "white",
      borderRadius: "14px",
      fontSize: "18px",
    }}
  >
    Create Account
  </button>

</form>

      <p className="text-center mt-4 mb-0 fs-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="fw-bold text-decoration-none"
        >
          Sign In
        </Link>
      </p>

    </div>
  </div>
);
}

export default Register;