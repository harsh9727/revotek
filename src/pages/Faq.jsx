import React from "react";
import Banner from "../components/comman/Banner";
import FaqSection from "../components/faq/FaqSection";
import SEO from "../components/comman/SEO";

const Faq = () => {
    // Structured data for FAQ page
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "name": "Frequently Asked Questions",
        "description": "Common questions about Revotek's elevator services, installation, maintenance, repair, and modernization.",
        "url": "https://revotek.com/faq",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What types of elevators do you service?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We service all types of elevators including passenger, goods, home, hospital, and commercial elevators."
                }
            },
            {
                "@type": "Question",
                "name": "Do you provide emergency elevator repair services?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we provide 24/7 emergency elevator repair services across India."
                }
            },
            {
                "@type": "Question",
                "name": "What is included in your AMC services?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our AMC includes regular maintenance, inspections, priority support, and cost-effective elevator management."
                }
            }
        ]
    };

    return (
        <>
            <SEO 
                title="Frequently Asked Questions"
                description="Find answers to common questions about Revotek's elevator services, installation, maintenance, repair, and modernization services."
                keywords="elevator FAQ, lift FAQ, elevator services FAQ, elevator maintenance FAQ, elevator repair FAQ"
                canonical="https://revotek.com/faq"
                ogImage="https://revotek.com/images/og-faq.jpg"
                structuredData={structuredData}
            />
            <div>
                <Banner title="Faq" />
                <FaqSection />
            </div>
        </>
    );
}

export default Faq;
