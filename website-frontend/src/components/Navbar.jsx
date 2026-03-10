import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-[#0b2b7a] text-white fixed top-0 left-0 w-full shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/companylogo.png"
            alt="Rama & Rama"
            className="h-10 w-10 md:h-12 md:w-12"
          />
          <h1 className="text-lg md:text-xl font-bold tracking-wide">
            Rama & Rama
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 text-sm md:text-base font-medium">
          <li>
            <Link to="/" className="hover:text-yellow-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-yellow-400 transition">
              About
            </Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-yellow-400 transition">
              Services
            </Link>
          </li>
          <li>
            <Link to="/testimonials" className="hover:text-yellow-400 transition">
              Testimonials
            </Link>
          </li>
          <li>
            <Link to="/whyus" className="hover:text-yellow-400 transition">
              Why Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-400 transition">
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center p-2 rounded-md hover:bg-[#173ca2] transition"
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6 text-white" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0b2b7a] border-t border-blue-800 shadow-inner">
          <ul className="flex flex-col items-start px-6 py-4 space-y-3 text-sm">
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link></li>
            <li><Link to="/testimonials" onClick={() => setMenuOpen(false)}>Testimonials</Link></li>
            <li><Link to="/whyus" onClick={() => setMenuOpen(false)}>Why Us</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;