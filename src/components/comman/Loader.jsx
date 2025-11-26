import React from "react";
import Logo from '../../assets/images/logo.png';
import './loader.css';

const Loader = () => {
    return (
        <div className="loader">
            <img src={Logo} alt="Logo" />
        </div>
    );
};

export default Loader;