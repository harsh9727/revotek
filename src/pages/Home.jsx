import React from "react";
import Banner from "../components/home/Banner";
import Counter from "../components/home/Counter";
import HomeAbout from "../components/home/HomeAbout";
import HomeService from "../components/home/HomeService";
import WhyChoose from "../components/home/WhyChoose";
// import Testimonial from "../components/home/Testimonial";
// import Advertisement from "../components/home/Advertisement";

const Home = () => {
    return (
        <div>
            <Banner />
            <Counter />
            <HomeAbout />
            <WhyChoose />
            <HomeService />
            {/* <Testimonial /> */}
            {/* <Advertisement /> */}
        </div>
    );
}

export default Home;