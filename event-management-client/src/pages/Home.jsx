import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
// import WaveDivider from "../components/WaveDivider";
import WhyChooseUs from "../components/WhyChooseUs";

function Home() {
  return (
    <>
      <Hero />

      {/* <WaveDivider /> */}

      <Services />

      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;