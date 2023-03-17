// External
const express = require("express");
const router = express.Router();

// Internal
const model = require("../../models/Staff/Admin");
const Auth = require("../../middlewares/Auth/Auth");
const { permissions } = require("../../middlewares/Auth/permissions");
const {
  createSubject,
  getAllSubjects,
  getSubject,
  updateSubject,
  deleteSubject,
} = require("../../services/academics/subjectServices");

// Routes
router
  .get("/",Auth(model), permissions(["admin"]), getAllSubjects);
router
    .post("/:programId/:academicTermId",Auth(model), permissions(["admin"]), createSubject)
router
  .route("/:id")
  .get(Auth(model), permissions(["admin"]), getSubject)
  .patch(Auth(model), permissions(["admin"]), updateSubject)
router.delete("/:id/:programId",Auth(model), permissions(["admin"]), deleteSubject);
module.exports = router;
