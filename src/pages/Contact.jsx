import React from "react";
import ContactForm from "../components/contact/ContactForm";
import Banner from "../components/comman/Banner";
import SEO from "../components/comman/SEO";

const Contact = () => {
    // Structured data for contact page
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Revotek",
        "description": "Get in touch with Revotek for professional elevator services. Contact us for installation, maintenance, repair, and modernization services.",
        "url": "https://revotek.com/contact",
        "provider": {
            "@type": "LocalBusiness",
            "name": "Revotek",
            "telephone": "+91-XXXXXXXXXX",
            "email": "info@revotek.com",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN",
                "addressLocality": "Your City",
                "addressRegion": "Your State"
            }
        }
    };

    return (
        <>
            <SEO 
                title="Contact Us"
                description="Contact Revotek for professional elevator services. Get in touch for elevator installation, maintenance, repair, and modernization services across India."
                keywords="contact revotek, elevator contact, lift services contact, elevator maintenance contact, elevator repair contact"
                canonical="https://revotek.com/contact"
                ogImage="https://revotek.com/images/og-contact.jpg"
                structuredData={structuredData}
            />
            <div>
                <Banner title="Contact" />
                <ContactForm />
            </div>
        </>
    );
}

export default Contact;
