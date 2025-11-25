import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import InstallIcon from "../../assets/images/install-icon.png";
import MaintenanceIcon from "../../assets/images/maintenance.png";
import RepairIcon from "../../assets/images/repair.png";
import ModernizationIcon from "../../assets/images/modernization.png";
import AMCIcon from "../../assets/images/amc.png";
import SparePartsIcon from "../../assets/images/spare-parts.png";
import arrow from "../../assets/images/arrow-right.svg";
import InstallImage from "../../assets/images/install.jpg";
import MaintenanceImage from "../../assets/images/maintanance.jpg";
import RepairImage from "../../assets/images/repairs.jpg";
import ModernizationImage from "../../assets/images/mordenize.jpg";
import AMCImage from "../../assets/images/contract.jpg";
import SparePartsImage from "../../assets/images/spare-parts.jpg";
import { Link } from "react-router-dom";
import { FaSquareArrowUpRight } from "react-icons/fa6";
const HomeService = () => {
  const sliderService = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const services = [
    {
      icon: InstallIcon,
      title: "Elevator Installation",
      desc: "Professional installation of passenger, goods, home, and hospital elevators with advanced technology, certified safety standards, and long-lasting performance.",
      image: InstallImage,
      link: "/service-details/1",
    },
    {
      icon: MaintenanceIcon,
      title: "Elevator Maintenance",
      desc: "Preventive and routine elevator maintenance that ensures smooth operation, reduces breakdowns, enhances safety, and improves the lifespan of your lift system.",
      image: MaintenanceImage,
      link: "/service-details/2",
    },
    {
      icon: RepairIcon,
      title: "Elevator Repairs",
      desc: "Fast and reliable elevator repair service for all brands and models — including emergency breakdown support to restore your lift’s safe operation quickly.",
      image: RepairImage,
      link: "/service-details/3",
    },
    {
      icon: ModernizationIcon,
      title: "Elevator Modernization",
      desc: "Upgrade outdated elevators with modern control panels, energy-efficient motors, cabin redesign, and improved safety systems to meet today’s standards.",
      image: ModernizationImage,
      link: "/service-details/4",
    },
    {
      icon: AMCIcon,
      title: "Annual Maintenance Contract (AMC)",
      desc: "Comprehensive and Non-Comprehensive AMC plans offering regular inspections, preventive servicing, priority support, and cost-effective elevator management.",
      image: AMCImage,
      link: "/service-details/5",
    },
    {
      icon: SparePartsIcon,
      title: "Elevator Spare Parts Supply",
      desc: "Supply of genuine and high-quality elevator spare parts including control boards, door sensors, ropes, buttons, guide shoes, and VVVF drives for all major brands.",
      image: SparePartsImage,
      link: "/service-details/6",
    },
  ];

  return (
    <section className="home-service">
      <Container>
        <Row className="align-items-center">
          <Col md={6} lg={7}>
            <div className="service-header" data-aos="fade-right">
              <div className="about-content">
                <h5 className="sub-title">Our Services</h5>
                <h3 className="title">
                  Premium Elevator Solutions Tailored for Excellence
                </h3>
              </div>
            </div>
          </Col>
          <Col md={6} lg={5}>
            <div className="service-btn" data-aos="fade-left">
              <Link to="/services" className="contact-btn">
                <span> All Services </span>{" "}
                <span>
                  <img src={arrow} alt="arrow" />
                </span>
              </Link>
            </div>
          </Col>
        </Row>
        <div className="service-slider">
          <Slider {...sliderService}>
            {services.map((service, index) => (
              <div className="servicecard" key={index} data-aos="flip-left">
                <div className="servicecard-icon">
                  <img src={service.icon} alt="service-icon" />
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <div className="service-img">
                  <img src={service.image} alt="service-img" />
                  <div className="service-overlay">
                    <Link to={service.link}>
                      <FaSquareArrowUpRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Container>
    </section>
  );
};

export default HomeService;
