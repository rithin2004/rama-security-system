import React, { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const sections = [
  "home",
  "about",
  "services",
  "testimonials",
  "whyus",
  "contact-section"
];

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const scrollToSection = (id) => {

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    setMenuOpen(false);

  };

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(window.scrollY > 40);
      setMenuOpen(false);

      const scrollPosition = window.scrollY + 120;

      for (const id of sections) {

        const section = document.getElementById(id);
        if (!section) continue;

        const offsetTop = section.offsetTop;
        const offsetHeight = section.offsetHeight;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActive(id);
          break;
        }

      }

    };

    const handleClickOutside = (e) => {
      if (!e.target.closest("nav")) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };

  }, []);

  const navItem = (id, label) => (

    <button
      onClick={() => scrollToSection(id)}
      className={`relative transition-all duration-300 tracking-wide
        after:absolute after:-bottom-1 after:left-0 after:h-[2px]
        after:w-full after:origin-left after:transition-transform after:duration-300
        ${
          active === id
            ? "text-yellow-400 after:scale-x-100 after:bg-gradient-to-r after:from-yellow-300 after:to-yellow-500"
            : "hover:text-yellow-400 after:scale-x-0 hover:after:scale-x-100 after:bg-gradient-to-r after:from-yellow-300 after:to-yellow-500"
        }
        hover:traking-wider
      `}
    >
      {label}
    </button>

  );

  return (

    <nav
      className={`fixed top-0 left-0 w-full z-50 text-white transition-all duration-300 ${
        scrolled
          ? "bg-[#0b2b7a]/90 backdrop-blur-lg shadow-[0_10px_40px_rgba(0,0,0,0.35)] border-b border-white/10"
          : "bg-[#0b2b7a]"
      }`}
    >

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-5 md:py-4">

        {/* Logo */}
        <button
          onClick={() => scrollToSection("home")}
         className="flex items-center space-x-2 transition-all duration-300 hover:scale-[1.05]"
        >

          <img
            src="/companylogo.png"
            alt="Rama & Rama"
            className="h-10 w-10 md:h-12 md:w-12 transition duration-300 group-hover:drop-shadow-[0_0_6px_rgba(255,215,0,0.7)]"
          />

          <h1 className="text-lg md:text-xl font-bold tracking-wide">
            Rama & Rama
          </h1>

        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 text-sm md:text-base font-medium">

          <li>{navItem("home","Home")}</li>
          <li>{navItem("about","About")}</li>
          <li>{navItem("services","Services")}</li>
          <li>{navItem("testimonials","Testimonials")}</li>
          <li>{navItem("whyus","Why Us")}</li>
          <li>{navItem("contact-section","Contact")}</li>

        </ul>

        {/* Mobile Toggle */}
        <button
          aria-label="Toggle menu"
          onClick={(e) => {
            e.stopPropagation();
            toggleMenu();
          }}
          className="md:hidden p-2 rounded-md hover:bg-[#173ca2] transition"
        >

          {menuOpen
            ? <XMarkIcon className="h-6 w-6"/>
            : <Bars3Icon className="h-6 w-6"/>
          }

        </button>

      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#0b2b7a] border-t border-blue-800 shadow-lg transform transition-all duration-300 ${
          menuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >

        <ul className="flex flex-col items-start px-6 py-6 space-y-4 text-base">

          <li>{navItem("home","Home")}</li>
          <li>{navItem("about","About")}</li>
          <li>{navItem("services","Services")}</li>
          <li>{navItem("testimonials","Testimonials")}</li>
          <li>{navItem("whyus","Why Us")}</li>
          <li>{navItem("contact-section","Contact")}</li>

        </ul>

      </div>

    </nav>

  );

};

export default Navbar;