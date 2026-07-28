import { Link } from "react-router-dom";
// import flourish from "../assets/icons/flourish.png";
import "../styles/hero.css";

function Hero() {
  return (
    <section className="hero-section">

      <div className="hero-container">

        {/* LEFT */}

        <div className="hero-left">

          <div className="hero-tag-wrapper">
            <span className="hero-tag-line"></span>

            <p className="hero-tag">
              WELCOME TO RC EVENTS
            </p>

            <span className="hero-tag-line"></span>
          </div>

          <h1 className="hero-title">
            Creating
            <span> Unforgettable </span>
            Celebrations
          </h1>

          <div className="hero-line"></div>

          {/* <div className="hero-flourish">
              <img src={flourish} alt="" />
          </div> */}

          <p className="hero-text">
            From intimate family gatherings to grand celebrations,
            RC Events connects you with trusted professionals
            to make every occasion truly memorable.
          </p>

          <div className="hero-buttons">

            <Link to="/events" className="btn-gold">
              Explore Events →
            </Link>

            <Link to="/register" className="btn-outline">
              Join RC Events
            </Link>

          </div>

        </div>

        {/* RIGHT */}

        <div className="hero-right">

          <video
            autoPlay
            muted
            loop
            playsInline
            controls
            className="hero-video"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>

        </div>

      </div>

    </section>
  );
}

export default Hero;