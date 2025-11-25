import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

// Import your images
import InstallImage from "../../assets/images/install-details-2.jpg";
import MaintenanceImage from "../../assets/images/maintanance-details.jpg";
import RepairImage from "../../assets/images/repairingservice.jpeg";
import ModernizationImage from "../../assets/images/mordenize-details.jpg";
import AMCImage from "../../assets/images/contract-details.jpg";
import SparePartsImage from "../../assets/images/spare-parts-details.jpg";

const ServiceDetailsSection = () => {
  const { id } = useParams();

  const serviceDetails = [
    {
      id: "1",
      title: "Elevator Installation",
      image: InstallImage,
      description:
        "Revotek Elevator Services provides professional elevator installation for residential, commercial, industrial, and institutional spaces. We design and install elevators with modern technology, precision engineering, and strict safety compliance to ensure long-term reliability.",
      process: [
        "Site Inspection & Assessment – Detailed structural evaluation to determine shaft space, load capacity, and elevator type.",
        "Customized Design & Planning – Tailored layout, cabin design, and control system selection based on your building’s requirements.",
        "Equipment Procurement & Quality Check – Sourcing certified and durable elevator components with multi-stage inspection.",
        "Mechanical & Electrical Installation – Smooth installation following IS/EN elevator safety standards.",
        "Testing, Quality Validation & Commissioning – Rigorous safety and performance testing before final approval.",
        "Handover, Documentation & Client Training – Certification, manuals, safety guidelines, and operational training.",
      ],
      features: [
        "Design options for MRL, gearless, hydraulic, and traction lifts",
        "Energy-efficient motors and advanced control systems",
        "Smooth ride quality and premium cabin interiors",
        "Installed as per industry safety standards",
      ],
      benefits: [
        "High-performance, long-lasting elevator setup",
        "Customized installation for any building type",
        "Low maintenance and superior efficiency",
      ],
    },

    {
      id: "2",
      title: "Elevator Maintenance",
      image: MaintenanceImage,
      description:
        "Our preventive elevator maintenance services ensure uninterrupted operation, improved safety, and extended equipment life. Revotek technicians follow detailed checklists and use genuine parts to keep your lift performing at its best.",
      process: [
        "Routine Inspection & Performance Testing – Monthly checks of all mechanical and electrical components.",
        "Lubrication & Adjustment – Smooth operation ensured by proper tuning and lubrication.",
        "Control Panel & Sensor Testing – Verification of control systems, motor performance, and safety devices.",
        "Door Mechanism & Brake Check – Ensuring smooth door movement and reliable braking system.",
        "Cleaning of Pit, Shaft & Car Top – Dust-free operation for better safety and performance.",
        "Service Report & Recommendations – Transparent reporting and technical feedback.",
      ],
      features: [
        "Preventive maintenance plan",
        "Detailed safety and performance inspections",
        "Use of approved and genuine spare parts",
        "24/7 breakdown and emergency support",
      ],
      benefits: [
        "Reduced breakdown frequency",
        "Longer equipment lifespan",
        "Safe and smooth elevator operation",
      ],
    },

    {
      id: "3",
      title: "Elevator Repair",
      image: RepairImage,
      description:
        "Revotek Elevator Services provides fast and accurate repair solutions for all elevator brands and models. Whether it’s a minor issue or a complete breakdown, our trained technicians restore your lift to safe working condition quickly.",
      process: [
        "Fault Diagnosis & Technical Analysis – Identifying root cause using advanced testing tools.",
        "Repair or Replacement of Faulty Components – Addressing issues in motor, controller, doors, or sensors.",
        "System Calibration & Software Adjustment – Fine-tuning control systems for smooth functioning.",
        "Safety Inspection After Repair – Ensuring compliance with safety standards before use.",
        "Final Testing & Customer Verification – Client walkthrough and performance confirmation.",
      ],
      features: [
        "Expert technicians trained across all elevator brands",
        "Quick emergency response for breakdowns",
        "Genuine spare parts with warranty",
        "Accurate diagnostics and repair",
      ],
      benefits: [
        "Faster elevator recovery",
        "Improved performance stability",
        "Cost-effective repair without unnecessary replacements",
      ],
    },

    {
      id: "4",
      title: "Elevator Modernization",
      image: ModernizationImage,
      description:
        "Upgrade your old or outdated elevator system with our advanced modernization solutions. Revotek enhances elevator safety, efficiency, comfort, and aesthetics with the latest technology and premium components.",
      process: [
        "Existing System Inspection & Evaluation – Identifying outdated components and performance gaps.",
        "Modernization Plan & Component Selection – Customized upgrade plan for performance and safety improvements.",
        "Replacement of Critical Parts – New control units, motors, drives, door systems, and indicators.",
        "Installation of Energy-Efficient Equipment – Reducing power consumption with modern technology.",
        "Testing, Commissioning & Certification – Ensuring smooth operation and compliance with new standards.",
        "Final Handover & User Guidance – Training on new features and safety guidelines.",
      ],
      features: [
        "Energy-efficient motors and VVVF drives",
        "Modern interior cabin designs",
        "Smart control panels and indicators",
        "Enhanced ride comfort and safety systems",
      ],
      benefits: [
        "Better aesthetics and user experience",
        "Reduced power consumption",
        "Higher system reliability and safety",
      ],
    },

    {
      id: "5",
      title: "Annual Maintenance Contract (AMC)",
      image: AMCImage,
      description:
        "Our AMC plans offer reliable, systematic maintenance and priority service to keep your elevator running at peak performance. Revotek provides both Comprehensive and Non-Comprehensive AMC options to suit your budget and requirements.",
      process: [
        "Initial System Health Check – Complete assessment before AMC activation.",
        "Scheduled Monthly/Quarterly Maintenance – Preventive servicing as per plan.",
        "Timely Replacement of Wear-and-Tear Parts – Genuine components for long life.",
        "Priority Service for AMC Clients – Immediate response for breakdowns.",
        "Performance Review & Reporting – Regular reports to ensure transparency.",
      ],
      features: [
        "Comprehensive & non-comprehensive plan options",
        "Urgent response for AMC clients",
        "Preventive & corrective maintenance",
        "Affordable annual packages",
      ],
      benefits: [
        "Zero-downtime elevator performance",
        "Reduced long-term repair costs",
        "24/7 peace of mind",
      ],
    },

    {
      id: "6",
      title: "Elevator Spare Parts Supply",
      image: SparePartsImage,
      description:
        "Revotek supplies high-quality, original elevator spare parts compatible with all major brands including OTIS, KONE, Johnson, Schindler, Mitsubishi, and more. We ensure durable, certified components for long-term performance.",
      process: [
        "Requirement Analysis & Part Verification – Matching exact model and specifications.",
        "Sourcing Genuine OEM Components – Quality-assured parts for reliability.",
        "Quality Inspection & Secure Packaging – Ensuring safe and damage-free delivery.",
        "Fast Dispatch & Delivery – Quick supply for urgent requirements.",
        "Installation Support (Optional) – Technician assistance for fitment.",
      ],
      features: [
        "Wide inventory of elevator components",
        "OEM-grade quality with warranty",
        "Competitive and transparent pricing",
        "Quick and reliable delivery",
      ],
      benefits: [
        "Reduced elevator downtime",
        "Reliable and long-lasting components",
        "Perfect compatibility with your system",
      ],
    },
  ];

  const service = serviceDetails.find((item) => item.id === id);

  if (!service) return <h3 className="text-center py-5">Service not found</h3>;

  return (
    <section className="service-details-section py-5">
      <Container>
        <div className="service-details-content">
          <img src={service.image} alt={service.title} className="serviceimg" />
          <h3>{service.title}</h3>
          <p>{service.description}</p>

          <h5>Process</h5>
          <ul>
            {service.process.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>

          <h5>Key Features</h5>
          <ul className="points">
            {service.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <h5>Benefits</h5>
          <ul className="points">
            {service.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default ServiceDetailsSection;
