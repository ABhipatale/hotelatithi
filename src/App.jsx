import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Signature from "./components/Signature";
import Statement from "./components/Statement";
import About from "./components/About";
import Menu from "./components/Menu";
import Stats from "./components/Stats";
import WhyChooseUs from "./components/WhyChooseUs";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Services from "./components/Services";
import Reservation from "./components/Reservation";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingCall from "./components/FloatingCall";

/**
 * Section order is the sales argument, in order: what we are known for, what
 * we believe, who we are, what we serve, why us, proof, services, then the
 * two ways to act — book, or come and find us.
 *
 * The ground alternates cream / cream-2 / maroon so no two adjacent sections
 * share a background; that banding is what gives the page its rhythm.
 */
export default function App() {
  return (
    <>
      {/* Two skip targets: past the nav into the page, and straight to the
          menu — which is what most people actually came for. */}
      <div className="sr-only focus-within:not-sr-only">
        <a
          href="#main"
          className="focus:fixed focus:left-4 focus:top-4 focus:z-70 focus:rounded-full focus:bg-vermillion focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <a
          href="#menu"
          className="focus:fixed focus:left-44 focus:top-4 focus:z-70 focus:rounded-full focus:bg-vermillion focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to menu
        </a>
      </div>

      <ScrollProgress />
      <Navbar />

      <main id="main">
        <Hero />
        <Signature />
        <Statement />
        <About />
        <Menu />
        <Stats />
        <WhyChooseUs />
        <Gallery />
        <Testimonials />
        <Services />
        <Reservation />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <FloatingCall />
    </>
  );
}
