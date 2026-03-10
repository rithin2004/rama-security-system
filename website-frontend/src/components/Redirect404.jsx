import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

let shown = false;

export default function Redirect404() {

  if (!shown) {
    toast.error("Unauthorized or page not found");
    shown = true;
  }

  return <Navigate to="/" replace />;
}