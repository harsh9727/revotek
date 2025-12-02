import React from "react";
import { Container } from "react-bootstrap";

const Download = () => {
    return (
        <section className="download">
            <Container>
                <div className="download-content">
                    <h3 className="title">Download Our Products Brochures</h3>
                    <a href="/products-brochures.pdf" download className="contact-btn">Products brochures</a>
                </div>
            </Container>
        </section>
    );
}

export default Download;