import "../styles/WhyChooseUs.css";

const features = [
  {
    title: "Professional Event Planning",
    desc: "Experienced planners for weddings, birthdays, and corporate events.",
  },
  {
    title: "Affordable Packages",
    desc: "Choose from multiple packages that fit your budget.",
  },
  {
    title: "Trusted Vendors",
    desc: "Decoration, catering, photography, DJ and more from trusted partners.",
  },
  {
    title: "Personalized Experiences",
    desc: "Every event is unique. We customize every detail to match your vision.",
  },
  {
    title: "Quality & Excellence",
    desc: "We ensure top-quality service and memorable experiences every time.",
  },
  {
    title: "24/7 Customer Support",
    desc: "We're here to help you before, during, and after your event.",
  },
];

function WhyChooseUs() {
  return (
    <section className="why-section">

      <div className="trust-header">

  

  <p className="trust-tagline">
    BUILT ON TRUST
  <br />
  SUSTAINED BY CARE
  </p>

  <h2 className="trust-title">
    Why Families
    <br />
    <span>Trust Us</span>
  </h2>

  <div className="top-line"></div>

  <p className="trust-description">
    From intimate gatherings to grand celebrations, we bring your vision to
    life — one beautiful detail, one trusted vendor, one unforgettable event
    at a time.
  </p>

</div>

<div className="trust-stats">

    <div className="stat-item">
        <h3>500+</h3>
        <p>Events Planned</p>
    </div>

    <div className="stat-item">
        <h3>200+</h3>
        <p>Trusted Vendors</p>
    </div>

    <div className="stat-item">
        <h3>98%</h3>
        <p>Client Satisfaction</p>
    </div>

    <div className="stat-item">
        <h3>4.9/5</h3>
        <p>Average Event Rating</p>
    </div>

</div>

      {/* <div className="why-grid">

        {features.map((item, index) => (

          <div className="why-card" key={index}>

            <div className="check-circle">
              <FaCheck />
            </div>

            <h3>{item.title}</h3>

            <div className="mini-line"></div>

            <p>{item.desc}</p>

          </div>

        ))}

      </div> */}

    </section>
  );
}

export default WhyChooseUs;