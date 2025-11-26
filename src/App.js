import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Terms from "./pages/Terms";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import PrivacyPolicy from "./pages/PrivacyPolicy";
// import HomepageHeader from "./layout/HomepageHeader";
import AOS from "aos";
import "aos/dist/aos.css";
import './App.css';
import './assets/css/responsive.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      // once: true,     
      offset: 100,    
    });
  }, []);
  return (
    <div className="App">
     <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service-details/:id" element={<ServiceDetails />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
