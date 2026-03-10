import { exampleBodies } from "./swaggerExamples.js";

export const swaggerPaths = {

  /* ================= AUTH ================= */

  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Login using phone/email/employeeId",
      requestBody: {
        content: {
          "application/json": {
            example: exampleBodies["/auth/login"]
          }
        }
      },
      responses: {
        200: { description: "Login success" }
      }
    }
  },

  /* ================= EMPLOYEES ================= */

  "/employees/create": {
    post: {
      tags: ["Employees"],
      summary: "Create employee",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            example: exampleBodies["/employees/create"]
          }
        }
      },
      responses: {
        201: { description: "Employee created successfully" }
      }
    }
  },

  "/employees/list": {
    get: {
      tags: ["Employees"],
      summary: "List employees",
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: "limit", in: "query", schema: { type: "integer", example: 10 } },
        { name: "lastDoc", in: "query", schema: { type: "string", example: "EMP00005" } }
      ],
      responses: {
        200: { description: "Employees list returned" }
      }
    }
  },

  "/employees/update/{employeeId}": {
    put: {
      tags: ["Employees"],
      summary: "Update employee",
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: "employeeId", in: "path", required: true, schema: { type: "string", example: "EMP00004" } }
      ],
      requestBody: {
        content: {
          "application/json": {
            example: exampleBodies["/employees/update/:employeeId"]
          }
        }
      },
      responses: {
        200: { description: "Employee updated successfully" }
      }
    }
  },

  "/employees/delete/{employeeId}": {
    delete: {
      tags: ["Employees"],
      summary: "Deactivate employee",
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: "employeeId", in: "path", required: true, schema: { type: "string", example: "EMP00004" } }
      ],
      responses: {
        200: { description: "Employee deactivated successfully" }
      }
    }
  },

  "/employees/reassign-manager": {
    put: {
      tags: ["Employees"],
      summary: "Reassign employee manager",
      requestBody: {
        content: {
          "application/json": {
            example: exampleBodies["/employees/reassign-manager"]
          }
        }
      },
      responses: {
        200: { description: "Manager reassigned" }
      }
    }
  },

  /* ================= FACE ================= */

  "/faceTemplates/register": {
    post: {
      tags: ["FaceTemplates"],
      summary: "Register employee face template",
      requestBody: {
        content: {
          "application/json": {
            example: exampleBodies["/faceTemplates/register"]
          }
        }
      },
      responses: { 201: { description: "Face registered" } }
    }
  },

  "/faceTemplates/{employeeId}": {
    get: {
      tags: ["FaceTemplates"],
      summary: "Get employee face template",
      parameters: [
        { name: "employeeId", in: "path", required: true, schema: { type: "string" } }
      ],
      responses: { 200: { description: "Template returned" } }
    }
  },

  "/faceTemplates/verify": {
    post: {
      tags: ["FaceTemplates"],
      summary: "Verify employee face",
      requestBody: {
        content: {
          "application/json": {
            example: exampleBodies["/faceTemplates/verify"]
          }
        }
      },
      responses: { 200: { description: "Verification result" } }
    }
  },

  /* ================= LOCATIONS ================= */

  "/locations/create": {
    post: {
      tags: ["Locations"],
      summary: "Create location",
      security: [{ bearerAuth: [] }],
      requestBody: {
        content: {
          "application/json": {
            example: exampleBodies["/locations/create"]
          }
        }
      },
      responses: { 201: { description: "Location created successfully" } }
    }
  },

  "/locations/list": {
    get: {
      tags: ["Locations"],
      summary: "List locations",
      responses: { 200: { description: "Locations list returned" } }
    }
  },

  /* ================= ASSIGNMENTS ================= */

  "/assignments/create": {
    post: {
      tags: ["Assignments"],
      summary: "Create assignment",
      requestBody: {
        content: {
          "application/json": {
            example: exampleBodies["/assignments/create"]
          }
        }
      },
      responses: { 201: { description: "Assignment created successfully" } }
    }
  },

  "/assignments/list": {
    get: {
      tags: ["Assignments"],
      summary: "List assignments",
      responses: { 200: { description: "Assignments list returned" } }
    }
  },

  "/assignments/assign-guard-location": {
    post: {
      tags: ["Assignments"],
      summary: "Assign guard to location",
      requestBody: {
        content: {
          "application/json": {
            example: exampleBodies["/assignments/assign-guard-location"]
          }
        }
      },
      responses: { 201: { description: "Guard assigned successfully" } }
    }
  },

  /* ================= ATTENDANCE ================= */

  "/attendance/punch-in": {
    post: {
      tags: ["Attendance"],
      summary: "Punch in",
      requestBody: {
        content: {
          "application/json": {
            example: exampleBodies["/attendance/punch-in"]
          }
        }
      },
      responses: { 201: { description: "Punch in successful" } }
    }
  },

  "/attendance/punch-out": {
    post: {
      tags: ["Attendance"],
      summary: "Punch out",
      requestBody: {
        content: {
          "application/json": {
            example: exampleBodies["/attendance/punch-out"]
          }
        }
      },
      responses: { 200: { description: "Punch out successful" } }
    }
  },

  /* ================= VALIDATION ================= */

  "/validation/manager-visit": {
    post: {
      tags: ["Validation"],
      summary: "Manager surprise visit",
      requestBody: {
        content: {
          "application/json": {
            example: exampleBodies["/validation/manager-visit"]
          }
        }
      },
      responses: { 200: { description: "Validation successful" } }
    }
  },

  /* ================= ANNOUNCEMENTS ================= */

  "/announcements/create": {
    post: {
      tags: ["Announcements"],
      summary: "Create announcement",
      requestBody: {
        content: {
          "application/json": {
            example: exampleBodies["/announcements/create"]
          }
        }
      },
      responses: { 201: { description: "Announcement created successfully" } }
    }
  },

  "/announcements/list": {
    get: {
      tags: ["Announcements"],
      summary: "List announcements",
      responses: { 200: { description: "Announcements list returned" } }
    }
  },

  /* ================= NOTIFICATIONS ================= */

  "/notifications/send": {
    post: {
      tags: ["Notifications"],
      summary: "Send notification",
      requestBody: {
        content: {
          "application/json": {
            example: exampleBodies["/notifications/send"]
          }
        }
      },
      responses: { 201: { description: "Notification sent successfully" } }
    }
  },

  "/notifications/{empId}": {
    get: {
      tags: ["Notifications"],
      summary: "Get employee notifications",
      parameters: [
        { name: "empId", in: "path", required: true, schema: { type: "string", example: "EMP00004" } }
      ],
      responses: { 200: { description: "Notifications returned" } }
    }
  },

  "/notifications/read/{notificationId}": {
    patch: {
      tags: ["Notifications"],
      summary: "Mark notification as read",
      parameters: [
        { name: "notificationId", in: "path", required: true, schema: { type: "string", example: "NOT00005" } }
      ],
      responses: { 200: { description: "Notification marked as read" } }
    }
  },

  /* ================= SERVICES ================= */

  "/services/create": {
    post: {
      tags: ["Services"],
      summary: "Create service",
      requestBody: {
        content: {
          "application/json": {
            example: exampleBodies["/services/create"]
          }
        }
      },
      responses: { 201: { description: "Service created successfully" } }
    }
  },

  "/services/list": {
    get: {
      tags: ["Services"],
      summary: "List services",
      responses: { 200: { description: "Services list returned" } }
    }
  },

  "/services/update/{serviceId}": {
    put: {
      tags: ["Services"],
      summary: "Update service",
      parameters: [
        { name: "serviceId", in: "path", required: true, schema: { type: "string", example: "SRV00002" } }
      ],
      requestBody: {
        content: {
          "application/json": {
            example: exampleBodies["/services/update/:serviceId"]
          }
        }
      },
      responses: { 200: { description: "Service updated successfully" } }
    }
  },

  "/services/delete/{serviceId}": {
    delete: {
      tags: ["Services"],
      summary: "Delete service",
      parameters: [
        { name: "serviceId", in: "path", required: true, schema: { type: "string", example: "SRV00002" } }
      ],
      responses: { 200: { description: "Service deleted successfully" } }
    }
  },

  /* ================= TESTIMONIALS ================= */

  "/testimonials/create": {
    post: {
      tags: ["Testimonials"],
      summary: "Create testimonial",
      requestBody: {
        content: {
          "application/json": {
            example: exampleBodies["/testimonials/create"]
          }
        }
      },
      responses: { 201: { description: "Testimonial created successfully" } }
    }
  },

  "/testimonials/list": {
    get: {
      tags: ["Testimonials"],
      summary: "List testimonials",
      responses: { 200: { description: "Testimonials list returned" } }
    }
  },

  "/testimonials/update/{testimonialId}": {
    put: {
      tags: ["Testimonials"],
      summary: "Update testimonial",
      parameters: [
        { name: "testimonialId", in: "path", required: true, schema: { type: "string" } }
      ],
      requestBody: {
        content: {
          "application/json": {
            example: exampleBodies["/testimonials/update/:testimonialId"]
          }
        }
      },
      responses: { 200: { description: "Testimonial updated" } }
    }
  },

  "/testimonials/delete/{testimonialId}": {
    delete: {
      tags: ["Testimonials"],
      summary: "Delete testimonial",
      parameters: [
        { name: "testimonialId", in: "path", required: true, schema: { type: "string" } }
      ],
      responses: { 200: { description: "Testimonial deleted" } }
    }
  },

  /* ================= WHYUS ================= */

  "/whyus/create": {
    post: {
      tags: ["WhyUs"],
      summary: "Create WhyUs item",
      requestBody: {
        content: {
          "application/json": {
            example: exampleBodies["/whyus/create"]
          }
        }
      },
      responses: { 201: { description: "WhyUs created successfully" } }
    }
  },

  "/whyus/list": {
    get: {
      tags: ["WhyUs"],
      summary: "List WhyUs items",
      responses: { 200: { description: "WhyUs list returned" } }
    }
  },

  "/whyus/update/{whyusId}": {
    put: {
      tags: ["WhyUs"],
      summary: "Update whyus item",
      parameters: [
        { name: "whyusId", in: "path", required: true, schema: { type: "string" } }
      ],
      requestBody: {
        content: {
          "application/json": {
            example: exampleBodies["/whyus/update/:whyusId"]
          }
        }
      },
      responses: { 200: { description: "WhyUs updated" } }
    }
  },

  "/whyus/delete/{whyusId}": {
    delete: {
      tags: ["WhyUs"],
      summary: "Delete whyus item",
      parameters: [
        { name: "whyusId", in: "path", required: true, schema: { type: "string" } }
      ],
      responses: { 200: { description: "WhyUs deleted" } }
    }
  },

  /* ================= ICONS ================= */

  "/icons/create": {
    post: {
      tags: ["Icons"],
      summary: "Create icon",
      requestBody: {
        content: {
          "application/json": {
            example: exampleBodies["/icons/create"]
          }
        }
      },
      responses: { 201: { description: "Icon created successfully" } }
    }
  },

  "/icons/list": {
    get: {
      tags: ["Icons"],
      summary: "List icons",
      responses: { 200: { description: "Icons list returned" } }
    }
  },

  "/icons/update/{iconId}": {
    put: {
      tags: ["Icons"],
      summary: "Update icon",
      parameters: [
        { name: "iconId", in: "path", required: true, schema: { type: "string" } }
      ],
      requestBody: {
        content: {
          "application/json": {
            example: exampleBodies["/icons/update/:iconId"]
          }
        }
      },
      responses: { 200: { description: "Icon updated" } }
    }
  },

  "/icons/delete/{iconId}": {
    delete: {
      tags: ["Icons"],
      summary: "Delete icon",
      parameters: [
        { name: "iconId", in: "path", required: true, schema: { type: "string" } }
      ],
      responses: { 200: { description: "Icon deleted" } }
    }
  },

  /* ================= UPLOADS ================= */

  "/upload/profile-photo": {
    post: {
      tags: ["Uploads"],
      summary: "Upload profile photo",
      responses: { 200: { description: "Upload successful" } }
    }
  },

  "/upload/aadhaar": {
    post: {
      tags: ["Uploads"],
      summary: "Upload Aadhaar document",
      responses: { 200: { description: "Upload successful" } }
    }
  },

  "/upload/testimonial-image": {
    post: {
      tags: ["Uploads"],
      summary: "Upload testimonial image",
      responses: { 200: { description: "Upload successful" } }
    }
  },

  "/upload/company-logo": {
    post: {
      tags: ["Uploads"],
      summary: "Upload company logo",
      responses: { 200: { description: "Upload successful" } }
    }
  },

  /* ================= ANALYTICS ================= */

  "/analytics/stats": {
    get: {
      tags: ["Analytics"],
      summary: "Get system statistics",
      responses: { 200: { description: "System statistics returned" } }
    }
  },

  /* ================= COMPANY ================= */

  "/company/create": {
    post: {
      tags: ["Company"],
      summary: "Create company profile",
      requestBody: {
        content: {
          "application/json": {
            example: exampleBodies["/company/create"]
          }
        }
      },
      responses: { 201: { description: "Company created successfully" } }
    }
  },

  "/company": {
    get: {
      tags: ["Company"],
      summary: "Get company profile",
      responses: { 200: { description: "Company profile returned" } }
    }
  },

  "/company/update": {
    put: {
      tags: ["Company"],
      summary: "Update company profile",
      requestBody: {
        content: {
          "application/json": {
            example: exampleBodies["/company/update"]
          }
        }
      },
      responses: { 200: { description: "Company updated successfully" } }
    }
  }

};