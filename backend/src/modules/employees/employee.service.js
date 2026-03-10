import * as employeeRepo from "./employee.repository.js";
import { logActivity } from "../../utils/activityLogger.js";
import { validateEmployeeData } from "../../utils/validators/employeeValidator.js";
import { createAudit } from "../../utils/auditFields.js";
import { updateAudit } from "../../utils/auditFields.js";
import { auth } from "../../config/firebase.js";

const applyHierarchyRules = async (data) => {

  const role = data.role;

  // SUPERADMIN
  if (role === "superadmin") {

    if (data.createdBy !== "EMP00001")
      throw new Error("Only superadmin can create superadmin");

    const employees = await employeeRepo.getEmployees();

    const superadminExists = employees.find(
      e => e.role === "superadmin"
    );

    if (superadminExists)
      throw new Error("Only one superadmin allowed");

    return {
      assignedAdminId: null,
      assignedManagerId: null
    };
  }

  // ADMIN
  if (role === "admin") {

    return {
      assignedAdminId: null,
      assignedManagerId: null
    };
  }

  // MANAGER
  if (role === "manager") {

    const creator = await employeeRepo.getEmployeeById(data.createdBy);

    if (!creator)
      throw new Error("Creator not found");

    if (creator.role === "admin") {

      return {
        assignedAdminId: creator.employeeId,
        assignedManagerId: null
      };

    }

    if (creator.role === "superadmin") {

      return {
        assignedAdminId: null,
        assignedManagerId: null
      };

    }

    throw new Error("Only admin or superadmin can create manager");

  }

  // SECURITY GUARD
  if (role === "security_guard") {

    const creator = await employeeRepo.getEmployeeById(data.createdBy);

    if (!creator)
      throw new Error("Creator not found");

    if (creator.role === "admin") {

      if (!data.assignedManagerId)
        throw new Error("Manager must be assigned");

      const manager = await employeeRepo.getEmployeeById(data.assignedManagerId);

      if (!manager || manager.role !== "manager")
        throw new Error("Invalid manager");

      return {
        assignedAdminId: creator.employeeId,
        assignedManagerId: manager.employeeId
      };

    }

    if (creator.role === "superadmin") {

      return {
        assignedAdminId: null,
        assignedManagerId: null
      };

    }

    throw new Error("Only admin or superadmin can create guard");

  }

  throw new Error("Invalid role");

};

