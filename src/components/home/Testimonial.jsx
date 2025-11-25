import React from "react";
import { Container } from "react-bootstrap";
import TestimonialImg from "../../assets/images/morderize.jpg";
import TestimonialRightImg from "../../assets/images/building.jpg";
import Quotes from "../../assets/images/qoute.svg";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";

const Testimonial = () => {
  const TestimonialSlider = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }
  return (
    <section className="testimonial">
      <div className="right-img">
        <img src={TestimonialRightImg} alt="rightimg" />
      </div>
      <Container>
        <div className="testimonial-content">
          <div className="about-content">
            <h5 className="sub-title">Testimonial</h5>
            <h3 className="title">What Our Customers Says</h3>
          </div>
        </div>
        <div className="testimonial-slider">
          <Slider {...TestimonialSlider}>
            <div className="testimonial-info">
              <div className="testimonial-img">
                <img src={TestimonialImg} alt="testimonial-img" />
              </div>
              <div className="testimonial-slider-content">
                <ul>
                  <li>
                    <FaStar />
                  </li>
                  <li>
                    <FaStar />
                  </li>
                  <li>
                    <FaStar />
                  </li>
                  <li>
                    <FaStar />
                  </li>
                  <li>
                    <FaStar />
                  </li>
                </ul>
                <p className="review">
                  Revotek responded within an hour when our lift stopped
                  working. Their technician fixed the issue quickly and
                  explained everything clearly. Very professional service!
                </p>
                <img src={Quotes} alt="icon" className="qoute-icon" />
                <h4 className="review-person-name">Ramesh Kumar</h4>
                <p className="who-review-person">Apartment Owner</p>
              </div>
            </div>
            <div className="testimonial-info">
              <div className="testimonial-img">
                <img src={TestimonialImg} alt="testimonial-img" />
              </div>
              <div className="testimonial-slider-content">
                <ul>
                  <li>
                    <FaStar />
                  </li>
                  <li>
                    <FaStar />
                  </li>
                  <li>
                    <FaStar />
                  </li>
                  <li>
                    <FaStar />
                  </li>
                  <li>
                    <FaStar />
                  </li>
                </ul>
                <p className="review">
                  Revotek responded within an hour when our lift stopped
                  working. Their technician fixed the issue quickly and
                  explained everything clearly. Very professional service!
                </p>
                <img src={Quotes} alt="icon" className="qoute-icon" />
                <h4 className="review-person-name">Ramesh Kumar</h4>
                <p className="who-review-person">Apartment Owner</p>
              </div>
            </div>
            <div className="testimonial-info">
              <div className="testimonial-img">
                <img src={TestimonialImg} alt="testimonial-img" />
              </div>
              <div className="testimonial-slider-content">
                <ul>
                  <li>
                    <FaStar />
                  </li>
                  <li>
                    <FaStar />
                  </li>
                  <li>
                    <FaStar />
                  </li>
                  <li>
                    <FaStar />
                  </li>
                  <li>
                    <FaStar />
                  </li>
                </ul>
                <p className="review">
                  Revotek responded within an hour when our lift stopped
                  working. Their technician fixed the issue quickly and
                  explained everything clearly. Very professional service!
                </p>
                <img src={Quotes} alt="icon" className="qoute-icon" />
                <h4 className="review-person-name">Ramesh Kumar</h4>
                <p className="who-review-person">Apartment Owner</p>
              </div>
            </div>
            <div className="testimonial-info">
              <div className="testimonial-img">
                <img src={TestimonialImg} alt="testimonial-img" />
              </div>
              <div className="testimonial-slider-content">
                <ul>
                  <li>
                    <FaStar />
                  </li>
                  <li>
                    <FaStar />
                  </li>
                  <li>
                    <FaStar />
                  </li>
                  <li>
                    <FaStar />
                  </li>
                  <li>
                    <FaStar />
                  </li>
                </ul>
                <p className="review">
                  Revotek responded within an hour when our lift stopped
                  working. Their technician fixed the issue quickly and
                  explained everything clearly. Very professional service!
                </p>
                <img src={Quotes} alt="icon" className="qoute-icon" />
                <h4 className="review-person-name">Ramesh Kumar</h4>
                <p className="who-review-person">Apartment Owner</p>
              </div>
            </div>
          </Slider>
        </div>
      </Container>
    </section>
  );
};
export default Testimonial;
