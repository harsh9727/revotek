import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const counterData = [
    { number: 19, suffix: "K", text: "Years Of Experience" },
    { number: 19, suffix: "K", text: "Successful Projects" },
    { number: 19, suffix: "K", text: "Satisfied Customers" },
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
                        <Col md={4} key={index}>
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
