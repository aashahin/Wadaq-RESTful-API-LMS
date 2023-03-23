const expressAsyncHandler = require("express-async-handler");
const ErrorHandler = require("../Errors/ErrorHandler");
const jwt = require("jsonwebtoken");
const Teacher = require("../../models/Staff/Teacher");
const Student = require("../../models/Academic/Student");
const Admin = require("../../models/Staff/Admin");

function Auth() {
  return expressAsyncHandler(async (req, res, next) => {
    let token;
    if (
      req?.headers.authorization &&
      req?.headers.authorization.startsWith("Bearer")
    ) {
      token = req?.headers.authorization.split(" ")[1];
    }
    if (!token) return next(new ErrorHandler("Access Denied.", 401));
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Date Changed Password
    const admin = await Admin.findById(decoded.id).select("-password");
    const teacher = await Teacher.findById(decoded.id).select("-password");
    const student = await Student.findById(decoded.id).select("-password");
    const user = admin || teacher || student;
    if (user.passwordChangedAt) {
      const passChangeTimeStamp = Math.round(user.passwordChangedAt / 1000);
      if (passChangeTimeStamp > decoded.iat) {
        return next(
          new ErrorHandler("An error occurred, Please Re-login.", 401)
        );
      }
    }
    req.user = user;
    next();
  });
}

module.exports = Auth;
