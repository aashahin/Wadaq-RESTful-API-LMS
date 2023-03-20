// External
const express = require("express");
const router = express.Router();

// Internal
const Auth = require("../../middlewares/Auth/Auth");
const { permissions } = require("../../middlewares/Auth/permissions");
const {
  createAcademicTerm,
  getAllAcademicTerms,
  getAcademicTerm,
  updateAcademicTerm,
  deleteAcademicTerm,
} = require("../../services/academics/academicTermServices");

// Routes
router
  .route("/")
  .post(Auth(), permissions(["admin", "teacher"]), createAcademicTerm)
  .get(Auth(), permissions(["admin", "teacher"]), getAllAcademicTerms);

router
  .route("/:id")
  .get(Auth(), permissions(["admin", "teacher"]), getAcademicTerm)
  .patch(Auth(), permissions(["admin", "teacher"]), updateAcademicTerm)
  .delete(Auth(), permissions(["admin", "teacher"]), deleteAcademicTerm);

module.exports = router;
