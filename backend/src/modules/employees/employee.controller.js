import * as employeeService from "./employee.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";

export const createEmployee = asyncHandler(async (req, res) => {

  const employee = await employeeService.createEmployee(req.body);

  res.status(201).json(
    success(employee, "Employee created successfully")
  );

});

export const listEmployees = asyncHandler(async (req, res) => {

  const employees = await employeeService.listEmployees();

  res.json(success(employees));

});

export const updateEmployee = asyncHandler(async (req, res) => {

  const { employeeId } = req.params;

  const actorId = req.body.actorId;

  await employeeService.updateEmployee(
    employeeId,
    req.body,
    actorId
  );

  res.json(
    success(null, "Employee updated successfully")
  );

});

export const deleteEmployee = asyncHandler(async (req, res) => {

  const { employeeId } = req.params;

  const { actorId } = req.body;

  await employeeService.deleteEmployee(employeeId, actorId);

  res.json(
    success(null, "Employee deactivated successfully")
  );

});

export const reassignManager = asyncHandler(async (req, res) => {

  const { managerId, newAdminId, moveGuards, actorId } = req.body;

  await employeeService.reassignManager(
    managerId,
    newAdminId,
    moveGuards,
    actorId
  );

  res.json(
    success(null, "Manager reassigned successfully")
  );

});