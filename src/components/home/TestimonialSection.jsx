import React from "react";
import { Container } from "react-bootstrap";
import { FaStar } from "react-icons/fa6";
import Quotes from "../../assets/images/qoute.svg";
import Slider from "react-slick";
const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Building Owner",
    message:
      "Revotek provides exceptional elevator maintenance. Their team is professional, quick, and highly reliable. My building’s lift now runs smoother than ever!",
  },
  {
    name: "Sneha Patel",
    role: "Commercial Complex Manager",
    message:
      "Outstanding service! The technicians explained everything clearly and completed the repair on time. Highly recommended for any elevator needs.",
  },
  {
    name: "Amit Desai",
    role: "Apartment Secretary",
    message:
      "Their commitment to safety and quality is impressive. Revotek has become our trusted long-term elevator service partner.",
  },
];

const TestimonialSection = () => {
  const Testimonial = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="testimonial-section">
      <Container>
        <div className="about-content">
          <div className="about-content" data-aos="fade-right">
            <h5 className="sub-title">Testimonial</h5>
            <h3 className="title">
              What Our Clients Say
            </h3>
            <p className="description">
              Trusted by building owners, societies, and commercial spaces.
            </p>
          </div>
        </div>
        <Slider {...Testimonial}>
          {testimonials.map((testimonial, index) => (
            <div key={index}>
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
                  {testimonial.message}
                </p>
                <img src={Quotes} alt="icon" className="qoute-icon" />
                <h4 className="review-person-name">{testimonial.name}</h4>
                <p className="who-review-person">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default TestimonialSection;
