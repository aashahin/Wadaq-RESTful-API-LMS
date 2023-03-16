// External
const express = require("express");
const router = express.Router();

// Internal
const model = require("../../models/Staff/Admin");
const Auth = require("../../middlewares/Auth/Auth");
const { permissions } = require("../../middlewares/Auth/permissions");
const {
  createAcademicYear,
  getAllAcademicYears,
  getAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
} = require("../../services/academics/academicYearServices");

// Routes
router
  .route("/")
  .post(Auth(model), permissions(["admin"]), createAcademicYear)
  .get(Auth(model), permissions(["admin"]), getAllAcademicYears);

router
  .route("/:id")
  .get(Auth(model), permissions(["admin"]), getAcademicYear)
  .patch(Auth(model), permissions(["admin"]), updateAcademicYear)
  .delete(Auth(model), permissions(["admin"]), deleteAcademicYear);

module.exports = router;
