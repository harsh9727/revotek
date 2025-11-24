import React from "react";
import { Container } from "react-bootstrap";
import bannerImg from "../../assets/images/homebanner.jpg";
import arrow from "../../assets/images/arrow-right.svg";
import { LuCircleArrowRight } from "react-icons/lu";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <section className="homebanner">
      <img src={bannerImg} alt="banner-img" />
      <Container>
        <div className="homebanner-content">
          <h5 className="subtitle">
            <LuCircleArrowRight />
            Welcome to Revotek Elevator Solution
          </h5>
          <h1 className="title rotating-text">
            <span>Your Trusted Partner in Elevator Service & Maintenance</span>
            <span>Reliable Elevator Solutions for Every Building</span>
            <span>Your Trusted Partner in Elevator Service & Maintenance</span>
            <span>Modern Elevators Built for Performance & Comfort</span>
          </h1>
          <p className="description">
            We design, install, and maintain elevators built for long-term
            performance. Our skilled technicians ensure seamless mobility and
            modern safety standards. Perfect for residential, commercial, and
            high-rise buildings.
          </p>
          <Link to="/about" className="contact-btn">
            <span>Explore More</span>
            <span>
              <img src={arrow} alt="arrow" />
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Banner;
