import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import WhyChooseImg from "../../assets/images/why-choose.jpg";

const WhyChoose = () => {
  return (
    <section className="why-choose">
      <div className="left-img">
        <img src={WhyChooseImg} alt="img" data-aos="fade-right" />
      </div>
      <Container>
        <Row>
          <Col lg={{ span: 8, offset: 4 }}>
            <div className="why-choose-content">
              <div className="about-content" data-aos="fade-left">
                <h5 className="sub-title">Why Choose Us</h5>
                <h3 className="title">
                  Your Trusted Partner in Elevator Excellence
                </h3>
                <p className="description">
                  We combine advanced engineering, genuine parts, and dedicated
                  support to deliver seamless and long-lasting elevator
                  performance.
                </p>
              </div>
              <ul className="why-choose-list">
                <li className="why-choose-wrap" data-aos="fade-up">
                  <div className="number">01</div>
                  <div className="why-choose-details">
                    <h4 className="title">
                      Experienced & Certified Technicians
                    </h4>
                    <p className="text">
                      Our certified engineers bring years of hands-on experience
                      in installation, maintenance, repair, and modernization.
                      We follow global safety standards to ensure every elevator
                      runs smoothly and securely.
                    </p>
                  </div>
                </li>
                <li className="why-choose-wrap" data-aos="fade-up">
                  <div className="number">02</div>
                  <div className="why-choose-details">
                    <h4 className="title">Quick Response & 24/7 Support</h4>
                    <p className="text">
                      Elevator breakdowns demand urgency. Our team provides fast
                      response, round-the-clock support, and reliable
                      troubleshooting to minimize downtime and keep your
                      building operations running without interruptions.
                    </p>
                  </div>
                </li>
                <li className="why-choose-wrap" data-aos="fade-up">
                  <div className="number">03</div>
                  <div className="why-choose-details">
                    <h4 className="title">High-Quality Workmanship</h4>
                    <p className="text">
                      We use premium-grade spare parts, advanced diagnostic
                      tools, and proven maintenance practices to deliver durable
                      and high-performance elevator solutions you can rely on.
                    </p>
                  </div>
                </li>
                <li className="why-choose-wrap" data-aos="fade-up">
                  <div className="number">04</div>
                  <div className="why-choose-details">
                    <h4 className="title">Complete Elevator Solutions</h4>
                    <p className="text">
                      Whether you need elevator installation, AMC maintenance,
                      modernization, repair, inspections, or spare parts —
                      Revotek provides comprehensive and cost-effective
                      solutions under one roof.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default WhyChoose;
