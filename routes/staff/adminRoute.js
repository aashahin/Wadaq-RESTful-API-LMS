// External
const express = require("express");
const router = express.Router();

// Internal
const {
  signupAdmin,
  loginAdmin,
} = require("../../services/staff/adminServices");
const Auth = require("../../middlewares/Auth/Auth");
const model = require("../../models/Staff/Admin");

// Routes
// SignUp
router.route("/signup").post(signupAdmin);
// Login
router.route("/login").post(loginAdmin);
// Get All
router.route("/").get(Auth(model));
// Get One
router.route("/:id").get();
// Update
router.route("/:id").patch();
// Delete
router.route("/:id").delete();
router.route("/suspend/teacher/:id").patch();
router.route("/unsuspend/teacher/:id").patch();
router.route("/withdraw/teacher/:id").patch();
router.route("/unwithdraw/teacher/:id").patch();
router.route("/publish/exam/:id").patch();
router.route("/unpublished/exam/:id").patch();
module.exports = router;
