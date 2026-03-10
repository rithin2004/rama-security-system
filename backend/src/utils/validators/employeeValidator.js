import {
  validatePhone,
  validateAlternatePhone,
  validateAadhaar,
  validateEmail,
  validatePincode,
  validateName,
  validateGender
} from "./commonValidator.js";

export const validateEmployeeData = (data) => {

  if (!data.name)
    throw new Error("Name is required");

  if (!data.phone)
    throw new Error("Phone is required");

  if (!data.email)
    throw new Error("Email is required");

  if (!data.aadhaarNumber)
    throw new Error("Aadhaar number is required");

  if (!data.gender)
    throw new Error("Gender is required");

  if (!data.dob)
    throw new Error("Date of birth is required");

  if (!data.role)
    throw new Error("Role is required");

  if (!data.street)
    throw new Error("Street is required");

  if (!data.city)
    throw new Error("City is required");

  if (!data.state)
    throw new Error("State is required");

  if (!data.pincode)
    throw new Error("Pincode is required");

  validateName(data.name);
  validatePhone(data.phone);
  validateAlternatePhone(data.alternatePhone);
  validateAadhaar(data.aadhaarNumber);
  validateEmail(data.email);
  validatePincode(data.pincode);
  validateGender(data.gender);
};