import React from "react";
import "./Arrow.css";

const ArrowAnimation = () => {

    const handleClick = () => {
        const section = document.getElementById("nosotros");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="arrow-container mt-48" onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="none" viewBox="0 0 24 24" className="arrow" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" stroke="#A711D0" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
        </div>
    );
};

export default ArrowAnimation;
