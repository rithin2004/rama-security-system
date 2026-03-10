import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

/* ================= SERVICES ================= */

export const getServices = async () => {
  try {
    const res = await api.get("/services/list");

    if (!res?.data?.data) return [];

    return res.data.data;

  } catch (err) {
    console.error("Services API error:", err);
    return [];
  }
};

/* ================= TESTIMONIALS ================= */

export const getTestimonials = async () => {
  try {
    const res = await api.get("/testimonials/list");

    if (!res?.data?.data) return [];

    return res.data.data;

  } catch (err) {
    console.error("Testimonials API error:", err);
    return [];
  }
};

/* ================= WHY US ================= */

export const getWhyUs = async () => {
  try {
    const res = await api.get("/whyus/list");

    if (!res?.data?.data) return [];

    return res.data.data;

  } catch (err) {
    console.error("WhyUs API error:", err);
    return [];
  }
};

/* ================= COMPANY ================= */

export const getCompany = async () => {
  try {
    const res = await api.get("/company");

    if (!res?.data?.data) return {};

    return res.data.data;

  } catch (err) {
    console.error("Company API error:", err);
    return {};
  }
};