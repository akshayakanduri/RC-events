import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import WhyChooseUs from "../components/WhyChooseUs";

function Landing() {
  return (
    <>
      <Hero />

      {/* <div className="container"> */}
        <Services />
        <WhyChooseUs />
        <Testimonials />
      {/* </div> */}

      <Footer />
    </>
  );
}

export default Landing;