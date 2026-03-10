import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WebsiteRoutes from "./routes/WebsiteRoutes";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">
        <WebsiteRoutes />
      </main>
      <Footer />
    </>
  );
}