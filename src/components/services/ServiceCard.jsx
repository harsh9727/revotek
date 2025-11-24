import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import arrow from "../../assets/images/arrow-right.svg";
import InstallImage from "../../assets/images/installation.jpg";
import MaintenanceImage from "../../assets/images/maintanence.jpg";
import RepairImage from "../../assets/images/repairingservice.jpeg";
import ModernizationImage from "../../assets/images/morderize.jpg";
import AMCImage from "../../assets/images/annualcontact.jpg";
import SparePartsImage from "../../assets/images/sparepartssupply.jpg";

const ServiceCard = () => {
  const services = [
    {
      id: 1,
      title: "Elevator Installation",
      description:
        "Professional installation of passenger, goods, home, and hospital elevators with advanced technology, certified safety standards, and long-lasting performance.",
      icon: InstallImage,
      link: "/service-details/1",
    },
    {
      id: 2,
      title: "Elevator Maintenance",
      description:
        "Preventive and routine elevator maintenance that ensures smooth operation, reduces breakdowns, enhances safety, and improves the lifespan of your lift system.",
      icon: MaintenanceImage,
      link: "/service-details/2",
    },
    {
      id: 3,
      title: "Elevator Repair",
      description:
        "Fast and reliable elevator repair service for all brands and models — including emergency breakdown support to restore your lift’s safe operation quickly.",
      icon: RepairImage,
      link: "/service-details/3",
    },
    {
      id: 4,
      title: "Elevator Modernization",
      description:
        "Upgrade outdated elevators with modern control panels, energy-efficient motors, cabin redesign, and improved safety systems to meet today’s standards.",
      icon: ModernizationImage,
      link: "/service-details/4",
    },
    {
      id: 5,
      title: "Annual Maintenance Contract (AMC)",
      description:
        "Comprehensive and Non-Comprehensive AMC plans offering regular inspections, preventive servicing, priority support, and cost-effective elevator management.",
      icon: AMCImage,
      link: "/service-details/5",
    },
    {
      id: 6,
      title: "Elevator Spare Parts Supply",
      description:
        "Supply of genuine and high-quality elevator spare parts including control boards, door sensors, ropes, buttons, guide shoes, and VVVF drives for all major brands.",
      icon: SparePartsImage,
      link: "/service-details/6",
    },
  ];

  return (
    <section className="servicecard-section">
      <Container>
        <Row>
          {/* map() function with && logic */}
          {services &&
            services.map((service) => (
              <Col md={4} sm={6} xs={12} key={service.id}>
                <div className="servicecard">
                  <div className="servicecard-icon">
                    <img src={service.icon} alt={service.title} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link to={service.link} className="contact-btn">
                    <span> Learn More </span>{" "}
                    <span>
                      <img src={arrow} alt="arrow" />
                    </span>
                  </Link>
                </div>
              </Col>
            ))}
        </Row>
      </Container>
    </section>
  );
};

export default ServiceCard;
