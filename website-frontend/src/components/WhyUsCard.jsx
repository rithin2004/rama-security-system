import React from "react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

const WhyUsCard = ({ whyus }) => {

  const { title, description, iconURL } = whyus;

  return (

    <div
      className="
      bg-white
      px-6 py-8
      rounded-xl
      shadow-md
      hover:shadow-xl
      transition-all duration-300
      text-center
      flex flex-col items-center
      min-h-[220px]
      "
    >

      {/* ICON */}
      <div className="w-20 h-20 rounded-full bg-[#0b2b7a] flex items-center justify-center mb-5">

        {iconURL ? (
          <img src={iconURL} alt={title} className="w-12 h-12"/>
        ) : (
          <ShieldCheckIcon className="w-12 h-12 text-yellow-400" />
        )}

      </div>

      {/* TITLE */}
      <h3 className="font-semibold text-lg text-[#0b2b7a] mb-3">
        {title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>

    </div>

  );

};

export default WhyUsCard;