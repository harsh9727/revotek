import React from "react";
import { Container } from "react-bootstrap";
import productBanner from "../../assets/images/comman-banner-3.jpg";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { IoHomeOutline } from "react-icons/io5";
const Banner = ({ title }) => {
  return (
    <section className="comman-banner">
      <img src={productBanner} alt="product-banner" loading="lazy" data-aos="fade-down" />
      <Container>
        <div className="commanbanner-content " >
          {/* <h3 data-aos="fade-right">{title}</h3> */}
          <Breadcrumb data-aos="fade-right">
            <Breadcrumb.Item href="/">
              <IoHomeOutline /> Home
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{title}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </Container>
    </section>
  );
};

export default Banner;
