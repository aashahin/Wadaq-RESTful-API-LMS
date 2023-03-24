// External
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

// Internal
const Student = require("../../models/Academic/Student");
const ErrorHandler = require("../../middlewares/Errors/ErrorHandler");
const {
  sanitizeUser,
  sanitizeInfo,
  sanitizeProfile,
} = require("../../utiles/sanitize");
const { createToken } = require("../../middlewares/Auth/token");

// Signup
/*
 * @desc Signup Student
 * @route /api/v1/staff/student/signup
 * @method POST
 * @access Auth
 * */
exports.signupStudent = expressAsyncHandler(async (req, res, next) => {
  const { name, email, password } = req?.body;
  // Check if email exists
  const check = await Student.findOne({ email });
  if (check) return next(new ErrorHandler("This Email is already used", 401));
  const user = await Student.create({
    name,
    email,
    password,
  });

  res?.json({ info: sanitizeUser(user) });
});

// Login Student
/*
 * @desc Login Student
 * @route /api/v1/staff/student/login
 * @method POST
 * @access Public
 * */
exports.loginStudent = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req?.body;
  const student = await Student.findOne({ email });
  if (student && (await bcrypt.compare(password, student?.password))) {
    res?.json({
      info: sanitizeUser(student),
      token: createToken(student?._id),
    });
  } else {
    return next(new ErrorHandler("Invalid in email or password.", 401));
  }
});

// Get All Students
/*
 * @desc Get All Students
 * @route /api/v1/staff/student/
 * @method GET
 * @access Student
 * */
exports.getAllStudents = expressAsyncHandler(async (req, res, next) => {
  const data = await Student.find().select("-password");
  res?.json(data);
});
// Get Profile Student
/*
 * @desc Get Profile Student
 * @route /api/v1/staff/student/profile
 * @method GET
 * @access Student
 * */
exports.getProfileStudent = expressAsyncHandler(async (req, res, next) => {
  const { id } = req?.user;
  const user = await Student.findById(id).select("-password");
  res?.json(user);
});

// Update Profile Student
/*
 * @desc Update Profile Student
 * @route /api/v1/staff/student/profile
 * @method PATCH
 * @access Student
 * */
exports.updateProfileStudent = expressAsyncHandler(async (req, res) => {
  const { id } = req?.user;
  const { name, email, avatar } = req?.body;
  const data = await Student.findById(id);
  const user = await Student.findByIdAndUpdate(
    id,
    sanitizeProfile(data, name, email, avatar),
    { new: true, runValidators: true }
  );
  res?.json(sanitizeInfo(user));
});

// Update Profile Student By Admin
/*
 * @desc Update Profile Student By Admin
 * @route /api/v1/staff/student/:id/profile
 * @method PATCH
 * @access Admin
 * */
exports.updateProfileStudentByAdmin = expressAsyncHandler(
  async (req, res, next) => {
    const { name, email, classLevels, programs, academicYears, achievements } =
      req?.body;
    const { id } = req?.params;
    const data = await Student.findById(id);
    // Check if email exists
    if (!data) return next(new ErrorHandler("invalid id", 401));

    // update
    const student = await Student.findByIdAndUpdate(
      data?._id,
      {
        name,
        email,
        $addToSet: { classLevels, programs, academicYears, achievements },
      },
      { new: true }
    );

    res?.json(student);
  }
);
