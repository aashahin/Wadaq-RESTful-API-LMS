// External
const express = require("express");
const router = express.Router();

// Internal
const Auth = require("../../middlewares/Auth/Auth");
const { permissions } = require("../../middlewares/Auth/permissions");
const {
  createExam,
  getAllExams,
  getExam,
  updateExam, getExamResult, getExamsResultsStudent, getExamsResultsAll, publishExamResult,
} = require("../../services/academics/examServices");

// Routes
router
  .route("/")
  .post(Auth(), permissions(["teacher"]), createExam)
  .get(Auth(), getAllExams);
router
  .route("/:id")
  .get(Auth(), getExam)
  .patch(Auth(), permissions(["teacher"]), updateExam);

router.get("/results/all",Auth(),permissions(["teacher"]), getExamsResultsAll);
router.get("/results/student",Auth(),permissions(["student"]), getExamsResultsStudent);
router.get("/:examId/result",Auth(),permissions(["student"]), getExamResult);
router.patch("/:examId/result",Auth(),permissions(["teacher"]), publishExamResult);
module.exports = router;
