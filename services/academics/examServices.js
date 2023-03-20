const Exam = require("../../models/Academic/Exam");
const Teacher = require("../../models/Staff/Teacher");
const expressAsyncHandler = require("express-async-handler");
const ErrorHandler = require("../../middlewares/Errors/ErrorHandler");

// Create Exam
/*
 * @desc Create Exam
 * @route /api/v1/exam
 * @method POST
 * @access Private
 * */
exports.createExam = expressAsyncHandler(async (req, res, next) => {
  const {
    name,
    description,
    subject,
    program,
    academicYear,
    academicTerm,
    duration,
    examDate,
    examTime,
    examType,
  } = req?.body;

  // Create exam
  const exam = await Exam.create({
    name: name,
    description: description,
    subject: subject,
    program: program,
    academicYear: academicYear,
    academicTerm: academicTerm,
    duration: duration,
    examDate: examDate,
    examTime: examTime,
    examType: examType,
    createdBy: req?.user._id,
  });

  // Add exam to teacher
  const teacher = await Teacher.findByIdAndUpdate(
    req?.user._id,
    {
      $push: { exams: exam._id },
    },
    { new: true }
  ).select("-password");

  res?.json({exam, teacher});
});
