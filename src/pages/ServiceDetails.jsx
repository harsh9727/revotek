import React from "react";
import Banner from "../components/comman/Banner";
import ServiceDetailsSection from "../components/servicedetails/ServiceDetailsSection";
import { useParams } from "react-router-dom";

const ServiceDetails = () => {
  const { id } = useParams();

  const services = [
    { id: "1", title: "Elevator Installation" },
    { id: "2", title: "Elevator Maintenance" },
    { id: "3", title: "Elevator Repair" },
    { id: "4", title: "Elevator Modernization" },
    { id: "5", title: "Annual Maintenance Contract (AMC)" },
    { id: "6", title: "Elevator Spare Parts Supply" },
  ];

  const serviceData = services.find((item) => item.id === id);

  return (
    <div>
      <Banner title={serviceData?.title || "Service Details"} />
      <ServiceDetailsSection />
    </div>
  );
};

export default ServiceDetails;
