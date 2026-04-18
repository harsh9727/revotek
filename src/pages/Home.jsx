import { useEffect } from "react";
import Banner from "../components/home/Banner";
import Counter from "../components/home/Counter";
import HomeAbout from "../components/home/HomeAbout";
import HomeService from "../components/home/HomeService";
import WhyChoose from "../components/home/WhyChoose";
import VisionMission from "../components/home/VisionMission";
import Team from "../components/home/Team";
import TestimonialSection from "../components/home/TestimonialSection";
import { useLocation } from "react-router-dom";
import Download from "../components/home/Download";
import SEO from "../components/comman/SEO";

const Home = () => {
  const location = useLocation();

  // Structured data for home page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Revotek",
    "description": "Professional elevator installation, maintenance, repair, and modernization services in India",
    "url": "https://revotek.com",
    "telephone": "+91-XXXXXXXXXX",
    "email": "info@revotek.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressLocality": "Your City",
      "addressRegion": "Your State"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "20.5937",
      "longitude": "78.9629"
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "sameAs": [
      "https://www.facebook.com/revotek",
      "https://www.twitter.com/revotek",
      "https://www.linkedin.com/company/revotek"
    ],
    "serviceType": [
      "Elevator Installation",
      "Elevator Maintenance",
      "Elevator Repair",
      "Elevator Modernization",
      "Annual Maintenance Contract",
      "Elevator Spare Parts Supply"
    ]
  };

  useEffect(() => {
    if (location.state?.scrollTo === "about") {
      const section = document.getElementById("about");

      if (section) {
        setTimeout(() => {
          const headerHeight =
            document.querySelector(".comman-header")?.offsetHeight ||100;

          const sectionTop =
            section.getBoundingClientRect().top + window.scrollY - headerHeight;

          window.scrollTo({
            top: sectionTop,
            behavior: "smooth"
          });
        }, 200);
      }
    }
  }, [location]);
  
  return (
    <>
      <SEO 
        title="Home"
        description="Revotek - Your trusted partner for professional elevator installation, maintenance, repair, and modernization services. Serving residential, commercial, and industrial clients across India."
        keywords="elevator services, lift installation, elevator maintenance, elevator repair, AMC, elevator modernization, lift services India"
        canonical="https://revotek.com"
        ogImage="https://revotek.com/images/og-home.jpg"
        structuredData={structuredData}
      />
      <div>
        <Banner />
        <Counter />
        <HomeAbout />
        <WhyChoose />
        <VisionMission />
        <HomeService />
        <Team />
        <TestimonialSection />
        <Download />
      </div>
    </>
  );
}

export default Home;