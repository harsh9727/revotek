import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TeamImg1 from "../../assets/images/user.jpg";
import { IoCallSharp } from "react-icons/io5";
const Team = () => {
  return (
    <section className="teams">
      <Container>
        <div className="about-content">
          <h5 className="sub-title">Our Teams</h5>
          <h3 className="title">Meet Our Expert Team</h3>
          <p className="description">
            A dedicated group of certified technicians, engineers, and support
            professionals committed to delivering safe, reliable, and
            high-quality elevator solutions.
          </p>
        </div>
        <Row>
          <Col lg={3} md={6} sm={6}>
            <div className="teams-card">
              <div className="teams-img">
                <img src={TeamImg1} alt="teams-img" />
                
              </div>
              <div className="teamperson-content">
                <div className="teamperson-info">
                  <h5>Dilip Varlekar</h5>
                  <p>CEO</p>
                </div>
                <a href="tell:1234567890">
                  <IoCallSharp />
                </a>
              </div>
            </div>
          </Col>
          <Col lg={3} md={6} sm={6}>
            <div className="teams-card">
              <div className="teams-img">
                <img src={TeamImg1} alt="teams-img" />
              </div>
              <div className="teamperson-content">
                <div className="teamperson-info">
                  <h5>John Doe</h5>
                  <p>Senior Elevator Technician</p>
                </div>
                <a href="tell:1234567890">
                  <IoCallSharp />
                </a>
              </div>
            </div>
          </Col>
          <Col lg={3} md={6} sm={6}>
            <div className="teams-card">
              <div className="teams-img">
                <img src={TeamImg1} alt="teams-img" />
              </div>
              <div className="teamperson-content">
                <div className="teamperson-info">
                  <h5>John Doe</h5>
                  <p>Assistant Technician</p>
                </div>
                <a href="tell:1234567890">
                  <IoCallSharp />
                </a>
              </div>
            </div>
          </Col>
          <Col lg={3} md={6} sm={6}>
            <div className="teams-card">
              <div className="teams-img">
                <img src={TeamImg1} alt="teams-img" />
              </div>
              <div className="teamperson-content">
                <div className="teamperson-info">
                  <h5>John Doe</h5>
                  <p>Elevator Technician</p>
                </div>
                <a href="tell:1234567890">
                  <IoCallSharp />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Team;
