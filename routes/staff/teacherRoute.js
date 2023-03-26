// External
const express = require("express");
const router = express.Router();

// Internal
const {
  signupTeacher,
  loginTeacher,
  updateProfileTeacher,
  getProfileTeacher,
  getAllTeachers,
  updateProfileTeacherByAdmin,
} = require("../../services/staff/teacherServices");
const Auth = require("../../middlewares/Auth/Auth");
const { permissions } = require("../../middlewares/Auth/permissions");

// Routes
// SignUp
router.route("/signup").post(signupTeacher);
// Login
router.route("/login").post(loginTeacher);
// Get All
router.route("/").get(Auth(), permissions(["admin"]), getAllTeachers);
// Get Profile
router
  .route("/profile")
  .get(Auth(), permissions(["teacher"]), getProfileTeacher);
// Update
router
  .route("/profile")
  .patch(Auth(), permissions(["teacher"]), updateProfileTeacher);

// Update teacher profile by admin
router.patch(
  "/:id/profile",
  Auth(),
  permissions(["admin"]),
  updateProfileTeacherByAdmin
);

module.exports = router;
