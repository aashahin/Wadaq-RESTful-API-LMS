// External
const expressAsyncHandler = require("express-async-handler");

// Internal
const AcademicTerm = require("../../models/Academic/AcademicTerm");
const Admin = require("../../models/Staff/Admin");
const ErrorHandler = require("../../middlewares/Errors/ErrorHandler");

// Create
/*
 * @desc Create Academic Term
 * @route /api/v1/academic/academic-term
 * @method POST
 * @access Admin
 * */
exports.createAcademicTerm = expressAsyncHandler(async (req, res, next) => {
  const { name, description, duration } = req?.body;

  const checkExisted = await AcademicTerm.findOne({ name });
  if (checkExisted)
    return next(new ErrorHandler("This Academic Term is already exist", 401));

  const academicTerm = await AcademicTerm.create({
    name,
    description,
    duration,
    createdBy: req?.user._id,
  });
  await Admin.findByIdAndUpdate(
    req?.user._id,
    {
      $push: { academicTerms: academicTerm?._id },
    },
    { new: true }
  );

  res?.json({
    status: "success",
    data: academicTerm,
  });
});

// Get All
/*
 * @desc Get All Academic Terms
 * @route /api/v1/academic/academic-term
 * @method GET
 * @access Admin
 * */
exports.getAllAcademicTerms = expressAsyncHandler(async (req, res) => {
  const academicTerms = await AcademicTerm.find();
  res?.json({
    status: "success",
    data: academicTerms,
  });
});

// Get One
/*
 * @desc Get Academic Term
 * @route /api/v1/academic/academic-term/:id
 * @method GET
 * @access Admin
 * */
exports.getAcademicTerm = expressAsyncHandler(async (req, res, next) => {
  const academicTerm = await AcademicTerm.findById(req?.params.id);
  if (!academicTerm) return next(new ErrorHandler("Invalid id", 404));
  res?.json({
    status: "success",
    data: academicTerm,
  });
});

// Update
/*
 * @desc Update Academic Term
 * @route /api/v1/academic/academic-term/:id
 * @method PATCH
 * @access Admin
 * */
exports.updateAcademicTerm = expressAsyncHandler(async (req, res, next) => {
  const { name, description, duration } = req?.body;
  const { id } = req?.params;

  const checkExisted = await AcademicTerm.findById(id);
  if (!checkExisted) return next(new ErrorHandler("Invalid id", 404));

  const academicTerm = await AcademicTerm.findByIdAndUpdate(
    id,
    {
      name: name || checkExisted?.name,
      description: description || checkExisted?.description,
      duration: duration || checkExisted?.duration,
    },
    { new: true }
  );

  res?.json({
    status: "success",
    data: academicTerm,
  });
});

// Delete
/*
 * @desc Delete Academic Term
 * @route /api/v1/academic/academic-term/:id
 * @method DELETE
 * @access Admin
 * */
exports.deleteAcademicTerm = expressAsyncHandler(async (req, res, next) => {
  const academicTerm = await AcademicTerm.findByIdAndDelete(req?.params.id, {
    new: true,
  });
  await Admin.findByIdAndUpdate(
    req?.user._id,
    {
      $pull: { academicTerms: academicTerm?._id },
    },
    { new: true }
  );

  if (!academicTerm) return next(new ErrorHandler("Invalid id", 404));
  res?.json({
    status: "success",
  });
});
