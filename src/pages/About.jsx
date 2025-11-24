import React from "react";
import Banner from "../components/comman/Banner";
import AboutUs from "../components/about/AboutUs";
import Team from "../components/home/Team";
import WhyChoose from "../components/about/WhyChoose";
const About = () => {
    return (
        <div>
            <Banner title="About Us" />
            <AboutUs />
            <WhyChoose />
            <Team />
        </div>
    );
}

export default About;