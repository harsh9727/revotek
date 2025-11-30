import React from "react";
import Banner from "../components/home/Banner";
import Counter from "../components/home/Counter";
import HomeAbout from "../components/home/HomeAbout";
import HomeService from "../components/home/HomeService";
import WhyChoose from "../components/home/WhyChoose";
import VisionMission from "../components/home/VisionMission";
import Team from "../components/home/Team";
import TestimonialSection from "../components/home/TestimonialSection";
// import Testimonial from "../components/home/Testimonial";
// import Advertisement from "../components/home/Advertisement";

const Home = () => {
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
            {/* <Testimonial /> */}
            {/* <Advertisement /> */}
        </div>
    );
}

export default Home;