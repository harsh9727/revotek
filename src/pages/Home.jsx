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

const Home = () => {
  const location = useLocation();
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
  );
}

export default Home;