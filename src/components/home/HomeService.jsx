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
import InstallImage from "../../assets/images/installation.jpg";
import MaintenanceImage from "../../assets/images/maintanence.jpg";
import RepairImage from "../../assets/images/repairingservice.jpeg";
import ModernizationImage from "../../assets/images/morderize.jpg";
import AMCImage from "../../assets/images/annualcontact.jpg";
import SparePartsImage from "../../assets/images/sparepartssupply.jpg";
const HomeService = () => {
  const sliderService = {
    dots: false,
    arrows:false,
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
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
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
    },
    {
      icon: MaintenanceIcon,
      title: "Elevator Maintenance",
      desc: "Preventive and routine elevator maintenance that ensures smooth operation, reduces breakdowns, enhances safety, and improves the lifespan of your lift system.",
      image: MaintenanceImage,
    },
    {
      icon: RepairIcon,
      title: "Elevator Repairs",
      desc: "Fast and reliable elevator repair service for all brands and models — including emergency breakdown support to restore your lift’s safe operation quickly.",
      image: RepairImage,
    },
    {
      icon: ModernizationIcon,
      title: "Elevator Modernization",
      desc: "Upgrade outdated elevators with modern control panels, energy-efficient motors, cabin redesign, and improved safety systems to meet today’s standards.",
      image: ModernizationImage,
    },
    {
      icon: AMCIcon,
      title: "Annual Maintenance Contract (AMC)",
      desc: "Comprehensive and Non-Comprehensive AMC plans offering regular inspections, preventive servicing, priority support, and cost-effective elevator management.",
      image: AMCImage,
    },
    {
      icon: SparePartsIcon,
      title: "Elevator Spare Parts Supply",
      desc: "Supply of genuine and high-quality elevator spare parts including control boards, door sensors, ropes, buttons, guide shoes, and VVVF drives for all major brands.",
      image: SparePartsImage,
    },
  ];

  return (
    <section className="home-service">
      <Container>
        <Row className="align-items-center">
          <Col md={6} lg={7}>
            <div className="service-header">
              <div className="about-content">
                <h5 className="sub-title">Services</h5>
                <h3 className="title">
                  Premium Elevator Solutions Tailored for Excellence
                </h3>
              </div>
            </div>
          </Col>
          <Col md={6} lg={5}>
            <div className="service-btn">
              <button className="contact-btn">
                <span> All Services </span>{" "}
                <span>
                  <img src={arrow} alt="arrow" />
                </span>
              </button>
            </div>
          </Col>
        </Row>
        <div className="service-slider">
          <Slider {...sliderService}>
            {services.map((service, index) => (
              <div className="servicecard" key={index}>
                <div className="servicecard-icon">
                  <img src={service.icon} alt="service-icon" />
                </div>

                <h3>{service.title}</h3>

                <p>{service.desc}</p>

                <div className="service-img">
                  <img src={service.image} alt="service-img" />
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
