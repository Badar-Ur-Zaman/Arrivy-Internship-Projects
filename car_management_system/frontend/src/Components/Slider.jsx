import React from "react";
import defaultImg from "../images/default.jpg";

const Slider = () => {

  return (
    <div className="overflow-hidden h-screen flex items-center justify-center bg-gray-100 relative">
      <img
        src={defaultImg}
        alt=""
        className="object-contain transition-opacity duration-1000"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>

  );
};

export default Slider;
