// External
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

// Internal
const Student = require("../../models/Academic/Student");
const Exam = require("../../models/Academic/Exam");
const ExamResult = require("../../models/Academic/ExamResult");
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
    if (student?.isWithdrawn)
      return next(new ErrorHandler("You are withdrawn from the school.", 401));
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
exports.getAllStudents = expressAsyncHandler(async (req, res) => {
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
exports.getProfileStudent = expressAsyncHandler(async (req, res) => {
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
    const {
      name,
      email,
      classLevels,
      programs,
      academicYears,
      achievements,
      isWithdrawn,
      isSuspended,
    } = req?.body;
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
        isWithdrawn,
        isSuspended,
        $addToSet: { classLevels, programs, academicYears, achievements },
      },
      { new: true }
    );

    res?.json(student);
  }
);

// Take Exam By Student
/*
 * @desc  Take Exam By Student
 * @route /api/v1/student/exam/:examId
 * @method POST
 * @access Auth
 */
exports.takeExam = expressAsyncHandler(async (req, res, next) => {
  const { examId } = req?.params;
  const exam = await Exam.findById(examId).populate("questions");
  if (!exam) {
    return next(new ErrorHandler("Invalid id exam", 404));
  }

  // check if student is suspended
  if (req?.user.isSuspended)
    return next(new ErrorHandler("You are suspended from the school.", 401));

  // check if student has already taken this exam
  const checkExam = await ExamResult.findOne({
    student: req?.user?.id,
    exam: examId,
  });
  if (checkExam) {
    return next(new ErrorHandler("You have already taken this exam", 401));
  }

  const questions = exam?.questions;
  const { answers } = req?.body;
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let score = 0;
  let totalQuestions = questions.length;

  if (totalQuestions === answers.length) {
    for (let i = 0; i < totalQuestions; i++) {
      const question = questions[i];
      if (question.answer === answers[i]) {
        correctAnswers++;
        score++;
        question.isCorrect = true;
      } else {
        wrongAnswers++;
        question.isCorrect = false;
      }
    }
  } else {
    return next(new ErrorHandler("You must answer all questions", 401));
  }

  // calculate grade
  let grade = (correctAnswers / totalQuestions) * 100;
  let answeredQuestions = questions.map((question) => ({
    question: question.question,
    answer: question.answer,
    isCorrect: question.isCorrect,
  }));

  // calculate status
  let status = grade >= 50 ? "Pass" : "Fail";
  let remarks;
  if (grade >= 90) {
    remarks = "Excellent";
  } else if (grade >= 80) {
    remarks = "Very Good";
  } else if (grade >= 70) {
    remarks = "Good";
  } else if (grade >= 60) {
    remarks = "Fair";
  } else if (grade >= 50) {
    remarks = "Pass";
  } else {
    remarks = "Fail";
  }

  // save exam result
  const examResult = await ExamResult.create({
    student: req?.user?.id,
    exam,
    answeredQuestions,
    score,
    grade,
    status,
    remarks,
    classLevel: exam?.classLevel,
    academicYear: exam?.academicYear,
    academicTerm: exam?.academicTerm,
  });
  await Student.findByIdAndUpdate(
    req?.user?.id,
    {
      $addToSet: { examResults: examResult?._id },
    },
    { new: true }
  );

  // Promotion
  let { currentClassLevel } = req?.user;
  if (status === "Pass") {
    let split = currentClassLevel?.split(" ");
    let newClassLevel;
    if (split[1] === "0") {
      newClassLevel = `${split[0]} 1`;
    } else if (split[1] === "1") {
      newClassLevel = `${split[0]} 2`;
    } else if (split[1] === "2") {
      newClassLevel = `${split[0]} 3`;
    } else if (split[1] === "3") {
      newClassLevel = `${split[0]} 4`;
    } else if (split[1] === "4") {
      newClassLevel = `${split[0]} 5`;
    } else if (split[1] === "5") {
      newClassLevel = split.join(" ");
    }
    split = newClassLevel;
    await Student.findByIdAndUpdate(
      req?.user?.id,
      { $addToSet: { classLevels: split } },
      { new: true }
    );
  }
  res?.json({
      message: "Exam taken successfully, please check your result",
  });
});
