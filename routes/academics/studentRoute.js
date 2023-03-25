// External
const express = require("express");
const router = express.Router();

// Internal
const {
  signupStudent,
  loginStudent,
  updateProfileStudent,
  getProfileStudent,
  getAllStudents,
  updateProfileStudentByAdmin, takeExam,
} = require("../../services/academics/studentServices");
const Auth = require("../../middlewares/Auth/Auth");
const { permissions } = require("../../middlewares/Auth/permissions");

// Routes
// SignUp
router.route("/signup").post(Auth(), permissions(["admin"]), signupStudent);
// Login
router.route("/login").post(loginStudent);
// Get All
router.route("/").get(Auth(), getAllStudents);
// Get Profile
router
  .route("/profile")
  .get(Auth(), permissions(["student"]), getProfileStudent);
// Update
router
  .route("/profile")
  .patch(Auth(), permissions(["student"]), updateProfileStudent);

// Update student profile by admin
router.patch(
  "/:id/profile",
  Auth(),
  permissions(["admin"]),
  updateProfileStudentByAdmin
);

// Exam
router.post("/exam/:examId", Auth(), permissions(["student"]), takeExam);
module.exports = router;
