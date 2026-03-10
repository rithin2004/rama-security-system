import swaggerJsdoc from "swagger-jsdoc";
import { swaggerPaths } from "./swaggerPaths.js";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Rama Security Backend API",
      version: "1.0.0",
      description: "API documentation for Rama Security System"
    },

    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server"
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },

    security: [
      {
        bearerAuth: []
      }
    ],

    paths: swaggerPaths
  },

  apis: []
};

export const swaggerSpec = swaggerJsdoc(options);