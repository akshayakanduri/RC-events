import { Link } from "react-router-dom";
import "./About.css";

import {
  FaBolt,
  FaBriefcase,
  FaBullseye,
  FaHandshake,
  FaLock,
  FaUserCheck,
} from "react-icons/fa";

function About() {
  return (
    <>
    

{/* ================= HERO SECTION ================= */}

    <div className="about-page">

      {/* HERO */}

      <section className="about-hero-section">

        <div className="container">

          <div className="row align-items-center">

            <div className="col-lg-5">

              <div className="hero-content">

                <h1>
                  CONNECTING
                  <br />
                  TALENT WITH
                  <br />
                  <span>OPPORTUNITY</span>
                </h1>

                <p>
                  RC Events connects event organizers, agencies and skilled
                  professionals through one trusted platform, making hiring
                  and job searching simple, fast and transparent.
                </p>

                <Link to="/events" className="hero-btn">
                  Explore Events →
                </Link>

              </div>

            </div>

            <div className="col-lg-7 ps-lg-5">

              <img
                src="/images/hero-event.jpg"
                alt="RC Events"
                className="hero-image"
              />

            </div>

          </div>

        </div>

      </section>

    

{/* ================= SERVICES ================= */}


<section className="about-services-section">

  <div className="container">

    <div className="about-services-heading">

      <h2 className="services-title">
          <span className="black">OUR</span>
          <span className="gold"> SERVICES</span>
      </h2>

      <p>
        Book trusted professionals for every occasion — from anchors and
        mehendi artists to photographers, caterers, decorators and much more.
      </p>

    </div>

    <div className="about-services-grid">

      {/* Left */}

      <div className="service-card service-large">

        <img
          src="/images/event1.jpg"
          alt="Mehendi"
        />

        <span>Mehendi Artists</span>

      </div>

      {/* Center Top */}

      <div className="service-card service-small">

        <img
          src="/images/event2.jpg"
          alt="Makeup"
        />

        <span>Makeup Artist</span>

      </div>

      {/* Center Bottom */}

      <div className="service-card service-small">

        <img
          src="/images/event3.jpg"
          alt="Catering"
        />

        <span>Caterers</span>

      </div>

      {/* Right */}

      <div className="service-card service-large">

        <img
          src="/images/event4.jpg"
          alt="Anchor"
        />

        <span>Live Anchors</span>

      </div>

    </div>

  </div>

</section>

{/* ================= ABOUT RC EVENTS ================= */}

<section className="about-info-section">

  <div className="container">

    <div className="about-wrapper">

      {/* Left Card */}

      <div className="about-card">

        <h2>
          WHAT IS
          <br />
          RC
          <br />
          EVENTS?
        </h2>

      </div>

      {/* Right Content */}

      <div className="about-content">

        <h2>
          A PLATFORM THAT CONNECTS
          <br />
          EVENT ORGANIZERS WITH
          <span> SKILLED PROFESSIONALS</span>
        </h2>

        <div className="about-text">

          <p>
            RC Events is a trusted platform designed to simplify event
            workforce management. We bring together event organizers,
            agencies and skilled professionals into one platform,
            making hiring faster, easier and more transparent.
          </p>

          <p>
            Whether you're looking for anchors, mehendi artists,
            photographers, decorators, caterers or event support staff,
            RC Events helps businesses discover trusted professionals
            while providing workers with exciting opportunities.
          </p>

        </div>

        <div className="about-line">

          <div className="dot"></div>

        </div>

      </div>

    </div>

  </div>

</section>

{/* ================= MISSION ================= */}

<section className="mission-section">

  <div className="container">

    <div className="mission-grid">

      {/* Left */}

      <div className="mission-text">

        <h2>
          OUR <span>MISSION</span>
        </h2>

        <div className="title-line"></div>

        <p>
          Our mission is to simplify event workforce management by connecting
          event organizers with trusted professionals through one reliable
          platform. We make hiring faster, transparent and hassle-free while
          creating rewarding opportunities for anchors, photographers,
          mehendi artists, decorators, caterers and many other skilled
          professionals.
        </p>

      </div>

      {/* Right */}

      <div className="mission-image">

        <img
          src="/images/mission.jpg"
          alt="Mission"
        />

      </div>

    </div>

  </div>

</section>

{/* ================= VISION ================= */}

<section className="vision-section">

  <div className="container">

    <div className="vision-grid">

      {/* Left */}

      <div className="vision-image">

        <img
          src="/images/vision.jpg"
          alt="Vision"
        />

      </div>

      {/* Right */}

      <div className="vision-text">

        <h2>
          OUR <span>VISION</span>
        </h2>

        <div className="title-line"></div>

        <p>
          We envision becoming the most trusted event workforce and service
          marketplace by helping organizers find the right professionals while
          empowering skilled individuals with meaningful career opportunities.
          Through innovation, transparency and technology, we strive to make
          event planning and workforce hiring seamless for everyone.
        </p>

      </div>

    </div>

  </div>

</section>

{/* ================= WHY CHOOSE RC EVENTS ================= */}

<section className="about-why-section">

  <div className="container">

    <div className="about-why-heading">

      <p className="section-tag">WHY CHOOSE US</p>

      <h2>
        EXPERIENCE THE
        <span> RC EVENTS </span>
        DIFFERENCE
      </h2>

      <p>
        We combine trusted professionals, modern technology and seamless
        booking to make every event effortless from start to finish.
      </p>

    </div>

    <div className="about-why-grid">

      <div className="about-why-item">
        <FaBolt className="about-why-icon" />
        <h4>Real-Time Updates</h4>
        <p>
          Stay informed with instant booking updates and event notifications.
        </p>
      </div>

      <div className="about-why-item">
        <FaUserCheck className="about-why-icon" />
        <h4>Verified Professionals</h4>
        <p>
          Every professional is carefully reviewed before joining RC Events.
        </p>
      </div>

      <div className="about-why-item">
        <FaLock className="about-why-icon" />
        <h4>Secure Booking</h4>
        <p>
          Transparent booking with trusted communication and secure processes.
        </p>
      </div>

      <div className="about-why-item">
        <FaBriefcase className="about-why-icon" />
        <h4>Career Opportunities</h4>
        <p>
          Helping talented professionals discover exciting event work.
        </p>
      </div>

      <div className="about-why-item">
        <FaHandshake className="about-why-icon" />
        <h4>Trusted Marketplace</h4>
        <p>
          Connecting organizers and professionals on one reliable platform.
        </p>
      </div>

      <div className="about-why-item">
        <FaBullseye className="about-why-icon" />
        <h4>Easy Management</h4>
        <p>
          Manage services, bookings and events effortlessly in one place.
        </p>
      </div>

    </div>

  </div>

</section>


{/* ================= CTA ================= */}

<section className="about-cta">

  <div className="cta-overlay">

    <div className="container">

      <div className="cta-content">

        <p>LET'S BUILD SOMETHING BEAUTIFUL</p>

        <h2>
          Ready To Create
          <br />
          Your Next Event?
        </h2>

        <span>
          Whether you're planning a wedding, birthday celebration,
          corporate event or looking for trusted professionals,
          RC Events is here to make every occasion unforgettable.
        </span>

        <div className="cta-buttons">

          <Link to="/events" className="cta-primary">
            Explore Services
          </Link>

          <Link to="/register" className="cta-secondary">
            Become a Partner
          </Link>

        </div>

      </div>

    </div>

  </div>

</section>

</div>
    </>
  );
}

export default About;