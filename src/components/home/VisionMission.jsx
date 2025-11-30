import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Vision from "../../assets/images/visionimg.jpg";
import Mission from "../../assets/images/missionimg.png";

const VisionMission = () => {
    return (
        <section className="vision-mission">
            <Container>
                <div className="about-content">
                    <h5 className="sub-title">Our Vision Mission</h5>
                    <h3 className="title">Guided by Vision, Strengthened by Mission</h3>
                    <p className="description">
                        We are committed to delivering safe, reliable, and innovative elevator solutions that enhance everyday living. Our focus is on quality, customer trust, and long-term service excellence.
                    </p>
                </div>
                <Row>
                    <Col lg={6}>
                        <div className="visionmission-content">
                            <div className="vision-mission-img">
                                <img src={Vision} alt="Vision_img" />
                            </div>
                            <h3 className="title">Our Vision</h3>
                            <p className="description">
                                We aim to become a trusted leader in the elevator industry by setting new benchmarks in quality, efficiency, and customer satisfaction. Our focus is on delivering modern solutions that improve comfort, enhance safety, and elevate everyday living.
                            </p>
                            <ul className="list">
                                <li>To deliver world-class elevator solutions that ensure maximum safety and reliability.</li>
                                <li>To adopt modern technologies and smarter systems for smooth, efficient vertical movement.</li>
                                <li>To become a leading name known for professionalism, innovation, and long-term trust.</li>
                                <li>
                                    To continuously upgrade our expertise to meet future building requirements.
                                </li>
                                <li>
                                    To create sustainable, energy-efficient elevator systems that contribute to a better tomorrow.
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="visionmission-content">
                            <div className="vision-mission-img">
                                <img src={Mission} alt="Mission_img" />
                            </div>
                            <h3 className="title">Our Mission</h3>
                            <p className="description">
                                We are committed to ensuring every installation, upgrade, and maintenance job is completed with precision, professionalism, and customer-focused care. Our goal is to keep buildings moving smoothly—today, tomorrow, and always.
                            </p>
                            <ul className="list">
                                <li>To provide timely, efficient, and hassle-free elevator maintenance and support.</li>
                                <li>To ensure maximum safety and smooth operation through quality workmanship.</li>
                                <li>To deliver customized elevator solutions tailored to each building’s needs.</li>
                                <li>To adopt advanced technology that enhances performance and reduces downtime.</li>
                                <li>To maintain transparent communication and long-term relationships with clients.</li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default VisionMission;