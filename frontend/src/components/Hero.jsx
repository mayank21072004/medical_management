/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Accusantium beatae doloribus ad dignissimos labore esse molestiae
            deserunt? Dicta animi iste quas iusto! Odio nam, ex amet quibusdam
            id dolor ipsam.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;