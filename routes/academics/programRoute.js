// External
const express = require("express");
const router = express.Router();

// Internal
const model = require("../../models/Staff/Admin");
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
  .post(Auth(model), permissions(["admin"]), createProgram)
  .get(Auth(model), permissions(["admin"]), getAllPrograms);

router
  .route("/:id")
  .get(Auth(model), permissions(["admin"]), getProgram)
  .patch(Auth(model), permissions(["admin"]), updateProgram)
  .delete(Auth(model), permissions(["admin"]), deleteProgram);

module.exports = router;
