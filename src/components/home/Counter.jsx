import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const counterData = [
    { number: 10, text: "Years Of Experience" },
    { number: 560, text: "Successful Projects" },
    { number: 550, text: "Satisfied Customers" },
];

const Counter = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.4,
    });

    return (
        <section className="counter" ref={ref}>
            <Container>
                <Row className="text-center">
                    {counterData.map((item, index) => (
                        <Col sm={4}  key={index} data-aos="fade-up">
                            <div className="counter-content">
                                <h3 className="counter-number">
                                    {inView ? (
                                        <CountUp 
                                            start={0}
                                            end={item.number}
                                            duration={2}
                                            suffix={item.suffix}
                                        />
                                    ) : (
                                        "0" + item.suffix
                                    )}
                                    <FiPlus />
                                </h3>
                                <p className="counter-text">{item.text}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default Counter;
