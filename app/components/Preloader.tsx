import React from "react";
import gif from "../assets/img/91 (1).svg";
import Image from "next/image";
const Preloader = () => {
  return (
    <div className="preloader">
      <Image src={gif} alt="Preloader" />
    </div>
  );
};

export default Preloader;
