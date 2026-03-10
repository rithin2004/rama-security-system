import * as repo from "./auth.repository.js";

export const resolveLogin = async (identifier)=>{

  const employee = await repo.findEmployeeByIdentifier(identifier);

  if(!employee)
    throw new Error("Employee not found");

  return {
    email: employee.email,
    employeeId: employee.employeeId
  };

};