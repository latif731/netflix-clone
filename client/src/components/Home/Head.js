import React from "react";
import bg from "../../images/bgNetflix.jpg";

const Head = ({ title }) => {
  return (
    <div
      className="w-full lg:h-64 h-14 relative overflow-hidden rounded-md"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url(${bg}`,
      }}
    >
      <div className="absolute lg:top-24 top-16 w-full flex-colo">
        <h1 className="text-3xl lg:text-5xl text-white text-center font-bold">
          {title && title}
        </h1>
      </div>
    </div>
  );
};

export default Head;
