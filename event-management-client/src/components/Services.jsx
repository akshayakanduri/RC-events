import {
  Building2,
  Cake,
  Camera,
  HeartHandshake,
  Mic2,
  UtensilsCrossed,
} from "lucide-react";

import divider from "../assets/icons/flourish.png";
import "../styles/services.css";


const services = [
  {
    title: "Weddings",
    icon: HeartHandshake,
  },
  {
    title: "Birthdays",
    icon: Cake,
  },
  {
    title: "Corporate Events",
    icon: Building2,
  },
  {
    title: "Photography",
    icon: Camera,
  },
  {
    title: "Catering",
    icon: UtensilsCrossed,
  },
  {
    title: "Anchor / DJ",
    icon: Mic2,
  },
];

function Services() {
  return (
    <section className="services-section">

    <div className="services-wrapper">

      <div className="services-container">

        <div className="services-heading">

          <p>OUR SERVICES</p>

          <h2>
              What We <span>Offer</span>
          </h2>
          <img
              src={divider}
              alt=""
              className="section-divider"
          />

        </div>

        <div className="services-grid">

          {services.map((service, index) => {

            const Icon = service.icon;

            return (

              <div className="service-box" key={index}>

                <Icon className="service-icon" />

                <h6>{service.title}</h6>

              </div>

            );

          })}

        </div>

      </div>
      </div>

    </section>
  );
}

export default Services;
  