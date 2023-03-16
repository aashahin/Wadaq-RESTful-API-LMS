const expressAsyncHandler = require("express-async-handler");
const ErrorHandler = require("../Errors/ErrorHandler");

exports.permissions = (roles) => {
  return expressAsyncHandler(async (req, res, next) => {
    if (!roles.includes(req?.user.role)) {
      return next(new ErrorHandler("Access Denied.", 403));
    } else {
      next();
    }
  });
};
