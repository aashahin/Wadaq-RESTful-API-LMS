// External
const express = require("express");
const router = express.Router();

// Internal
const Auth = require("../../middlewares/Auth/Auth");
const { permissions } = require("../../middlewares/Auth/permissions");
const {
  createQuestion,
  getAllQuestions,
  getQuestion,
  updateQuestion,
} = require("../../services/academics/questionServices");

// Routes
router.get("/", Auth(), getAllQuestions);
router.post("/:examId", Auth(), permissions(["teacher"]), createQuestion);
router
  .route("/:questionId")
  .get(Auth(), getQuestion)
  .patch(Auth(), permissions(["teacher"]), updateQuestion);
// router
//   .route("/:id")
//   .get(Auth(), getQuestion)
//   .patch(Auth(), permissions(["teacher"]), updateQuestion);

module.exports = router;
