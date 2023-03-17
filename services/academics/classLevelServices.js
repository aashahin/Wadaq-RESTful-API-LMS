// External
const expressAsyncHandler = require("express-async-handler");

// Internal
const ClassLevel = require("../../models/Academic/ClassLevel");
const Admin = require("../../models/Staff/Admin");
const ErrorHandler = require("../../middlewares/Errors/ErrorHandler");

// Create
/*
 * @desc Create Class Level
 * @route /api/v1/academic/class-level
 * @method POST
 * @access Admin
 * */
exports.createClassLevel = expressAsyncHandler(async (req, res, next) => {
  const { name, description } = req?.body;

  const checkExisted = await ClassLevel.findOne({ name });
  if (checkExisted)
    return next(new ErrorHandler("This Class Level is already exist", 401));

  const classLevel = await ClassLevel.create({
    name,
    description,
    createdBy: req?.user._id,
  });
  await Admin.findByIdAndUpdate(
    req?.user._id,
    {
      $push: { classLevels: classLevel?._id },
    },
    { new: true }
  );

  res?.json({
    status: "success",
    data: classLevel,
  });
});

// Get All
/*
 * @desc Get All Class Levels
 * @route /api/v1/academic/class-level
 * @method GET
 * @access Admin
 * */
exports.getAllClassLevels = expressAsyncHandler(async (req, res) => {
  const classLevels = await ClassLevel.find();
  res?.json({
    status: "success",
    data: classLevels,
  });
});

// Get One
/*
 * @desc Get Class Level
 * @route /api/v1/academic/class-level/:id
 * @method GET
 * @access Admin
 * */
exports.getClassLevel = expressAsyncHandler(async (req, res, next) => {
  const classLevel = await ClassLevel.findById(req?.params.id);
  if (!classLevel) return next(new ErrorHandler("Invalid id", 404));
  res?.json({
    status: "success",
    data: classLevel,
  });
});

// Update
/*
 * @desc Update Class Level
 * @route /api/v1/academic/class-level/:id
 * @method PATCH
 * @access Admin
 * */
exports.updateClassLevel = expressAsyncHandler(async (req, res, next) => {
  const { name, description } = req?.body;
  const { id } = req?.params;

  const checkExisted = await ClassLevel.findById(id);
  if (!checkExisted) return next(new ErrorHandler("Invalid id", 404));

  const classLevel = await ClassLevel.findByIdAndUpdate(
    id,
    {
      name: name || checkExisted?.name,
      description: description || checkExisted?.description,
    },
    { new: true }
  );

  res?.json({
    status: "success",
    data: classLevel,
  });
});

// Delete
/*
 * @desc Delete Class Level
 * @route /api/v1/academic/class-level/:id
 * @method DELETE
 * @access Admin
 * */
exports.deleteClassLevel = expressAsyncHandler(async (req, res, next) => {
  const classLevel = await ClassLevel.findByIdAndDelete(req?.params.id, {
    new: true,
  });
  await Admin.findByIdAndUpdate(
    req?.user._id,
    {
      $pull: { classLevels: classLevel?._id },
    },
    { new: true }
  );

  if (!classLevel) return next(new ErrorHandler("Invalid id", 404));
  res?.json({
    status: "success",
  });
});
