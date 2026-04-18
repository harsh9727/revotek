import React from "react";
import Banner from "../components/comman/Banner";
import ServiceCard from "../components/services/ServiceCard";
import SEO from "../components/comman/SEO";

const Services = () => {
    // Structured data for services page
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Elevator Services",
        "description": "Complete range of elevator services including installation, maintenance, repair, modernization, and AMC contracts",
        "provider": {
            "@type": "LocalBusiness",
            "name": "Revotek",
            "url": "https://revotek.com"
        },
        "serviceType": [
            "Elevator Installation",
            "Elevator Maintenance", 
            "Elevator Repair",
            "Elevator Modernization",
            "Annual Maintenance Contract",
            "Elevator Spare Parts Supply"
        ],
        "areaServed": "India"
    };

    return (
        <>
            <SEO 
                title="All Services"
                description="Complete elevator services by Revotek - professional installation, maintenance, repair, modernization, and annual maintenance contracts for residential and commercial elevators."
                keywords="elevator services, lift services, elevator installation, elevator maintenance, elevator repair, AMC, elevator modernization, lift spare parts"
                canonical="https://revotek.com/services"
                ogImage="https://revotek.com/images/og-services.jpg"
                structuredData={structuredData}
            />
            <div>
                <Banner title="All Services" />
                <ServiceCard />
            </div>
        </>
    );
}

export default Services;
