import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import aboutImg1 from "../../assets/images/installation.jpg";
import aboutImg2 from "../../assets/images/aboutsectionimg.jpg";
import aboutImg3 from "../../assets/images/installation.jpg";
const HomeAbout = () => {
  return (
    <section className="homeabout">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="about-content">
              <h5 className="sub-title">About Us</h5>
              <h3 className="title">
                Powering the Future of Vertical Mobility
              </h3>
              <p className="description">
                Revotek Elevators is a trusted name in advanced elevator
                installation, maintenance, and modernization services. With
                years of industry expertise, we focus on delivering safe,
                seamless, and efficient vertical mobility solutions for
                residential, commercial, and industrial buildings across the
                Ahmedabad.
              </p>
              <ul>
                <li>
                 Certified technicians ensuring world-class safety, performance, and compliance.
                </li>
                <li>
                  Tailored installation and AMC service plans designed for every building type.
                </li>
                <li>
                  Fast response repair services backed by expert diagnostics and premium parts.
                </li>
                <li>
                  Smart, future-ready elevator technology for enhanced efficiency and reliability.
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={6}>
            <div className="about-imgs">
              <img
                src={aboutImg1}
                alt="aboutimg"
                className="about-img1 about-img"
              ></img>
              <img src={aboutImg2} alt="aboutimg" className="main-img"></img>
              <img
                src={aboutImg3}
                alt="aboutimg"
                className="about-img2 about-img"
              ></img>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HomeAbout;
