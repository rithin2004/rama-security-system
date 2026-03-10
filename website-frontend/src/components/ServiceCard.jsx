import React from "react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

const ServiceCard = ({ service }) => {
  const { title, description, iconURL } = service;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300 border border-gray-100">
      
      {/* Icon */}
      <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-[#0b2b7a]/10 mb-4">
        {iconURL ? (
          <img src={iconURL} alt={title} className="w-8 h-8" />
        ) : (
          <ShieldCheckIcon className="w-8 h-8 text-[#0b2b7a]" />
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;