// External
const express = require("express");
const router = express.Router();

// Internal
const model = require("../../models/Staff/Admin");
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
  .post(Auth(model), permissions(["admin"]), createAcademicTerm)
  .get(Auth(model), permissions(["admin"]), getAllAcademicTerms);

router
  .route("/:id")
  .get(Auth(model), permissions(["admin"]), getAcademicTerm)
  .patch(Auth(model), permissions(["admin"]), updateAcademicTerm)
  .delete(Auth(model), permissions(["admin"]), deleteAcademicTerm);

module.exports = router;
