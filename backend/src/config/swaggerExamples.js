export const exampleBodies = {

  /* ================= AUTH ================= */

  "/auth/login": {
    identifier: "9876543210",
    password: "password123"
  },

  /* ================= EMPLOYEES ================= */

  "/employees/create": {
    name: "Ravi Kumar",
    phone: "9876543210",
    email: "ravi@test.com",
    aadhaarNumber: "123412341234",
    gender: "Male",
    dob: "1995-05-10",
    role: "security_guard",
    street: "MG Road",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500081",
    createdBy: "EMP00001"
  },

  "/employees/update/:employeeId": {
    name: "Ravi Kumar Updated",
    phone: "9876543211",
    actorId: "EMP00001"
  },

  "/employees/reassign-manager": {
    employeeId: "EMP00004",
    managerId: "EMP00003",
    actorId: "EMP00001"
  },

  /* ================= FACE ================= */

  "/faceTemplates/register": {
    employeeId: "EMP00004",
    templateVector: []
  },

  "/faceTemplates/verify": {
    employeeId: "EMP00004",
    templateVector: []
  },

  /* ================= LOCATIONS ================= */

  "/locations/create": {
    latitude: 17.385,
    longitude: 78.4867,
    buildingName: "Cyber Towers",
    street: "Hitech City",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500081",
    createdBy: "EMP00002"
  },

  /* ================= ASSIGNMENTS ================= */

  "/assignments/create": {
    empId: "EMP00004",
    locationId: "LOC00001",
    shiftStartTime: "09:00",
    shiftEndTime: "18:00",
    assignedBy: "EMP00002"
  },

  "/assignments/assign-guard-location": {
    empId: "EMP00004",
    managerId: "EMP00003",
    latitude: 17.385,
    longitude: 78.4867,
    buildingName: "Cyber Towers",
    street: "Hitech City",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500081",
    shiftStartTime: "09:00",
    shiftEndTime: "18:00"
  },

  /* ================= ATTENDANCE ================= */

  "/attendance/punch-in": {
    empId: "EMP00004",
    latitude: 17.385,
    longitude: 78.4867,
    templateVector: []
  },

  "/attendance/punch-out": {
    empId: "EMP00004",
    latitude: 17.385,
    longitude: 78.4867,
    templateVector: []
  },

  /* ================= VALIDATION ================= */

  "/validation/manager-visit": {
    managerId: "EMP00003",
    empId: "EMP00004",
    latitude: 17.385,
    longitude: 78.4867,
    templateVector: []
  },

  /* ================= ANNOUNCEMENTS ================= */

  "/announcements/create": {
    title: "Important Notice",
    message: "All guards must report by 9 AM",
    targetRoles: ["security_guard"],
    createdBy: "EMP00001"
  },

  /* ================= NOTIFICATIONS ================= */

  "/notifications/send": {
    title: "Alert",
    message: "New announcement available",
    type: "info",
    targetEmployeeId: "EMP00004"
  },

  /* ================= SERVICES ================= */

  "/services/create": {
    title: "Security Guard Services",
    description: "Professional security services",
    iconId: "ICO00001",
    displayOrder: 1,
    createdBy: "EMP00001"
  },

  "/services/update/:serviceId": {
    title: "Updated Security Service"
  },

  /* ================= TESTIMONIALS ================= */

  "/testimonials/create": {
    name: "John Doe",
    designation: "Manager",
    company: "ABC Corp",
    message: "Excellent security service",
    rating: 5,
    displayOrder: 1,
    createdBy: "EMP00001"
  },

  "/testimonials/update/:testimonialId": {
    name: "John Updated",
    message: "Very reliable security service"
  },

  /* ================= WHYUS ================= */

  "/whyus/create": {
    title: "Trusted Security",
    description: "Over 10 years experience",
    iconId: "ICO00001",
    displayOrder: 1,
    createdBy: "EMP00001"
  },

  "/whyus/update/:whyusId": {
    title: "Experienced Security",
    description: "Updated description"
  },

  /* ================= ICONS ================= */

  "/icons/create": {
    iconComponent: "FaShieldAlt",
    createdBy: "EMP00001"
  },

  "/icons/update/:iconId": {
    iconComponent: "FaUserShield"
  },

  /* ================= COMPANY ================= */

  "/company/create": {
    companyName: "Rama Security",
    email: "info@ramasecurity.com",
    phone: "9876543210",
    address: "Hyderabad",
    about: "Professional security services",
    createdBy: "EMP00001"
  },

  "/company/update": {
    companyName: "Rama Security Pvt Ltd",
    about: "Updated company profile"
  }

};