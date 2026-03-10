import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCompany } from "../api/website.api";

export default function Footer() {

  const [company, setCompany] = useState(null);

  useEffect(() => {

    async function loadCompany() {
      try {
        const data = await getCompany();
        setCompany(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadCompany();

  }, []);

  return (
    <footer className="bg-[#163c8c] text-white pt-14 pb-6">

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        <div>
          <h3 className="font-semibold text-lg mb-4">
            ABOUT {company?.companyName || "Rama Security"}
          </h3>

          <p className="text-sm leading-relaxed">
            {company?.about || "Professional security solutions."}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">USEFUL LINKS</h3>

          <ul className="space-y-2 text-sm">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/whyus">Why Us</Link></li>
            <li><Link to="/testimonials">Testimonials</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">OUR SOLUTIONS</h3>

          <ul className="space-y-2 text-sm">
            <li>Corporate Security</li>
            <li>Apartment Security</li>
            <li>24/7 Monitoring</li>
            <li>Event Security</li>
          </ul>
        </div>

        <div>

          <h3 className="font-semibold text-lg mb-4">
            CONTACT DETAILS
          </h3>

          <p className="text-sm font-semibold">
            {company?.companyName}
          </p>

          <p className="text-sm mt-3">
            {company?.address}
          </p>

          <p className="text-sm mt-3">
            {company?.phone}
          </p>

          <p className="text-sm mt-3">
            {company?.email}
          </p>

        </div>

      </div>

      <div className="border-t border-white/20 mt-10 pt-4 px-4">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between text-sm">

          <p>
            © {new Date().getFullYear()} {company?.companyName}. All rights reserved.
          </p>

          <div className="flex gap-6 mt-2 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Careers</span>
          </div>

        </div>

      </div>

    </footer>
  );
}