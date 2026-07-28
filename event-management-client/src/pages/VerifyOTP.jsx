import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (value, index) => {
  if (!/^[0-9]?$/.test(value)) return;

  const newOtp = [...otp];
  newOtp[index] = value;
  setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/verify-otp", {
      email,
      otp: otp.join(""),
    });

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

    toast.success("OTP Verified Successfully!");

        navigate("/home");
    } catch (error) {
        toast.error(
        error.response?.data?.message || "Invalid OTP"
        );
    }
    };

  return (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{
      minHeight: "100vh",
      background: "#f4f7fb",
    }}
  >
    <div
      className="card border-0 shadow-lg p-5"
      style={{
        width: "100%",
        maxWidth: "650px",
        borderRadius: "22px",
      }}
    >
      <div className="text-center">

        <h1 className="fw-bold display-3">
          Verify OTP
        </h1>

        <p
          className="text-muted fs-4 mt-3"
        >
          OTP sent to
        </p>

        <h4 className="fw-bold">
          {email}
        </h4>

        <p
          className="text-muted mt-4"
        >
          Enter the 6-digit code sent to your email
        </p>

      </div>

      <form onSubmit={handleSubmit}>

        <div className="d-flex justify-content-center gap-3 my-4">

          {otp.map((digit, index) => (

            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              maxLength={1}
              className="form-control text-center fw-bold fs-3"
              style={{
                width: "65px",
                height: "70px",
                borderRadius: "14px",
              }}
              onChange={(e) =>
                handleOtpChange(
                  e.target.value,
                  index
                )
              }
              onKeyDown={(e) =>
                handleKeyDown(
                  e,
                  index
                )
              }
            />

          ))}

        </div>

        <div className="text-center mb-4">

          <span className="text-muted">
            Didn't receive the code?
          </span>

          <button
            type="button"
            className="btn btn-link text-decoration-none fw-bold"
          >
            Resend OTP
          </button>

        </div>

        <button
          type="submit"
          className="btn w-100 py-3 fw-bold"
          style={{
            background: "#111827",
            color: "white",
            borderRadius: "14px",
            fontSize: "20px",
          }}
        >
          Verify OTP
        </button>

      </form>

    </div>
  </div>
);
}

export default VerifyOTP;