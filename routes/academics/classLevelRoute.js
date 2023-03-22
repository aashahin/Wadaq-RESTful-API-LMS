// External
const express = require("express");
const router = express.Router();

// Internal
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
  .post(Auth(), permissions(["admin"]), createClassLevel)
  .get(Auth(), permissions(["admin", "teacher"]), getAllClassLevels);

router
  .route("/:id")
  .get(Auth(), permissions(["admin", "teacher"]), getClassLevel)
  .patch(Auth(), permissions(["admin"]), updateClassLevel)
  .delete(Auth(), permissions(["admin"]), deleteClassLevel);

module.exports = router;
