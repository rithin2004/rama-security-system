import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";

const TestimonialCard = ({ testimonial }) => {

  const {
    name = "",
    message = "",
    rating = 5,
    designation = "",
    company = ""
  } = testimonial;

  const displayTitle = company || name;

  return (

    <div
      className="
        bg-[#173c8c] text-white rounded-xl shadow-lg
        w-full max-w-[380px]
        h-[260px]
        p-6
        flex flex-col justify-between
        transition-all duration-300
        hover:-translate-y-2 hover:shadow-2xl
      "
    >
      

      {/* TOP CONTENT */}
      <div>

        <h3 className="font-semibold text-lg mb-2">
          {displayTitle}
        </h3>

        <div className="flex text-yellow-400 mb-3">

          {Array.from({ length: rating }).map((_, i) => (
            <StarIcon
              key={i}
              className="w-4 h-4"
              aria-hidden="true"
            />
          ))}

        </div>

        <p className="text-sm leading-relaxed italic line-clamp-4">
          "{message}"
        </p>

      </div>

      {/* PROFILE */}
      <div className="flex items-center gap-3 pt-4">

        <div
          className="
            w-10 h-10 rounded-full bg-blue-500
            flex items-center justify-center font-semibold
            shadow-md
          "
        >
          {name.charAt(0)}
        </div>

        <div>

          <p className="text-sm font-semibold">
            {name}
          </p>

          <p className="text-xs text-blue-200">
            {designation}
          </p>

        </div>

      </div>

    </div>

  );
};

export default TestimonialCard;