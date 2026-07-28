import { FaQuoteLeft, FaStar } from "react-icons/fa";
import "../styles/Testimonials.css";

const testimonials = [
  {
    name: "Priya",
    review:
      "Amazing wedding planning service. Everything was perfectly organized.",
  },
  {
    name: "Rahul",
    review:
      "Birthday decoration exceeded our expectations. Highly recommended.",
  },
  {
    name: "Sneha",
    review:
      "Professional corporate event management with excellent support.",
  },
];

function Testimonials() {
  return (
    <section className="testimonial-section">

      <div className="testimonial-heading">

        <p>WHAT OUR CLIENTS SAY</p>

        <h2>
          Client <span>Testimonials</span>
        </h2>

        <div className="heading-line">
          <span></span>
          ✦
          <span></span>
        </div>

      </div>

      <div className="testimonial-grid">

        {testimonials.map((item, index) => (

          <div className="testimonial-card" key={index}>

            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            {/* <FaQuoteLeft className="quote" /> */}

            <p>{item.review}</p>

            <h4>{item.name}</h4>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Testimonials;