// External
const expressAsyncHandler = require("express-async-handler");

// Internal
const AcademicYear = require("../../models/Academic/AcademicYear");
const Admin = require("../../models/Staff/Admin");
const ErrorHandler = require("../../middlewares/Errors/ErrorHandler");

// Create
/*
 * @desc Create Academic Year
 * @route /api/v1/academic/academic-year
 * @method POST
 * @access Admin
 * */
exports.createAcademicYear = expressAsyncHandler(async (req, res, next) => {
  const { name, startDate, endDate } = req?.body;

  const checkExisted = await AcademicYear.findOne({ name });
  if (checkExisted)
    return next(new ErrorHandler("This Academic Year is already exist", 401));

  const academicYear = await AcademicYear.create({
    name,
    startDate,
    endDate,
    createdBy: req?.user._id,
  });
  await Admin.findByIdAndUpdate(
    req?.user._id,
    {
      $push: { academicYears: academicYear?._id },
    },
    { new: true }
  );

  res?.json({
    status: "success",
    data: academicYear,
  });
});

// Get All
/*
 * @desc Get All Academic Years
 * @route /api/v1/academic/academic-year
 * @method GET
 * @access Admin
 * */
exports.getAllAcademicYears = expressAsyncHandler(async (req, res) => {
  const academicYears = await AcademicYear.find();
  res?.json({
    status: "success",
    data: academicYears,
  });
});

// Get One
/*
 * @desc Get Academic Year
 * @route /api/v1/academic/academic-year/:id
 * @method GET
 * @access Admin
 * */
exports.getAcademicYear = expressAsyncHandler(async (req, res, next) => {
  const academicYear = await AcademicYear.findById(req?.params.id);
  if (!academicYear) return next(new ErrorHandler("Invalid id", 404));
  res?.json({
    status: "success",
    data: academicYear,
  });
});

// Update
/*
 * @desc Update Academic Year
 * @route /api/v1/academic/academic-year/:id
 * @method PATCH
 * @access Admin
 * */
exports.updateAcademicYear = expressAsyncHandler(async (req, res, next) => {
  const { name, startDate, endDate } = req?.body;
  const { id } = req?.params;

  const checkExisted = await AcademicYear.findById(id);
  if (!checkExisted) return next(new ErrorHandler("Invalid id", 404));

  const academicYear = await AcademicYear.findByIdAndUpdate(
    id,
    {
      name: name || checkExisted?.name,
      startDate: startDate || checkExisted?.startDate,
      endDate: endDate || checkExisted?.endDate,
    },
    { new: true }
  );

  res?.json({
    status: "success",
    data: academicYear,
  });
});

// Delete
/*
 * @desc Delete Academic Year
 * @route /api/v1/academic/academic-year/:id
 * @method DELETE
 * @access Admin
 * */
exports.deleteAcademicYear = expressAsyncHandler(async (req, res, next) => {
  const academicYear = await AcademicYear.findByIdAndDelete(req?.params.id, {
    new: true,
  });
  await Admin.findByIdAndUpdate(
    req?.user._id,
    {
      $pull: { academicYears: academicYear?._id },
    },
    { new: true }
  );

  if (!academicYear) return next(new ErrorHandler("Invalid id", 404));
  res?.json({
    status: "success",
  });
});
