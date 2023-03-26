// External
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

// Internal
const Teacher = require("../../models/Staff/Teacher");
const ErrorHandler = require("../../middlewares/Errors/ErrorHandler");
const {
  sanitizeUser,
  sanitizeInfo,
  sanitizeProfile,
} = require("../../utiles/sanitize");
const { createToken } = require("../../middlewares/Auth/token");
const ApiFeatures = require("../../utiles/ApiFeatures");

// Signup
/*
 * @desc Signup Teacher
 * @route /api/v1/staff/teacher/signup
 * @method POST
 * @access Public
 * */
exports.signupTeacher = expressAsyncHandler(async (req, res, next) => {
  const { name, email, password } = req?.body;
  // Check if email exists
  const check = await Teacher.findOne({ email });
  if (check) return next(new ErrorHandler("This Email is already used", 401));
  const user = await Teacher.create({
    name,
    email,
    password,
  });

  res?.json({ info: sanitizeUser(user), token: createToken(user.id) });
});

// Login Teacher
/*
 * @desc Login Teacher
 * @route /api/v1/staff/teacher/login
 * @method POST
 * @access Public
 * */
exports.loginTeacher = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req?.body;
  const teacher = await Teacher.findOne({ email });
  if (teacher && (await bcrypt.compare(password, teacher?.password))) {
    res?.json({
      info: sanitizeUser(teacher),
      token: createToken(teacher?._id),
    });
  } else {
    return next(new ErrorHandler("Invalid in email or password.", 401));
  }
});

// Get All Teachers
/*
 * @desc Get All Teachers
 * @route /api/v1/staff/teacher/
 * @method GET
 * @access Admin
 * */
exports.getAllTeachers = expressAsyncHandler(async (req, res, next) => {
  const model = Teacher.find();
  const count = await Teacher.countDocuments();
  const data = await new ApiFeatures(model, req?.query)
    .search()
    .paginate(count);

  const { pagination } = data;
  res?.json({ pagination, data: data.query });
});
// Get Profile Teacher
/*
 * @desc Get Profile Teacher
 * @route /api/v1/staff/teacher/profile
 * @method GET
 * @access Teacher
 * */
exports.getProfileTeacher = expressAsyncHandler(async (req, res, next) => {
  const { id } = req?.user;
  const user = await Teacher.findById(id).select("-password");
  res?.json(user);
});

// Update Profile Teacher
/*
 * @desc Update Profile Teacher
 * @route /api/v1/staff/teacher/profile
 * @method PATCH
 * @access Teacher
 * */
exports.updateProfileTeacher = expressAsyncHandler(async (req, res) => {
  const { id } = req?.user;
  const { name, email, avatar } = req?.body;
  const data = await Teacher.findById(id);
  const user = await Teacher.findByIdAndUpdate(
    id,
    sanitizeProfile(data, name, email, avatar),
    { new: true, runValidators: true }
  );
  res?.json(sanitizeInfo(user));
});

// Update Profile Teacher By Admin
/*
 * @desc Update Profile Teacher By Admin
 * @route /api/v1/staff/teacher/:id/profile
 * @method PATCH
 * @access Admin
 * */
exports.updateProfileTeacherByAdmin = expressAsyncHandler(
  async (req, res, next) => {
    const { subject, classLevel, program, academicYear } = req?.body;
    const { id } = req?.params;
    const data = await Teacher.findById(id);
    // Check if email exists
    if (!data) return next(new ErrorHandler("invalid id", 401));

    // Check if teacher is withdrawn
    if (data?.isWithdrawn)
      return next(new ErrorHandler("Action denied, teacher is withdraw", 401));

    // update
    const teacher = await Teacher.findByIdAndUpdate(
      data?._id,
      {
        program: program || data?.program,
        subject: subject || data?.subject,
        academicYear: academicYear || data?.academicYear,
        classLevel: classLevel || data?.classLevel,
      },
      { new: true }
    );

    res?.json(teacher);
  }
);
