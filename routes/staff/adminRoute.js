// External
const express = require("express");
const router = express.Router();

// Internal
const {
  signupAdmin,
  loginAdmin,
  getAllAdmins,
  getProfileAdmin,
  updateProfileAdmin,
} = require("../../services/staff/adminServices");
const Auth = require("../../middlewares/Auth/Auth");
const model = require("../../models/Staff/Admin");
const { permissions } = require("../../middlewares/Auth/permissions");

// Routes
// SignUp
router.route("/signup").post(signupAdmin);
// Login
router.route("/login").post(loginAdmin);
// Get All
router.route("/").get(Auth(model), permissions(["admin"]), getAllAdmins);
// Get Profile
router
  .route("/profile")
  .get(Auth(model), permissions(["admin"]), getProfileAdmin);
// Update
router
  .route("/profile")
  .patch(Auth(model), permissions(["admin"]), updateProfileAdmin);
// Delete
router.route("/:id").delete();
router.route("/suspend/teacher/:id").patch();
router.route("/unsuspend/teacher/:id").patch();
router.route("/withdraw/teacher/:id").patch();
router.route("/unwithdraw/teacher/:id").patch();
router.route("/publish/exam/:id").patch();
router.route("/unpublished/exam/:id").patch();
module.exports = router;
