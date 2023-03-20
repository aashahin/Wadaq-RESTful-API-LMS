// External
const express = require("express");
const router = express.Router();

// Internal
const {
  signupTeacher,
  loginTeacher, updateProfileTeacher, getProfileTeacher, getAllTeachers, updateProfileTeacherByAdmin,
} = require("../../services/staff/teacherServices");
const Auth = require("../../middlewares/Auth/Auth");
const model = require("../../models/Staff/Teacher");
const admin = require("../../models/Staff/Admin");
const { permissions } = require("../../middlewares/Auth/permissions");

// Routes
// SignUp
router.route("/signup").post(signupTeacher);
// Login
router.route("/login").post(loginTeacher);
// Get All
router.route("/").get(Auth(model), permissions(["teacher"]), getAllTeachers);
// Get Profile
router
.route("/profile")
.get(Auth(model), permissions(["teacher"]), getProfileTeacher);
// Update
router
  .route("/profile")
  .patch(Auth(model), permissions(["teacher"]), updateProfileTeacher);

// Update teacher profile by admin
router.patch("/:id/profile",Auth(admin), permissions(["admin"]), updateProfileTeacherByAdmin)

// Delete
// router.route("/:id").delete();
// router.route("/suspend/teacher/:id").patch();
// router.route("/unsuspend/teacher/:id").patch();
// router.route("/withdraw/teacher/:id").patch();
// router.route("/unwithdraw/teacher/:id").patch();
// router.route("/publish/exam/:id").patch();
// router.route("/unpublished/exam/:id").patch();

module.exports = router;
