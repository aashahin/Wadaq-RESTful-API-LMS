// External
const expressAsyncHandler = require("express-async-handler");

// Internal
const YearGroup = require("../../models/Academic/YearGroup");
const AcademicYear = require("../../models/Academic/AcademicYear");
const Admin = require("../../models/Staff/Admin");
const ErrorHandler = require("../../middlewares/Errors/ErrorHandler");

// Create
/*
 * @desc Create Year Group
 * @route /api/v1/academic/year-group
 * @method POST
 * @access Admin
 * */
exports.createYearGroup = expressAsyncHandler(async (req, res, next) => {
  const { name, description } = req?.body;
  const { academicYearId } = req?.params;
  const checkExisted = await YearGroup.findOne({ name });
  if (checkExisted)
    return next(new ErrorHandler("This Year Group is already exist", 401));
  const checkAcademicYear = await AcademicYear.findById(academicYearId);
  if (!checkAcademicYear)
    return next(new ErrorHandler("Invalid Academic Year Id", 401));

  const yearGroup = await YearGroup.create({
    name,
    description,
    academicYear: academicYearId,
    createdBy: req?.user._id,
  });
  await Admin.findByIdAndUpdate(
    req?.user._id,
    {
      $push: { yearGroups: yearGroup?._id },
    },
    { new: true }
  );

  res?.json({
    status: "success",
    data: yearGroup,
  });
});

// Get All
/*
 * @desc Get All Year Groups
 * @route /api/v1/academic/year-group
 * @method GET
 * @access Admin
 * */
exports.getAllYearGroups = expressAsyncHandler(async (req, res) => {
  const yearGroups = await YearGroup.find();
  res?.json({
    status: "success",
    data: yearGroups,
  });
});

// Get One
/*
 * @desc Get Year Group
 * @route /api/v1/academic/year-group/:id
 * @method GET
 * @access Admin
 * */
exports.getYearGroup = expressAsyncHandler(async (req, res, next) => {
  const yearGroup = await YearGroup.findById(req?.params.id);
  if (!yearGroup) return next(new ErrorHandler("Invalid id", 404));
  res?.json({
    status: "success",
    data: yearGroup,
  });
});

// Update
/*
 * @desc Update Year Group
 * @route /api/v1/academic/year-group/:id
 * @method PATCH
 * @access Admin
 * */
exports.updateYearGroup = expressAsyncHandler(async (req, res, next) => {
  const { name, description } = req?.body;
  const { id } = req?.params;

  const checkExisted = await YearGroup.findById(id);
  if (!checkExisted) return next(new ErrorHandler("Invalid id", 404));

  const yearGroup = await YearGroup.findByIdAndUpdate(
    id,
    {
      name: name || checkExisted?.name,
      description: description || checkExisted?.description,
    },
    { new: true }
  );

  res?.json({
    status: "success",
    data: yearGroup,
  });
});

// Delete
/*
 * @desc Delete Year Group
 * @route /api/v1/academic/year-group/:id
 * @method DELETE
 * @access Admin
 * */
exports.deleteYearGroup = expressAsyncHandler(async (req, res, next) => {
  const yearGroup = await YearGroup.findByIdAndDelete(req?.params.id, {
    new: true,
  });
  await Admin.findByIdAndUpdate(
    req?.user._id,
    {
      $pull: { yearGroups: yearGroup?._id },
    },
    { new: true }
  );

  if (!yearGroup) return next(new ErrorHandler("Invalid id", 404));
  res?.json({
    status: "success",
  });
});
