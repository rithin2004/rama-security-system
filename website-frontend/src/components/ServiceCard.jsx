import React from "react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

const ServiceCard = ({ service: { title, description, iconURL } }) => {

  return (
    <div className="w-full max-w-sm min-h-[200px] bg-white shadow-md rounded-xl py-10 px-6 hover:shadow-xl transition border border-gray-100 text-center flex flex-col items-center">

      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#38BDF8]/12 mb-6">
        {iconURL ? (
          <img
            src={iconURL}
            alt={title}
            loading="lazy"
            className="w-12 h-12"
          />
        ) : (
          <ShieldCheckIcon className="w-12 h-12 text-[#0b2b7a]" />
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