import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WebsiteRoutes from "./routes/WebsiteRoutes";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <main className="pt-20 min-h-screen">
        <WebsiteRoutes />
      </main>
      <Footer />
    </>
  );
}