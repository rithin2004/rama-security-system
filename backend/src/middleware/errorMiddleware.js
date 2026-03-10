import { failure } from "../utils/apiResponse.js";

export const errorHandler = (err, req, res, next) => {

  console.error(err);

  const status = err.status || 500;

  res.status(status).json(
    failure(err.message || "Internal Server Error")
  );

};