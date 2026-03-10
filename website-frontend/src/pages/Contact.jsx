import React, { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBuilding,
  FaInstagram,
  FaUser, FaPhone, FaShieldAlt
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";

import { IoLogoWhatsapp } from "react-icons/io";
import { getCompany } from "../api/website.api";
import { getServices } from "../api/website.api";
import toast from "react-hot-toast";

export default function Contact() {

  const [companyInfo, setCompanyInfo] = useState({});
  const [services, setServices] = useState([]);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});
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
        const serviceData = await getServices();
        setServices(Array.isArray(serviceData) ? serviceData : []);
      } catch (err) {
        console.error("Failed loading company info", err);
      }
    }

    loadCompany();

  }, []);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }

  };

  const copyToClipboard = (text) => {
    if (!text) return;

    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success("Copied to clipboard");
      })
      .catch(() => {
        toast.error("Failed to copy");
      });
  };

  const openMap = (address) => {
    if (!address) return;

    const mapUrl =
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(address);

    window.open(mapUrl, "_blank");
  };

  const openWhatsAppDirect = () => {

    let whatsappNumber = companyInfo?.phone || "";
    whatsappNumber = whatsappNumber.replace(/\D/g, "");

    if (!whatsappNumber.startsWith("91")) {
      whatsappNumber = "91" + whatsappNumber;
    }

    const introMessage =
      `Hello!\n\n` +
      `I would like to know more about your security services.\n` +
      `Could you please provide more details?\n\n` +
      `Thank you.`;

    const link =
      `https://wa.me/${whatsappNumber}?text=` +
      encodeURIComponent(introMessage);

    window.open(link, "_blank");

  };

  const sendToWhatsApp = () => {

    if (sending) return;
      setSending(true);

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
      setSending(false);
      return;
    }

    const newErrors = {};

    if (!name) newErrors.name = true;
    if (!email) newErrors.email = true;
    if (!phone) newErrors.phone = true;
    if (!service) newErrors.service = true;
    if (!message) newErrors.message = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all required fields");
      setSending(false);
      return;
    }

    setErrors({});

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

    toast.success("Opening WhatsApp...");
    setSending(false);
  };

  const addressLines = [
    companyInfo?.address
  ].filter(Boolean);

  return (
    <section
      id="contact-section"
      className="min-h-screen bg-cover bg-center relative flex justify-center items-center py-16 md:py-20 px-6 md:px-20 scroll-mt-20 overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1556155092-8707de31f9c4?fit=crop&w=1600&q=80')"
      }}
    >

      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Spotlight glow */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[700px] h-[700px] bg-white/10 blur-3xl rounded-full"></div>
      </div>

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
                <div key={line}>
                  <p>
                    {line}
                  </p>

                  <span
                    className="text-sm text-yellow-300 cursor-pointer hover:underline"
                    onClick={() => openMap(line)}
                  >
                    Open in Maps →
                  </span>
                </div>
              ))}

            </div>

          </div>

          <div className="flex items-center gap-4 mb-6">

            <div className="bg-yellow-400 text-black p-3 rounded-lg text-xl shadow-lg">
              <FaPhoneAlt />
            </div>

            <div>

              <h4 className="font-semibold text-yellow-400">Phone</h4>

              <p
                className="cursor-pointer hover:text-yellow-300 transition"
                onClick={() => {
                  const phone = companyInfo?.phone;

                  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                    window.location.href = `tel:${phone}`;
                  } else {
                    copyToClipboard(phone);
                  }
                }}
              >
                {companyInfo?.phone}
              </p>

              {companyInfo?.alternatePhone && (
                <p
                  className="cursor-pointer hover:text-yellow-300 transition text-sm"
                  onClick={() => {
                    const phone = companyInfo?.alternatePhone;

                    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                      window.location.href = `tel:${phone}`;
                    } else {
                      copyToClipboard(phone);
                    }
                  }}
                >
                  {companyInfo.alternatePhone}
                </p>
              )}

            </div>

          </div>

          <div className="flex items-center gap-4 mb-8">

            <div className="bg-yellow-400 text-black p-3 rounded-lg text-xl shadow-lg">
              <FaEnvelope />
            </div>

            <div>

              <h4 className="font-semibold text-yellow-400">Email</h4>

              <p
                className="cursor-pointer hover:text-yellow-300 transition"
                onClick={() => window.location.href = `mailto:${companyInfo?.email}`}
              >
                {companyInfo?.email}
              </p>

              {companyInfo?.alternateEmail && (
                <p
                  className="cursor-pointer hover:text-yellow-300 transition text-sm"
                  onClick={() => window.location.href = `mailto:${companyInfo.alternateEmail}`}
                >
                  {companyInfo.alternateEmail}
                </p>
              )}

            </div>

          </div>

          <div className="flex items-center gap-4 mb-8">

            <div className="bg-yellow-400 text-black p-3 rounded-lg text-xl shadow-lg">
              <FaInstagram />
            </div>

            <div>
              <h4 className="font-semibold text-yellow-400">Instagram</h4>
              <p
                className="cursor-pointer hover:text-yellow-300 transition"
                onClick={() => {
                  if (companyInfo?.instagram) {
                    window.open(companyInfo.instagram, "_blank");
                  }
                }}
              >
                {companyInfo?.instagram || "Visit our Instagram"}
              </p>
            </div>

          </div>

          <button
            onClick={openWhatsAppDirect}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-3 rounded-lg flex items-center justify-center gap-3 text-lg shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-95"
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

            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Your Name"
                onChange={handleChange}
                className={`bg-white/85 text-black rounded-xl pl-10 pr-4 py-3 shadow-md w-full focus:ring-2 ${
                  errors.name ? "ring-2 ring-red-400" : "focus:ring-yellow-400"
                }`}
              />
            </div>

            <div className="relative">
              <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="your@email.com"
                onChange={handleChange}
                className={`bg-white/85 text-black rounded-xl pl-10 pr-4 py-3 shadow-md w-full focus:ring-2 ${
                  errors.email ? "ring-2 ring-red-400" : "focus:ring-yellow-400"
                }`}
              />
            </div>

          </div>

          <div className="relative mt-4">
            <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="Your Phone Number"
              onChange={handleChange}
              className={`bg-white/85 text-black rounded-xl pl-10 pr-4 py-3 shadow-md w-full focus:ring-2 ${
                  errors.phone ? "ring-2 ring-red-400" : "focus:ring-yellow-400"
                }`}
            />
          </div>

          <div className="relative mt-4">
            <FaShieldAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <select
              name="service"
              onChange={handleChange}
              className={`bg-white/85 text-black rounded-xl pl-10 pr-4 py-3 shadow-md w-full focus:ring-2 ${
                  errors.service ? "ring-2 ring-red-400" : "focus:ring-yellow-400"
                }`}
            >

              <option value="">Select a service</option>

              {services.map((service) => (
                <option key={service.serviceId} value={service.title}>
                  {service.title}
                </option>
              ))}

            </select>
          </div>

          <div className="relative mt-4">
            <BiMessageDetail className="absolute left-3 top-4 text-gray-500" />
            <textarea
              name="message"
              rows="5"
              placeholder="Tell us about your security requirements..."
              onChange={handleChange}
              className={`bg-white/85 text-black rounded-xl pl-10 pr-4 py-3 shadow-md w-full focus:ring-2 ${
                  errors.message ? "ring-2 ring-red-400" : "focus:ring-yellow-400"
                }`}
            ></textarea>
          </div>

          <button
            onClick={sendToWhatsApp}
            disabled={sending}
            className="w-full bg-yellow-500 text-black font-semibold py-3 rounded-xl shadow-xl hover:bg-yellow-400 hover:scale-[1.05] transition-all duration-200 mt-6 disabled:opacity-60"
          >
            {sending ? "Opening WhatsApp..." : "Send Message"}
          </button>

          <p className="text-xs text-gray-300 mt-4 text-center">
          We typically respond within 15 minutes during business hours.
          </p>

        </div>

      </div>

    </section>
  );
}