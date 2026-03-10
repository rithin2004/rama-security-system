export const validateAadhaarFile = (file) => {

  if (!file)
    throw new Error("File required");

  const allowedMime = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/jpg"
  ];

  const allowedExt = ["pdf", "jpg", "jpeg", "png"];

  const ext = file.originalname.split(".").pop().toLowerCase();

  if (!allowedMime.includes(file.mimetype) || !allowedExt.includes(ext)) {
    throw new Error("Aadhaar must be PDF or Image (jpg, jpeg, png)");
  }

};


export const validateImageFile = (file) => {

  if (!file)
    throw new Error("File required");

  const allowedMime = [
    "image/jpeg",
    "image/png",
    "image/jpg"
  ];

  const allowedExt = ["jpg", "jpeg", "png"];

  const ext = file.originalname.split(".").pop().toLowerCase();

  if (!allowedMime.includes(file.mimetype) || !allowedExt.includes(ext)) {
    throw new Error("Only image files (jpg, jpeg, png) are allowed");
  }

};