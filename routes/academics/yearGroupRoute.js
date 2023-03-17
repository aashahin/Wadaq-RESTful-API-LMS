// External
const express = require("express");
const router = express.Router();

// Internal
const model = require("../../models/Staff/Admin");
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
  Auth(model),
  permissions(["admin"]),
  createYearGroup
);
router.get("/", Auth(model), permissions(["admin"]), getAllYearGroups);
router
  .route("/:id")
  .get(Auth(model), permissions(["admin"]), getYearGroup)
  .patch(Auth(model), permissions(["admin"]), updateYearGroup)
  .delete(Auth(model), permissions(["admin"]), deleteYearGroup);

module.exports = router;
