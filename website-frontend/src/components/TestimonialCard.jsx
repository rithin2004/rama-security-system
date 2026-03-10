import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";

const TestimonialCard = ({ testimonial }) => {
  const { name, review, profilePhotoURL, rating } = testimonial;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300 border border-gray-100">
      
      {/* Profile */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={
            profilePhotoURL ||
            "https://cdn-icons-png.flaticon.com/512/847/847969.png"
          }
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />

        <div>
          <h4 className="font-semibold text-gray-800">{name}</h4>

          {/* Rating */}
          <div className="flex text-yellow-400">
            {Array.from({ length: rating }).map((_, i) => (
              <StarIcon key={i} className="w-4 h-4" />
            ))}
          </div>
        </div>
      </div>

      {/* Review */}
      <p className="text-sm text-gray-600 leading-relaxed">
        "{review}"
      </p>
    </div>
  );
};

export default TestimonialCard;