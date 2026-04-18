import React from "react";
import Banner from "../components/comman/Banner";
import ServiceDetailsSection from "../components/servicedetails/ServiceDetailsSection";
import { useParams } from "react-router-dom";
import SEO from "../components/comman/SEO";

const ServiceDetails = () => {
  const { id } = useParams();

  const services = [
    { 
      id: "1", 
      title: "Elevator Installation",
      description: "Professional installation of passenger, goods, home, and hospital elevators with advanced technology and certified safety standards."
    },
    { 
      id: "2", 
      title: "Elevator Maintenance",
      description: "Preventive and routine elevator maintenance ensuring smooth operation and enhanced safety."
    },
    { 
      id: "3", 
      title: "Elevator Repair",
      description: "Fast and reliable elevator repair service for all brands and models with 24/7 emergency support."
    },
    { 
      id: "4", 
      title: "Elevator Modernization",
      description: "Upgrade outdated elevators with modern control panels, energy-efficient motors, and improved safety systems."
    },
    { 
      id: "5", 
      title: "Annual Maintenance Contract (AMC)",
      description: "Comprehensive and Non-Comprehensive AMC plans with regular inspections and priority support."
    },
    { 
      id: "6", 
      title: "Elevator Spare Parts Supply",
      description: "Supply of genuine and high-quality elevator spare parts for all major brands and models."
    },
  ];

  const serviceData = services.find((item) => item.id === id);

  // Dynamic structured data based on service
  const structuredData = serviceData ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceData.title,
    "description": serviceData.description,
    "url": `https://revotek.com/service-details/${id}`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Revotek",
      "url": "https://revotek.com"
    },
    "serviceType": serviceData.title,
    "areaServed": "India"
  } : null;

  return (
    <>
      {serviceData && (
        <SEO 
          title={serviceData.title}
          description={`${serviceData.title} by Revotek - ${serviceData.description}`}
          keywords={`${serviceData.title.toLowerCase()}, elevator services, lift services, revotek, ${serviceData.title.toLowerCase()} india`}
          canonical={`https://revotek.com/service-details/${id}`}
          ogImage={`https://revotek.com/images/og-${id}.jpg`}
          structuredData={structuredData}
        />
      )}
      <div>
        <Banner title={serviceData?.title || "Service Details"} />
        <ServiceDetailsSection />
      </div>
    </>
  );
};

export default ServiceDetails;
