import React from "react";
import Logo from "../../assets/images/logo.png"
const Advertisement = () => {
    return(
        <section className="advertisement">
            <div className="advertisement-content">
                <img src={Logo} alt="logo" className="companylogo"></img>
                <h3>Revotek Elevators Solution</h3>
            </div>
        </section>
    );
}
export default Advertisement;