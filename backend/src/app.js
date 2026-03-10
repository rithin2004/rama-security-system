import express from "express";
import helmet from "helmet";

import employeeRoutes from "./modules/employees/employee.routes.js";
import locationRoutes from "./modules/locations/location.routes.js";
import assignmentRoutes from "./modules/assignments/assignment.routes.js";
import attendanceRoutes from "./modules/attendance/attendance.routes.js";
import validationRoutes from "./modules/validation/validation.routes.js";
import faceTemplateRoutes from "./modules/faceTemplates/faceTemplate.routes.js";
import announcementRoutes from "./modules/announcements/announcement.routes.js";
import notificationRoutes from "./modules/notifications/notification.routes.js";
import analyticsRoutes from "./modules/analytics/analytics.routes.js";
import serviceRoutes from "./modules/services/service.routes.js";
import iconRoutes from "./modules/icons/icon.routes.js";
import testimonialRoutes from "./modules/testimonials/testimonial.routes.js";
import whyusRoutes from "./modules/whyus/whyus.routes.js";
import companyRoutes from "./modules/company/company.routes.js";
import uploadRoutes from "./modules/uploads/upload.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";

import { apiLimiter } from "./utils/rateLimiter.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { requestId } from "./middleware/requestId.js";
import { requestLogger } from "./middleware/requestLogger.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

const app = express();

app.use(helmet({
  crossOriginResourcePolicy: false
}));
app.use(express.json());

app.use(apiLimiter);
app.use(requestId);
app.use(requestLogger);
/* Swagger Docs */
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
/* Routes */
app.use("/auth", authRoutes);
app.use("/employees", employeeRoutes);
app.use("/locations", locationRoutes);
app.use("/assignments", assignmentRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/validation", validationRoutes);
app.use("/faceTemplates", faceTemplateRoutes);
app.use("/announcements", announcementRoutes);
app.use("/notifications", notificationRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/services", serviceRoutes);
app.use("/icons", iconRoutes);
app.use("/testimonials", testimonialRoutes);
app.use("/whyus", whyusRoutes);
app.use("/company", companyRoutes);
app.use("/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("Rama Security Backend Running");
});

/* Global error handler */
app.use(errorHandler);

export default app;