import React from "react";
import Banner from "../components/home/Banner";
import Counter from "../components/home/Counter";
import HomeAbout from "../components/home/HomeAbout";
import HomeService from "../components/home/HomeService";
import WhyChoose from "../components/home/WhyChoose";
import VisionMission from "../components/home/VisionMission";
import Team from "../components/home/Team";
import TestimonialSection from "../components/home/TestimonialSection";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Download from "../components/home/Download";
// import Testimonial from "../components/home/Testimonial";
// import Advertisement from "../components/home/Advertisement";

const Home = () => {
     const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo === "about") {
      const section = document.getElementById("about");
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    }
  }, [location]);
    return (
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
            {/* <Testimonial /> */}
            {/* <Advertisement /> */}
        </div>
    );
}

export default Home;