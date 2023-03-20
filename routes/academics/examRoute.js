// External
const express = require("express");
const router = express.Router();

// Internal
const Auth = require("../../middlewares/Auth/Auth");
const { permissions } = require("../../middlewares/Auth/permissions");
const { createExam } = require("../../services/academics/examServices");

// Routes
router.post("/", Auth(), permissions(["teacher"]), createExam);
// router
//   .route("/:id")
//   .get(Auth(model), permissions(["admin"]), getYearGroup)
//   .patch(Auth(model), permissions(["admin"]), updateYearGroup)
//   .delete(Auth(model), permissions(["admin"]), deleteYearGroup);

module.exports = router;
