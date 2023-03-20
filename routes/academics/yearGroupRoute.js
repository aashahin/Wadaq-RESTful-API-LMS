// External
const express = require("express");
const router = express.Router();

// Internal
const Auth = require("../../middlewares/Auth/Auth");
const { permissions } = require("../../middlewares/Auth/permissions");
const {
  createYearGroup,
  getAllYearGroups,
  getYearGroup,
  updateYearGroup,
  deleteYearGroup,
} = require("../../services/academics/yearGroupServices");

// Routes
router.post(
  "/:academicYearId",
  Auth(),
  permissions(["admin"]),
  createYearGroup
);
router.get("/", Auth(), permissions(["admin"]), getAllYearGroups);
router
  .route("/:id")
  .get(Auth(), permissions(["admin"]), getYearGroup)
  .patch(Auth(), permissions(["admin"]), updateYearGroup)
  .delete(Auth(), permissions(["admin"]), deleteYearGroup);

module.exports = router;
