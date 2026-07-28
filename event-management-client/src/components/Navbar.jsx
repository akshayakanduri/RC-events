import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
      <nav className="navbar navbar-expand-lg navbar-dark shadow sticky-top">
      <div className="container">

        <Link
  className="navbar-brand d-flex align-items-center"
  to="/"
  style={{
    color: "#ffffff",
    textDecoration: "none",
  }}
>
  <img
    src="/logo.png"
    alt="RC Events"
    style={{
      width: "48px",
      height: "48px",
      objectFit: "cover",
      borderRadius: "50%",
      marginRight: "12px",
    }}
  />

  <span
    className="fw-bold"
    style={{
      color: "#ffffff",
      fontSize: "2rem",
      letterSpacing: "1px",
    }}
  >
    RC Events
  </span>
</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">

          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? "nav-link-custom active" : "nav-link-custom"
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/events"
                className={({ isActive }) =>
                  isActive ? "nav-link-custom active" : "nav-link-custom"
                }
              >
                Services
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "nav-link-custom active" : "nav-link-custom"
                }
              >
                About
              </NavLink>
            </li>

            {user ? (
              <>
                <li className="nav-item">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "nav-link-custom active" : "nav-link-custom"
                }
              >
                Profile
              </NavLink>
                </li>

                <li className="nav-item ms-3">
                  <button
                    className="btn"
                    style={{
                      // background: "#ef4444",
                      background: "#c69345",
                      color: "white",
                      borderRadius: "10px",
                      padding: "8px 18px",
                      border: "none",
                    }}
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item ms-3">
                  <Link
                    className="btn me-2"
                    style={{
                      border: "1px solid #c69345",
                      color: "#c69345",
                      borderRadius: "10px",
                    }}
                    to="/login"
                  >
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="btn"
                    style={{
                      // background: "#ef4444",
                      color: "white",
                      background: "#c69345",
                      // color: "#111827",
                      // fontWeight: "600",
                      // borderRadius: "10px",
                      borderRadius: "10px",
                      padding: "8px 18px",
                      border: "none",
                    }}
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;