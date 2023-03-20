// External
const express = require("express");
const router = express.Router();

// Internal
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
  .post(Auth(), permissions(["admin"]), createAcademicYear)
  .get(Auth(), permissions(["admin", "teacher"]), getAllAcademicYears);

router
  .route("/:id")
  .get(Auth(), permissions(["admin", "teacher"]), getAcademicYear)
  .patch(Auth(), permissions(["admin"]), updateAcademicYear)
  .delete(Auth(), permissions(["admin"]), deleteAcademicYear);

module.exports = router;
