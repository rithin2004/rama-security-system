import React, { useEffect, useState, useMemo } from "react";
import TestimonialCard from "../components/TestimonialCard";
import { getTestimonials } from "../api/website.api";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Testimonials() {

  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);
  const [transition, setTransition] = useState(true);
  const [paused, setPaused] = useState(false);

  /* LOAD TESTIMONIALS */
  useEffect(() => {

    const loadTestimonials = async () => {
      const data = await getTestimonials();

      if (Array.isArray(data)) {
        const sorted = [...data].sort(
          (a, b) => a.displayOrder - b.displayOrder
        );
        setTestimonials(sorted);
      }
    };

    loadTestimonials();

  }, []);

  /* AUTO SLIDE */
  useEffect(() => {

    if (!testimonials.length || paused) return;

    const interval = setInterval(() => {
      setTransition(true);
      setCurrent(prev => prev + 1);
    }, 4000);

    return () => clearInterval(interval);

  }, [testimonials, paused]);

  const handleNext = () => {
    setTransition(true);
    setCurrent(prev => prev + 1);
  };

  const handlePrev = () => {
    setTransition(true);
    setCurrent(prev => prev - 1);
  };

  /* INFINITE RESET */
  useEffect(() => {

    if (!testimonials.length) return;

    if (current === testimonials.length) {
      const timer = setTimeout(() => {
        setTransition(false);
        setCurrent(0);
      }, 700);

      return () => clearTimeout(timer);
    }

    if (current === -1) {
      const timer = setTimeout(() => {
        setTransition(false);
        setCurrent(testimonials.length - 1);
      }, 700);

      return () => clearTimeout(timer);
    }

  }, [current, testimonials]);

  /* EXTENDED ARRAY FOR INFINITE SLIDER */
  const extended = useMemo(() => (
    [...testimonials, ...testimonials.slice(0, 3)]
  ), [testimonials]);

  return (

    <section
      id="testimonials"
      className="bg-[#0b2b7a] py-20 px-6 md:px-20 scroll-mt-20 overflow-hidden"
    >

      <div className="max-w-7xl mx-auto relative">

        <h2 className="text-4xl font-bold text-white text-center">
          What Our Clients Say
        </h2>

        <div className="w-20 h-1 bg-yellow-400 mx-auto mt-3 rounded mb-10"></div>

        {!testimonials.length ? (

          <p className="text-white text-center">
            No testimonials found
          </p>

        ) : (

          <div className="overflow-hidden relative group"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          >

            {/* LEFT ARROW */}
            <button
              aria-label="Previous testimonial"
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2
              bg-white/20 text-white p-2 rounded-full z-20
              opacity-0 group-hover:opacity-100
              transition-all duration-300
              hover:bg-white/40 hover:scale-110"
            >
              <ChevronLeftIcon className="w-6 h-6"/>
            </button>

            {/* RIGHT ARROW */}
            <button
              aria-label="Next testimonial"
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2
              bg-white/20 text-white p-2 rounded-full z-20
              opacity-0 group-hover:opacity-100
              transition-all duration-300
              hover:bg-white/40 hover:scale-110"
            >
              <ChevronRightIcon className="w-6 h-6"/>
            </button>

            <div
              className={`flex gap-2 p-6 items-stretch ${
                transition ? "transition-transform duration-700" : ""
              }`}
              style={{
                transform: `translateX(-${current * 33.333}%)`
              }}
            >

              {extended.map((t, index) => (

                <div
                  key={index}
                  className="
                    flex justify-center
                    min-w-full
                    md:min-w-[50%]
                    lg:min-w-[33.333%]
                  "
                >
                  <TestimonialCard testimonial={t}/>
                </div>

              ))}

            </div>

          </div>

        )}

      </div>

    </section>
  );
}