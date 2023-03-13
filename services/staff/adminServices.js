// External
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

// Internal
const Admin = require("../../models/Staff/Admin");
const ErrorHandler = require("../../middlewares/Errors/ErrorHandler");
const { sanitizeUser, sanitizeAdmins, sanitizeProfileAdmin} = require("../../utiles/sanitize");
const { createToken } = require("../../middlewares/Auth/token");

// SignUp Admin
/*
 * @desc SignUp Admin
 * @route /api/v1/staff/admin/signup
 * @method POST
 * @access Public
 * */
exports.signupAdmin = expressAsyncHandler(async (req, res, next) => {
  const { name, email, password } = req?.body;
  // Check if email exists
  const check = await Admin.findOne({ email });
  if (check) return next(new ErrorHandler("This Email is already used", 401));
  const user = await Admin.create({
    name,
    email,
    password,
  });

  res?.json({ info: sanitizeUser(user), token: createToken(user.id) });
});

// Login Admin
/*
 * @desc Login Admin
 * @route /api/v1/staff/admin/login
 * @method POST
 * @access Public
 * */
exports.loginAdmin = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req?.body;
  const user = await Admin.findOne({ email });
  if (user && (await bcrypt.compare(password, user?.password))) {
    return res?.json({
      info: sanitizeUser(user),
      token: createToken(user?.id),
    });
  } else {
    return next(new ErrorHandler("Invalid in email or password.", 401));
  }
});

// Get All Admins
/*
 * @desc Get All Admins
 * @route /api/v1/staff/admin/
 * @method GET
 * @access Auth
 * */
exports.getAllAdmins = expressAsyncHandler(async (req, res, next) => {
  const data = await Admin.find().select(["-password","-isAccountVerified"]);
  res?.json(data);
});
// Get Profile Admin
/*
 * @desc Get Profile Admin
 * @route /api/v1/staff/admin/profile
 * @method GET
 * @access Auth
 * */
exports.getProfileAdmin = expressAsyncHandler(async (req, res, next) => {
  const { id } = req?.user;
  const user = await Admin.findById(id);
  res?.json(sanitizeAdmins(user));
});

// Update Profile Admin
/*
 * @desc Update Profile Admin
 * @route /api/v1/staff/admin/profile
 * @method PATCH
 * @access Auth
 * */
exports.updateProfileAdmin = expressAsyncHandler(async(req,res,next)=>{
  const {id} = req?.user;
  const {name,email,avatar} = req?.body;
  const data = await Admin.findById(id);
  const user = await Admin.findByIdAndUpdate(id,sanitizeProfileAdmin(data,name,email,avatar),{new: true,runValidators: true});
  res?.json(sanitizeAdmins(user))
})