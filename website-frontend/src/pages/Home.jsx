import React, { useEffect, useState } from "react";
import About from "./About";
import Services from "./Services";
import Testimonials from "./Testimonials";
import WhyUs from "./WhyUs";
import Contact from "./Contact";

const slides = [
  {
    id: 1,
    title: "Professional Corporate Security",
    text: "Comprehensive security solutions tailored for your business and workplace safety.",
    image: "https://wallpaperaccess.com/full/508928.jpg",
  },
  {
    id: 2,
    title: "Apartment & Building Security",
    text: "Protecting residential communities with trained guards and 24/7 monitoring.",
    image: "https://wallpaperaccess.com/full/153070.jpg",
  },
  {
    id: 3,
    title: "Your Safety, Our Priority",
    text: "Trusted security services for businesses and residential properties across the region.",
    image: "https://png.pngtree.com/thumb_back/fw800/background/20230314/pngtree-beautiful-background-of-high-rise-buildings-image_1947772.jpg",
  }
];

const Home = () => {

  const [current, setCurrent] = useState(0);

  useEffect(() => {

    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);

  }, []);

  const scrollToContact = () => {

    const section = document.getElementById("contact-section");

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }

  };

  return (

    <main>

      {/* HERO */}
      <section
        id="home"
        className="relative w-full h-[calc(100vh-80px)] overflow-hidden scroll-mt-20"
      >

        {slides.map((slide, index) => (

          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >

            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center scale-105 animate-[heroZoom_10s_linear_infinite]"
              style={{ backgroundImage: `url(${slide.image})` }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60" />

            {/* Content */}
            <div className="relative z-20 px-6 md:px-16 lg:px-32 h-full flex items-center">

              <div className="max-w-3xl text-white">

                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
                  {slide.title}
                </h1>

                <p className="text-lg md:text-xl mb-6">
                  {slide.text}
                </p>

                <button
                  onClick={scrollToContact}
                  className="inline-block bg-white text-[#0b2b7a] px-6 py-3 rounded-lg font-medium transition-all duration-300 ease-out hover:bg-gray-200 hover:-translate-y-1 hover:scale-105 hover:shadow-xl active:scale-95"
                >
                  Contact Now
                </button>

              </div>

            </div>

          </div>

        ))}

        {/* Slider Dots */}
        <div className="absolute bottom-8 inset-x-0 flex justify-center gap-3 z-30">

          {slides.map((_, i) => (

            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition ${
                i === current
                  ? "bg-white scale-110 shadow-md"
                  : "bg-gray-400"
              }`}
            />

          ))}

        </div>

      </section>

      {/* Sections */}
      <About />
      <Services />
      <Testimonials />
      <WhyUs />
      <Contact />

    </main>

  );

};

export default Home;