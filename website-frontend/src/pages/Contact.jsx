import React, { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBuilding
} from "react-icons/fa";

import { IoLogoWhatsapp } from "react-icons/io";
import { getCompany } from "../api/website.api";

export default function Contact() {

  const [companyInfo, setCompanyInfo] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  useEffect(() => {

    async function loadCompany() {
      try {
        const data = await getCompany();
        setCompanyInfo(data || {});
      } catch (err) {
        console.error("Failed loading company info", err);
      }
    }

    loadCompany();

  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendToWhatsApp = () => {

    const { name, email, phone, service, message } = formData;

    let whatsappNumber = companyInfo?.phone || "";

    // remove spaces or symbols
    whatsappNumber = whatsappNumber.replace(/\D/g, "");

    // add India code if missing
    if (!whatsappNumber.startsWith("91")) {
      whatsappNumber = "91" + whatsappNumber;
    }

    // open whatsapp directly if form empty
    if (!name && !email && !phone && !service && !message) {
      window.open(`https://wa.me/${whatsappNumber}`, "_blank");
      return;
    }

    if (!name || !email || !phone || !service || !message) {
      alert("Please fill all fields before sending!");
      return;
    }

    const whatsappMessage =
      `Hello!\n\nNew Contact Request:\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n` +
      `Service: ${service}\n` +
      `Message: ${message}`;

    const link =
      `https://wa.me/${whatsappNumber}?text=` +
      encodeURIComponent(whatsappMessage);

    window.open(link, "_blank");

    alert("Message sent successfully!");
  };

  const addressLines = [
    companyInfo?.address
  ].filter(Boolean);

  return (
    <section
      id="contact-section"
      className="min-h-screen bg-cover bg-center relative flex justify-center items-center py-16 md:py-20 px-6 md:px-20 scroll-mt-20"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1556155092-8707de31f9c4?fit=crop&w=1600&q=80')"
      }}
    >

      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 z-[10] w-full">

        {/* LEFT INFO CARD */}

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl text-white">

          <h2 className="text-3xl font-bold mb-6 text-yellow-400">
            Get In Touch
          </h2>

          <div className="flex items-center gap-4 mb-6">

            <div className="bg-yellow-400 text-black p-3 rounded-lg text-xl shadow-lg">
              <FaBuilding />
            </div>

            <div>
              <h4 className="font-semibold text-yellow-400">Company</h4>
              <p>{companyInfo?.companyName}</p>
            </div>

          </div>

          <div className="flex items-center gap-4 mb-6">

            <div className="bg-yellow-400 text-black p-3 rounded-lg text-xl shadow-lg">
              <FaMapMarkerAlt />
            </div>

            <div>
              <h4 className="font-semibold text-yellow-400">Address</h4>

              {addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}

            </div>

          </div>

          <div className="flex items-center gap-4 mb-6">

            <div className="bg-yellow-400 text-black p-3 rounded-lg text-xl shadow-lg">
              <FaPhoneAlt />
            </div>

            <div>
              <h4 className="font-semibold text-yellow-400">Phone</h4>
              <p>{companyInfo?.phone}</p>
            </div>

          </div>

          <div className="flex items-center gap-4 mb-8">

            <div className="bg-yellow-400 text-black p-3 rounded-lg text-xl shadow-lg">
              <FaEnvelope />
            </div>

            <div>
              <h4 className="font-semibold text-yellow-400">Email</h4>
              <p>{companyInfo?.email}</p>
            </div>

          </div>

          <button
            onClick={sendToWhatsApp}
            className="w-full bg-green-500 hover:bg-green-600 transition text-white font-semibold px-4 py-3 rounded-lg flex items-center justify-center gap-3 text-lg shadow-lg"
          >
            <IoLogoWhatsapp className="text-2xl" />
            Contact via WhatsApp
          </button>

        </div>

        {/* RIGHT FORM CARD */}

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl text-white">

          <h2 className="text-3xl font-bold mb-6 text-yellow-400">
            Send Us a Message
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">

            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Your Name"
              onChange={handleChange}
              className="bg-white/85 text-black rounded-xl px-4 py-3 shadow-md focus:ring-2 focus:ring-yellow-400"
            />

            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="your@email.com"
              onChange={handleChange}
              className="bg-white/85 text-black rounded-xl px-4 py-3 shadow-md focus:ring-2 focus:ring-yellow-400"
            />

          </div>

          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            placeholder="Your Phone Number"
            onChange={handleChange}
            className="w-full bg-white/85 text-black p-3 rounded-xl shadow-md mt-4 focus:ring-2 focus:ring-yellow-400"
          />

          <select
            name="service"
            onChange={handleChange}
            className="w-full bg-white/85 text-black p-3 rounded-xl mt-4 shadow-md focus:ring-2 focus:ring-yellow-400"
          >

            <option value="">Select a service</option>
            <option>Security Guard Services</option>
            <option>Bodyguard / PSO</option>
            <option>Commercial Security</option>
            <option>Residential Security</option>

          </select>

          <textarea
            name="message"
            rows="5"
            placeholder="Tell us about your security requirements..."
            onChange={handleChange}
            className="w-full bg-white/85 text-black p-3 rounded-xl mt-4 shadow-md resize-none focus:ring-2 focus:ring-yellow-400"
          ></textarea>

          <button
            onClick={sendToWhatsApp}
            className="w-full bg-yellow-500 text-black font-semibold py-3 rounded-xl shadow-xl hover:bg-yellow-400 hover:scale-[1.05] transition-all duration-200 mt-6"
          >
            Send Message
          </button>

        </div>

      </div>

    </section>
  );
}