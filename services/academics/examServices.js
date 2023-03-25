const Exam = require("../../models/Academic/Exam");
const Teacher = require("../../models/Staff/Teacher");
const expressAsyncHandler = require("express-async-handler");
const ErrorHandler = require("../../middlewares/Errors/ErrorHandler");

// Create Exam
/*
 * @desc Create Exam
 * @route /api/v1/exam
 * @method POST
 * @access Auth
 * */
exports.createExam = expressAsyncHandler(async (req, res, next) => {
  const {
    name,
    description,
    subject,
    program,
    academicYear,
    academicTerm,
    classLevel,
    duration,
    examDate,
    examTime,
    examType,
  } = req?.body;

  // Create exam
  const exam = await Exam.create({
    name,
    description,
    subject,
    program,
    academicYear,
    academicTerm,
    classLevel,
    duration,
    examType,
    examDate,
    examTime,
    createdBy: req?.user._id,
  });

  // Add exam to teacher
  const teacher = await Teacher.findByIdAndUpdate(
    req?.user._id,
    {
      $push: { exams: exam._id },
    },
    { new: true }
  ).select(["exams", "name", "avatar", "email"]);

  res?.json({ exam, teacher });
});

// Get All Exams
/*
 * @desc Get All Exams
 * @route /api/v1/exam
 * @method GET
 * @access Auth
 * */
exports.getAllExams = expressAsyncHandler(async (req, res, next) => {
  const exams = await Exam.find();
  res?.json(exams);
});

// Get Exam
/*
 * @desc Get Exam
 * @route /api/v1/exam/:id
 * @method GET
 * @access Auth
 */
exports.getExam = expressAsyncHandler(async (req, res, next) => {
  const exam = await Exam.findById(req?.params?.id).populate({
    path: "questions",
  });
  if (!exam) {
    return next(new ErrorHandler("Exam not found", 404));
  }
  res?.json(exam);
});

// Update Exam
/*
 * @desc Update Exam
 * @route /api/v1/exam/:id
 * @method PATCH
 * @access Auth
 */
exports.updateExam = expressAsyncHandler(async (req, res, next) => {
  const {
    name,
    description,
    subject,
    program,
    academicYear,
    academicTerm,
    classLevel,
    duration,
    examDate,
    examTime,
    examType,
  } = req?.body;
  const data = await Exam.findById(req?.params?.id);
  if (!data) {
    return next(new ErrorHandler("Exam not found", 404));
  }
  const exam = await Exam.findByIdAndUpdate(
    req?.params?.id,
    {
      name: name || data?.name,
      description: description || data?.description,
      subject: subject || data?.subject,
      program: program || data?.program,
      academicYear: academicYear || data?.academicYear,
      academicTerm: academicTerm || data?.academicTerm,
      classLevel: classLevel || data?.classLevel,
      duration: duration || data?.duration,
      examDate: examDate || data?.examDate,
      examTime: examTime || data?.examTime,
      examType: examType || data?.examType,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res?.json(exam);
});