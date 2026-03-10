import React from "react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

const ServiceCard = ({ service: { title, description, iconURL } }) => {

  return (
    <div className="group w-full max-w-sm min-h-[200px] bg-white shadow-md rounded-xl py-10 px-6 border border-gray-100 text-center flex flex-col items-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#38BDF8]/10 mb-6 transition-all duration-300 group-hover:bg-[#38BDF8]/20">
        {iconURL ? (
          <img
            src={iconURL}
            alt={title}
            loading="lazy"
            className="w-12 h-12 text-[#0b2b7a] transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <ShieldCheckIcon className="w-12 h-12 text-[#0b2b7a] transition-transform duration-300 group-hover:scale-110" />
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {title}
      </h3>

      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>

    </div>
  );
};

export default ServiceCard;