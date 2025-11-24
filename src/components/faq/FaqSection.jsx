import React from "react";
import { Accordion, Container } from "react-bootstrap";

const FaqSection = () => {
  return (
    <section className="faq-section py-5">
      <Container>
        <div className="faq-content">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>What types of elevators do you service?</Accordion.Header>
              <Accordion.Body>
                We provide maintenance and repair services for all types of elevators, including passenger lifts, goods lifts, hospital elevators, home lifts, and capsule elevators — regardless of brand or model.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>How often should an elevator be serviced?</Accordion.Header>
              <Accordion.Body>
                Elevators should ideally be serviced once every month or at least quarterly, depending on usage and type. Regular checkups help prevent sudden breakdowns and ensure safety.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>What does your maintenance service include?</Accordion.Header>
              <Accordion.Body>
                Our elevator maintenance service includes:
                <ul>
                  <li>Inspection of mechanical and electrical parts</li>
                  <li>Lubrication of moving components</li>
                  <li>Safety system testing</li>
                  <li>Cleaning of elevator pit, car top, and shaft</li>
                  <li>Performance and speed checks</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>Do you provide 24/7 emergency repair service?</Accordion.Header>
              <Accordion.Body>
                Yes, we offer 24/7 emergency repair services for all types of elevators. Our team is available to respond to any urgent issues, ensuring quick resolution and minimal downtime.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>Can you upgrade or modernize old elevators?</Accordion.Header>
              <Accordion.Body>
                Absolutely. We specialize in elevator modernization, which includes replacing outdated control systems, motors, and cabins to improve performance, safety, and aesthetics.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
              <Accordion.Header>Do you offer annual maintenance contracts (AMC)?</Accordion.Header>
              <Accordion.Body>
                Yes, we offer both comprehensive and non-comprehensive AMC plans tailored to your needs. Regular maintenance through AMC ensures smooth operation, extended lifespan, and reduced breakdowns.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6">
              <Accordion.Header>Do you supply elevator spare parts?</Accordion.Header>
              <Accordion.Body>
                Yes, we provide genuine and high-quality spare parts for all elevator brands to ensure long-term reliability and smooth operation.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="7">
              <Accordion.Header>Are your technicians certified?</Accordion.Header>
              <Accordion.Body>
                Yes, all our technicians are trained and certified professionals with years of experience in installation, maintenance, and repair of all major elevator systems.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="8">
              <Accordion.Header>What areas do you serve?</Accordion.Header>
              <Accordion.Body>
                We provide elevator services across Ahmedabad and nearby areas. Contact us to confirm service availability in your location.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="9">
              <Accordion.Header>How can I request a service or inspection?</Accordion.Header>
              <Accordion.Body>
                You can contact us via phone, email, or our website contact form to schedule a service visit or request a free inspection and quotation.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </Container>
    </section>
  );
};

export default FaqSection;
