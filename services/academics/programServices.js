// External
const expressAsyncHandler = require("express-async-handler");

// Internal
const Program = require("../../models/Academic/Program");
const Admin = require("../../models/Staff/Admin");
const ErrorHandler = require("../../middlewares/Errors/ErrorHandler");

// Create
/*
 * @desc Create Program
 * @route /api/v1/academic/program
 * @method POST
 * @access Admin
 * */
exports.createProgram = expressAsyncHandler(async (req, res, next) => {
  const { name, description, duration } = req?.body;

  const checkExisted = await Program.findOne({ name });
  if (checkExisted)
    return next(new ErrorHandler("This Program is already exist", 401));

  const program = await Program.create({
    name,
    description,
    duration,
    createdBy: req?.user._id,
  });
  await Admin.findByIdAndUpdate(
    req?.user._id,
    {
      $push: { programs: program?._id },
    },
    { new: true }
  );

  res?.json({
    status: "success",
    data: program,
  });
});

// Get All
/*
 * @desc Get All Programs
 * @route /api/v1/academic/program
 * @method GET
 * @access Admin
 * */
exports.getAllPrograms = expressAsyncHandler(async (req, res) => {
  const programs = await Program.find();
  res?.json({
    status: "success",
    data: programs,
  });
});

// Get One
/*
 * @desc Get Program
 * @route /api/v1/academic/program/:id
 * @method GET
 * @access Admin
 * */
exports.getProgram = expressAsyncHandler(async (req, res, next) => {
  const program = await Program.findById(req?.params.id);
  if (!program) return next(new ErrorHandler("Invalid id", 404));
  res?.json({
    status: "success",
    data: program,
  });
});

// Update
/*
 * @desc Update Program
 * @route /api/v1/academic/program/:id
 * @method PATCH
 * @access Admin
 * */
exports.updateProgram = expressAsyncHandler(async (req, res, next) => {
  const { name, description, duration } = req?.body;
  const { id } = req?.params;

  const checkExisted = await Program.findById(id);
  if (!checkExisted) return next(new ErrorHandler("Invalid id", 404));

  const program = await Program.findByIdAndUpdate(
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
    data: program,
  });
});

// Delete
/*
 * @desc Delete Program
 * @route /api/v1/academic/program/:id
 * @method DELETE
 * @access Admin
 * */
exports.deleteProgram = expressAsyncHandler(async (req, res, next) => {
  const program = await Program.findByIdAndDelete(req?.params.id, {
    new: true,
  });
  await Admin.findByIdAndUpdate(
    req?.user._id,
    {
      $pull: { programs: program?._id },
    },
    { new: true }
  );

  if (!program) return next(new ErrorHandler("Invalid id", 404));
  res?.json({
    status: "success",
  });
});
