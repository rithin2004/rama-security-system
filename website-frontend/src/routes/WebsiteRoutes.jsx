import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
//import PrivacyPolicy from "../pages/PrivacyPolicy";
//import TermsConditions from "../pages/TermsConditions";
//import RefundPolicy from "../pages/RefundPolicy";
import Redirect404 from "../components/Redirect404";

export default function WebsiteRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Redirect404 />} />
    </Routes>
  );
}