import React from "react";
import Banner from "../components/comman/Banner";
import PrivacyPolicySection from "../components/privacypolicy/PrivacyPolicySection";
import SEO from "../components/comman/SEO";

const PrivacyPolicy = () => {
    return (
        <>
            <SEO 
                title="Privacy Policy"
                description="Read Revotek's privacy policy for data protection and user privacy for elevator services and website usage."
                keywords="privacy policy, revotek privacy, data protection, user privacy, elevator services privacy"
                canonical="https://revotek.com/privacy"
                noIndex={true}
            />
            <div>
                <Banner title="Privacy Policy" />
                <PrivacyPolicySection />
            </div>
        </>
    );
}

export default PrivacyPolicy;