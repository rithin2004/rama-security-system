export const validatePhone = (phone) => {
  const regex = /^[0-9]{10}$/;
  if (!regex.test(phone)) {
    throw new Error("Phone number must be exactly 10 digits");
  }
};

export const validateAlternatePhone = (phone) => {
  if (!phone) return;

  const regex = /^[0-9]{10}$/;
  if (!regex.test(phone)) {
    throw new Error("Alternate phone must be exactly 10 digits");
  }
};

export const validateAadhaar = (aadhaar) => {
  const regex = /^[0-9]{12}$/;
  if (!regex.test(aadhaar)) {
    throw new Error("Aadhaar number must be exactly 12 digits");
  }
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    throw new Error("Invalid email format");
  }
};

export const validatePincode = (pincode) => {
  const regex = /^[0-9]{6}$/;

  if (!regex.test(pincode)) {
    throw new Error("Pincode must be 6 digits");
  }
};

export const validateName = (name) => {
  const regex = /^[A-Za-z. ]+$/;

  if (!regex.test(name)) {
    throw new Error("Name can contain only alphabets, space and dot");
  }
};

export const validateGender = (gender) => {
  const allowed = ["Male", "Female", "Transgender"];

  if (!allowed.includes(gender)) {
    throw new Error("Invalid gender value");
  }
};