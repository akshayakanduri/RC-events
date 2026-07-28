import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import loginBg from "../assets/images/login-bg.jpg";
// import loginTop from "../assets/images/login-top.png";
import API from "../services/api";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

    const [form, setForm] = useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const res = await API.post("/auth/login", form);


    localStorage.setItem("token", res.data.token);

    localStorage.setItem(
      "user",
      JSON.stringify({
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
        profileImage: res.data.profileImage,
      })
    );


    // toast.success("Login Successful!");

    if (res.data.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/home");
    }
  } catch (error) {
    console.log(error);
    console.log(error.response);
    console.log(error.response?.data);

    toast.error(error.response?.data?.error || "Login Failed");
  }
};

  return (
  <div className="login-page">
    {/* <img
        src={loginTop}
        alt=""
        className="login-top-decoration"
    />
    <img
        src={loginBg}
        alt=""
        className="login-bg-image"
    /> */}
    
    <div className="login-card">
      <div className="text-center mb-4">
        <h1 className="fw-bold">Welcome Back</h1>

        <p className="text-muted">
          Sign in to your RC Events account
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="form-label fw-semibold">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            className="form-control p-3"
            placeholder="Enter your email"
            onChange={handleChange}
            required
            style={{
              borderRadius: "12px",
            }}
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">
            Password
          </label>

          <input
            type="password"
            name="password"
            className="form-control p-3"
            placeholder="Enter your password"
            onChange={handleChange}
            required
            style={{
              borderRadius: "12px",
            }}
          />
        </div>

        <button
          className="btn w-100 py-3 fw-bold"
          style={{
            background: "#111827",
            color: "white",
            borderRadius: "12px",
          }}
        >
          Sign In
        </button>
      </form>

      <p className="text-center mt-4 mb-0">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="fw-bold text-decoration-none"
        >
          Sign Up
        </Link>
      </p>
    </div>
  </div>
);
}

export default Login; 