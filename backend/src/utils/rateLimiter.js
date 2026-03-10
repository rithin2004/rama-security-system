import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({

  windowMs: (process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000,

  max: process.env.RATE_LIMIT_MAX || 300,

  message: {
    error: "Too many requests. Please try again later."
  },

  standardHeaders: true,
  legacyHeaders: false

});