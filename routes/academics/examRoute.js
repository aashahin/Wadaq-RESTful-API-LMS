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
  updateExam,
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
//   .delete(Auth(model), permissions(["admin"]), deleteYearGroup);

module.exports = router;
