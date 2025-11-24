import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { LuMail } from "react-icons/lu";
import ContactImg from "../../assets/images/contact2.jpg";
const ContactForm = () => {
  return (
    <section className="contactform">
      <Container>
        <Row>
          <Col lg={6}>
            <div className="contactform-left">
              <h5>Get In Touch</h5>
              <h3>We’re here to help!</h3>
              <p>
                If you have any questions about your order, products, or
                anything else — just reach out and we'll get back to you as soon
                as possible.
              </p>
              <form>
                <Row>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                      />
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone"
                      />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                      />
                    </div>
                  </Col>

                  <Col md={12}>
                    <div className="form-group">
                      <label htmlFor="message">How can we help you?</label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        placeholder="Enter your message"
                        rows="5"
                      ></textarea>
                    </div>
                  </Col>
                  <Col md={4} sm={5} xs={6}>
                    <button type="submit" className="submit-btn">
                      Send Message
                    </button>
                  </Col>
                </Row>
              </form>
            </div>
          </Col>
          <Col lg={6}>
            <div className="contactform-right">
              <div className="person-img">
                <img src={ContactImg} alt="person" loading="lazy" />
              </div>
              <div className="contact-list">
                <ul>
                  <li>
                    <a href="tel:+919265999898">
                      <span className="contact-list-icon">
                        <FiPhoneCall />
                      </span>
                      <div className="contact-list-text">
                        <h5>Phone</h5>
                        <p>+91 92659 99898</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:revotekservices@gmail.com">
                      <span className="contact-list-icon">
                        <LuMail />
                      </span>
                      <div className="contact-list-text">
                        <h5>Mail</h5>
                        <p>revotekservices@gmail.com</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="https://maps.app.goo.gl/BN8aBBGq3RfaYRzg8" target="_blank" rel="noopener noreferrer">
                      <span className="contact-list-icon">
                        <IoLocationOutline />
                      </span>
                      <div className="contact-list-text">
                        <h5>Address</h5>
                        <p>Shree Hari Darshan Industrial Park Rd, Phase IV, Vatva GIDC,<br /> Ahmedabad, Gujarat 382445</p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactForm;
