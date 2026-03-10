import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy loaded pages (better performance)
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Services = lazy(() => import("../pages/Services"));
const Testimonials = lazy(() => import("../pages/Testimonials"));
const WhyUs = lazy(() => import("../pages/WhyUs"));
const Contact = lazy(() => import("../pages/Contact"));

export default function WebsiteRoutes() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/whyus" element={<WhyUs />} />
        <Route path="/contact" element={<Contact />} />

        {/* 404 Route */}
        <Route
          path="*"
          element={
            <div className="text-center py-20 text-2xl font-semibold">
              Page Not Found
            </div>
          }
        />
      </Routes>
    </Suspense>
  );
}