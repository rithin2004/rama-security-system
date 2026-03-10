import React, { useEffect, useState } from "react";
import { getWhyUs } from "../api/website.api";
import WhyUsCard from "../components/WhyUsCard";

export default function WhyUs() {

  const [whyus, setWhyUs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadWhyUs = async () => {

      const data = await getWhyUs();

      setWhyUs(Array.isArray(data) ? data : []);
      setLoading(false);

    };

    loadWhyUs();

  }, []);

  return (

    <section
      id="whyus"
      className="bg-gray-50 py-16 md:py-20 px-6 md:px-20 scroll-mt-20"
    >

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-center text-[#0b2b7a]">
          Why Choose Rama & Rama?
        </h2>

        <div className="w-20 h-1 bg-yellow-400 mx-auto mt-3 rounded mb-5"></div>

        <p className="text-md text-center mb-10 max-w-2xl mx-auto">
          We stand out in the security industry with our commitment to excellence, cutting-edge technology, and unwavering dedication to client safety.
        </p>

        {loading ? (

          <p className="text-center text-gray-500">
            Loading content...
          </p>

        ) : whyus.length === 0 ? (

          <p className="text-center text-gray-500 text-lg">
            No whyus found
          </p>

        ) : (

          <div className="flex flex-wrap justify-center gap-8">

            {whyus.map(item => (

              <div
                key={item.whyusId}
                className="
                  w-full
                  md:w-[calc(50%-1rem)]
                  lg:w-[calc(25%-1.5rem)]
                  flex justify-center
                "
              >
                <WhyUsCard whyus={item} />
              </div>

            ))}

          </div>

        )}

      </div>

    </section>

  );

}