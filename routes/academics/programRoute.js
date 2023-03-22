// External
const express = require("express");
const router = express.Router();

// Internal
const Auth = require("../../middlewares/Auth/Auth");
const { permissions } = require("../../middlewares/Auth/permissions");
const {
  createProgram,
  getAllPrograms,
  getProgram,
  updateProgram,
  deleteProgram,
} = require("../../services/academics/programServices");

// Routes
router
  .route("/")
  .post(Auth(), permissions(["admin"]), createProgram)
  .get(Auth(), permissions(["admin"]), getAllPrograms);

router
  .route("/:id")
  .get(Auth(), permissions(["admin"]), getProgram)
  .patch(Auth(), permissions(["admin"]), updateProgram);

module.exports = router;
