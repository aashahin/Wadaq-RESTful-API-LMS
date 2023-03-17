// External
const expressAsyncHandler = require("express-async-handler");

// Internal
const Subject = require("../../models/Academic/Subject");
const Program = require("../../models/Academic/Program");
const AcademicTerm = require("../../models/Academic/AcademicTerm");
const ErrorHandler = require("../../middlewares/Errors/ErrorHandler");

// Create
/*
 * @desc Create Subject
 * @route /api/v1/academic/subject/:programId/:academicTermId
 * @method POST
 * @access Admin
 * */
exports.createSubject = expressAsyncHandler(async (req, res, next) => {
  const { name, description } = req?.body;
  const { programId, academicTermId } = req?.params;

  const checkExisted = await Subject.findOne({ name });
  if (checkExisted)
    return next(new ErrorHandler("This Subject is already exist", 401));

  const checkProgram = await Program.findById(programId);
  const checkAcademicTerm = await AcademicTerm.findById(academicTermId);
  if (!checkProgram && checkAcademicTerm)
    return next(new ErrorHandler("Invalid params", 401));

  const subject = await Subject.create({
    name,
    description,
    academicTerm: academicTermId,
    createdBy: req?.user._id,
  });
  await Program.findByIdAndUpdate(
    programId,
    {
      $push: { subjects: subject?._id },
    },
    { new: true }
  );

  res?.json({
    status: "success",
    data: subject,
  });
});

// Get All
/*
 * @desc Get All Subjects
 * @route /api/v1/academic/subject
 * @method GET
 * @access Admin
 * */
exports.getAllSubjects = expressAsyncHandler(async (req, res) => {
  const subjects = await Subject.find();
  res?.json({
    status: "success",
    data: subjects,
  });
});

// Get One
/*
 * @desc Get Subject
 * @route /api/v1/academic/subject/:id
 * @method GET
 * @access Admin
 * */
exports.getSubject = expressAsyncHandler(async (req, res, next) => {
  const subject = await Subject.findById(req?.params.id);
  if (!subject) return next(new ErrorHandler("Invalid id", 404));
  res?.json({
    status: "success",
    data: subject,
  });
});

// Update
/*
 * @desc Update Subject
 * @route /api/v1/academic/subject/:id
 * @method PATCH
 * @access Admin
 * */
exports.updateSubject = expressAsyncHandler(async (req, res, next) => {
  const { name, description, duration } = req?.body;
  const { id } = req?.params;

  const checkExisted = await Subject.findById(id);
  if (!checkExisted) return next(new ErrorHandler("Invalid id", 404));

  const subject = await Subject.findByIdAndUpdate(
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
    data: subject,
  });
});

// Delete
/*
 * @desc Delete Subject
 * @route /api/v1/academic/subject/:id
 * @method DELETE
 * @access Admin
 * */
exports.deleteSubject = expressAsyncHandler(async (req, res, next) => {
  const { programId, id } = req?.params;
  const subject = await Subject.findByIdAndDelete(id, {
    new: true,
  });
  await Program.findByIdAndUpdate(
    programId,
    {
      $pull: { subjects: subject?._id },
    },
    { new: true }
  );

  if (!subject) return next(new ErrorHandler("Invalid id", 404));
  res?.json({
    status: "success",
  });
});
