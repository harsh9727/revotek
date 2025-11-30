import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Logo from "../assets/images/logo_white.png";
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { SlLocationPin } from "react-icons/sl";
import { IoArrowUp, IoCallOutline } from "react-icons/io5";
import { IoMailOpenOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer>
      <div className="main-footer">
        <Container>
          <Row>
            <Col lg={4} md={6} sm={12}>
              <div className="footer-content">
                <img src={Logo} alt="footer-logo" loading="lazy" />
                <p>
                  Your trusted partner for elevator installation, maintenance,
                  repair, and modernization — delivering safe, smooth, and
                  efficient vertical mobility solutions.
                </p>
                <ul>
                  <li>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <CiFacebook />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <CiInstagram />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/+919265999898"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaWhatsapp />
                    </a>
                  </li>
                </ul>
              </div>
            </Col>

            <Col lg={4} md={6} sm={12}>
              <div className="footer-contact">
                <h3>Support</h3>
                <ul>
                  <li>
                    <a
                      href="https://maps.app.goo.gl/BN8aBBGq3RfaYRzg8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="map"
                    >
                      <SlLocationPin />
                      <span>
                        Shree Hari Darshan Industrial Park Rd, Phase IV, Vatva
                        GIDC, Ahmedabad, Gujarat 382445
                      </span>
                    </a>
                  </li>

                  <li>
                    <a href="tel:+919265999898">
                      <IoCallOutline />
                      <span>+91 92659 99898</span>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:revotekservices@gmail.com">
                      <IoMailOpenOutline />
                      <span>revotekservices@gmail.com</span>
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col
              lg={4}
              md={12}
            >
              <div className="footer-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3491.5364399611703!2d72.64495699999999!3d22.976447500000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8942442fd955%3A0xb68dd4e3bba0491d!2sShree%20Hari%20Industrial%20Park!5e1!3m2!1sen!2sin!4v1761975771820!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer-bottom">
        <Container>
          <div className="copyright-text">
            <p>
              © 2025, All rights reserved by <span>Revotek</span>
            </p>
            <ul className="quick-links">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <HashLink smooth to="/#about">About Us</HashLink>
              </li>
              <li>
                <a href="/services">Our Services</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
            </ul>
          </div>
        </Container>
      </div>
      <button className="up-icon" onClick={scrollToTop}>
        <IoArrowUp />
      </button>
    </footer>
  );
};

export default Footer;
