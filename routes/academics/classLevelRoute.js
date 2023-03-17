// External
const express = require("express");
const router = express.Router();

// Internal
const model = require("../../models/Staff/Admin");
const Auth = require("../../middlewares/Auth/Auth");
const { permissions } = require("../../middlewares/Auth/permissions");
const {
  createClassLevel,
  getAllClassLevels,
  getClassLevel,
  updateClassLevel,
  deleteClassLevel,
} = require("../../services/academics/classLevelServices");

// Routes
router
  .route("/")
  .post(Auth(model), permissions(["admin"]), createClassLevel)
  .get(Auth(model), permissions(["admin"]), getAllClassLevels);

router
  .route("/:id")
  .get(Auth(model), permissions(["admin"]), getClassLevel)
  .patch(Auth(model), permissions(["admin"]), updateClassLevel)
  .delete(Auth(model), permissions(["admin"]), deleteClassLevel);

module.exports = router;
