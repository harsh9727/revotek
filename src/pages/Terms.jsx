import React from "react";
import Banner from "../components/comman/Banner";
import TermSection from "../components/terms/TermSection";
import SEO from "../components/comman/SEO";

const Terms = () => {
    return (
        <>
            <SEO 
                title="Terms & Conditions"
                description="Read Revotek's terms and conditions for elevator services, installation, maintenance, repair, and modernization services."
                keywords="terms and conditions, revotek terms, elevator services terms, lift services terms"
                canonical="https://revotek.com/terms"
                noIndex={true}
            />
            <div>
                <Banner title="Terms & Conditions" />
                <TermSection />
            </div>
        </>
    );
}

export default Terms;