const calculateAge = (dob) => {
  const birth = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

export const createEmployee = async (data) => {

  // Validate fields
  validateEmployeeData(data);

  // Unique checks
  const existingPhone = await employeeRepo.getEmployeeByPhone(data.phone);
  if (existingPhone)
    throw new Error("Phone number already exists");

  const existingEmail = await employeeRepo.getEmployeeByEmail(data.email);
  if (existingEmail)
    throw new Error("Email already exists");

  const existingAadhaar = await employeeRepo.getEmployeeByAadhaar(data.aadhaarNumber);
  if (existingAadhaar)
    throw new Error("Aadhaar number already exists");

  const age = calculateAge(data.dob);

  const hierarchy = await applyHierarchyRules(data);

  const employeeData = {
    name: data.name,
    phone: data.phone,
    alternatePhone: data.alternatePhone || null,
    email: data.email,

    aadhaarNumber: data.aadhaarNumber,
    aadhaarPhotoURL: null,
    profilePhotoURL: null,

    gender: data.gender,
    dob: data.dob,
    age,

    role: data.role,

    assignedAdminId: hierarchy.assignedAdminId,
    assignedManagerId: hierarchy.assignedManagerId,

    zone: data.zone || null,
    street: data.street,
    city: data.city,
    state: data.state,
    pincode: data.pincode,

    status: "active",

    faceTemplateId: null,

    // onboarding flags
    isPhoneVerified: false,
    isEmailVerified: false,
    passwordChanged: false,
    faceRegistered: false,
    aadhaarUploaded: false,
    profilePhotoUploaded: false,
    isFirstLoginCompleted: false
  };

  // Create Firebase Auth user
  const tempPassword = "Temp@1234";

  let firebaseUser;

  try {

    firebaseUser = await auth.createUser({
      email: data.email,
      phoneNumber: "+91" + data.phone,
      password: tempPassword,
      emailVerified: false,
      disabled: false
    });

  } catch (error) {
    throw new Error("Failed to create authentication user: " + error.message);
  }

  let employee;

  try {
    // create employee
    employee = await employeeRepo.createEmployee({
      ...employeeData,
      firebaseUid: firebaseUser.uid,
      ...createAudit(data.createdBy)
    });
  } catch (error) {
    await auth.deleteUser(firebaseUser.uid);

    throw new Error("Failed to create employee record: " + error.message);
  }

  // activity log
  await logActivity({
    type: "success",
    action: "employee_created",
    title: "Employee Created",
    detail: `${employee.name} registered`,
    actorId: data.createdBy,
    taggedId: employee.employeeId
  });

  return employee;
};

export const listEmployees = async () => {
  return employeeRepo.getEmployees();
};

export const updateEmployee = async (employeeId, data, actorId) => {

  const employee = await employeeRepo.getEmployeeById(employeeId);

  if (!employee)
    throw new Error("Employee not found");

  const actor = await employeeRepo.getEmployeeById(actorId);

  if (!actor)
    throw new Error("Actor not found");

  // protect superadmin
  if (employee.employeeId === "EMP00001")
    throw new Error("Superadmin cannot be modified");

  // prevent role change
  if (data.role && data.role !== employee.role)
    throw new Error("Employee role cannot be changed");

  // prevent employeeId change
  if (data.employeeId)
    throw new Error("Employee ID cannot be changed");

  // only superadmin and admin can modify employees
  if (actor.role !== "superadmin" && actor.role !== "admin") {
    throw new Error("You are not allowed to modify employees");
  }

  // admin editing rules
  if (actor.role === "admin") {

    if (employee.role === "admin")
      throw new Error("Admin cannot modify another admin");

    if (employee.assignedAdminId !== actor.employeeId)
      throw new Error("You can only modify employees assigned to you");

  }

  const updateData = {
    ...data,
    ...updateAudit(actorId)
  };

  // Sync Firebase Auth if email or phone changed
  if (data.email || data.phone) {

    if (!employee.firebaseUid)
      throw new Error("Employee authentication record missing");

    const firebaseUpdate = {};

    if (data.email)
      firebaseUpdate.email = data.email;

    if (data.phone)
      firebaseUpdate.phoneNumber = "+91" + data.phone;

    try {
      await auth.updateUser(employee.firebaseUid, firebaseUpdate);
    } catch (error) {
      throw new Error("Failed to update authentication record: " + error.message);
    }
  }

  await employeeRepo.updateEmployee(employeeId, updateData);

  await logActivity({
    type: "success",
    action: "employee_updated",
    title: "Employee Updated",
    detail: employee.name,
    actorId,
    taggedId: employeeId
  });

};

export const deleteEmployee = async (employeeId, actorId) => {

  const employee = await employeeRepo.getEmployeeById(employeeId);

  if (!employee)
    throw new Error("Employee not found");

  const actor = await employeeRepo.getEmployeeById(actorId);

  if (!actor)
    throw new Error("Actor not found");

  // superadmin cannot be deleted
  if (employee.employeeId === "EMP00001")
    throw new Error("Superadmin cannot be deleted");

  // only admin or superadmin can delete
  if (actor.role !== "admin" && actor.role !== "superadmin")
    throw new Error("You are not allowed to delete employees");

  // admin cannot delete admin
  if (actor.role === "admin" && employee.role === "admin")
    throw new Error("Admin cannot delete another admin");

  // admin can only delete employees under them
  if (actor.role === "admin") {

    if (employee.assignedAdminId !== actor.employeeId)
      throw new Error("You can only delete employees assigned to you");

  }

  // prevent deleting manager with guards
  if (employee.role === "manager") {

    const guards = await employeeRepo.getEmployees();

    const assignedGuards = guards.filter(
      g => g.assignedManagerId === employee.employeeId
    );

    if (assignedGuards.length > 0)
      throw new Error("Manager cannot be deleted while guards are assigned");

  }
  
  if (employee.firebaseUid) {

    try {

      await auth.updateUser(employee.firebaseUid, {
        disabled: true
      });

    } catch (error) {

      throw new Error("Failed to disable authentication user: " + error.message);

    }

  }

  await employeeRepo.deactivateEmployee(employeeId, {
    status: "inactive",
    ...updateAudit(actorId)
  });

  await logActivity({
    type: "success",
    action: "employee_deleted",
    title: "Employee Deactivated",
    detail: employee.name,
    actorId,
    taggedId: employeeId
  });

};

export const reassignManager = async (
  managerId,
  newAdminId,
  moveGuards,
  actorId
) => {

  const manager = await employeeRepo.getEmployeeById(managerId);

  if (!manager)
    throw new Error("Manager not found");

  if (manager.role !== "manager")
    throw new Error("Target employee is not a manager");

  const newAdmin = await employeeRepo.getEmployeeById(newAdminId);

  if (!newAdmin || newAdmin.role !== "admin")
    throw new Error("Invalid admin");

  const guards = await employeeRepo.getGuardsByManager(managerId);

  // update manager admin
  await employeeRepo.updateEmployee(managerId, {
    assignedAdminId: newAdminId,
    ...updateAudit(actorId)
  });

  if (moveGuards) {

    for (const guard of guards) {

      await employeeRepo.updateEmployee(guard.employeeId, {
        assignedAdminId: newAdminId,
        ...updateAudit(actorId)
      });

    }

  } else {

    for (const guard of guards) {

      await employeeRepo.updateEmployee(guard.employeeId, {
        assignedAdminId: null,
        assignedManagerId: null,
        ...updateAudit(actorId)
      });

    }

  }

  await logActivity({
    type: "success",
    action: "manager_reassigned",
    title: "Manager reassigned to new admin",
    detail: manager.name,
    actorId,
    taggedId: managerId
  });

};

