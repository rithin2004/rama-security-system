export const success = (data, message = "Success") => {

  return {
    success: true,
    message,
    data
  };

};

export const failure = (message) => {

  return {
    success: false,
    message
  };

};