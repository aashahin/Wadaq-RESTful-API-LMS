const expressAsyncHandler = require("express-async-handler");
const Question = require("../../models/Academic/Question");
const Exam = require("../../models/Academic/Exam");
const Teacher = require("../../models/Staff/Teacher");
const ErrorHandler = require("../../middlewares/Errors/ErrorHandler");

// Create a new question
/*
 * @desc Create a new question
 * @route /api/v1/questions/:examId
 * @method POST
 * @access Teacher
 * */
exports.createQuestion = expressAsyncHandler(async (req, res, next) => {
  const { examId } = req?.params;
  const exam = await Exam.findById(examId);
  if (!exam) {
    return next(new ErrorHandler(`Exam not found with id of ${examId}`, 404));
  }

  const questionExist = await Question.findOne({
    question: req?.body?.question,
  });
  if (questionExist) {
    return next(new ErrorHandler(`Question already exist`, 400));
  }
  const question = await Question.create({
    ...req?.body,
    createdBy: req?.user?.id,
  });
  await Exam.findByIdAndUpdate(
    examId,
    {
      $push: { questions: question.id },
    },
    { new: true, runValidators: true }
  );

  res?.json({
    success: true,
    data: question,
  });
});

// Get all questions
/*
 * @desc Get all questions
 * @route /api/v1/questions/
 * @method GET
 * @access Auth
 * */
exports.getAllQuestions = expressAsyncHandler(async (req, res, next) => {
  const questions = await Question.find();
  res?.json({
    success: true,
    data: questions,
  });
});

// Get a question
/*
 * @desc Get a question
 * @route /api/v1/questions/:questionId
 * @method GET
 * @access Auth
 * */
exports.getQuestion = expressAsyncHandler(async (req, res, next) => {
  const { questionId } = req?.params;
  const question = await Question.findById(questionId);
  if (!question) {
    return next(
      new ErrorHandler(`Question not found with id of ${questionId}`, 404)
    );
  }
  res?.json({
    success: true,
    data: question,
  });
});

// Update a question
/*
 * @desc Update a question
 * @route /api/v1/questions/:questionId
 * @method PATCH
 * @access Teacher
 * */
exports.updateQuestion = expressAsyncHandler(async (req, res, next) => {
  const { questionId } = req?.params;
  const check = await Question.findById(questionId);
  if (!check) {
    return next(
      new ErrorHandler(`Question not found with id of ${questionId}`, 404)
    );
  }

  const question = await Question.findByIdAndUpdate(questionId, req?.body, {
    new: true,
  });
  res?.json({
    success: true,
    data: question,
  });
});
