import React, { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import { getServices } from "../api/website.api";

export default function Services() {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadServices = async () => {
      try {
        const data = await getServices();
        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load services", error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    loadServices();

  }, []);

  return (
    <section
      id="services"
      className="bg-gray-50 py-16 md:py-20 px-6 md:px-20 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-center text-[#0b2b7a]">
          Our Security Services
        </h2>

        <div className="w-20 h-1 bg-yellow-400 mx-auto mt-3 rounded mb-5"></div>

        <p className="text-md text-center mb-10 max-w-2xl mx-auto">
          Comprehensive security solutions designed to protect your business, property, and peace of mind.
        </p>

        {loading ? (

          <p className="text-center text-gray-500">
            Loading services...
          </p>

        ) : services.length === 0 ? (

          <p className="text-center text-gray-500 text-lg">
            No services found
          </p>

        ) : (

          <div className="flex flex-wrap justify-center gap-8">

            {services.map((service) => (
              <div
                key={service.serviceId}
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] flex justify-center"
              >
                <ServiceCard service={service} />
              </div>
            ))}

          </div>

        )}

      </div>
    </section>
  );
}