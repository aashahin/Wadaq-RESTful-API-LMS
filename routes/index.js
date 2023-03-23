// Staff
const admin = require("./staff/adminRoute");
const teacher = require("./staff/teacherRoute");

// Academics
const academicYear = require("./academics/academicYearRoute");
const academicTerm = require("./academics/academicTermRoute");
const classLevel = require("./academics/classLevelRoute");
const program = require("./academics/programRoute");
const subject = require("./academics/subjectRoute");
const yearGroup = require("./academics/yearGroupRoute");
const exam = require("./academics/examRoute");
const student = require("./academics/studentRoute");

const path = "/api/v1";

exports.routes = (app) => {
  // Staff
  app.use(`${path}/staff/admin`, admin);
  app.use(`${path}/staff/teacher`, teacher);

  // Academics
  app.use(`${path}/academic/academic-year`, academicYear);
  app.use(`${path}/academic/academic-term`, academicTerm);
  app.use(`${path}/academic/class-level`, classLevel);
  app.use(`${path}/academic/program`, program);
  app.use(`${path}/academic/subject`, subject);
  app.use(`${path}/academic/year-group`, yearGroup);
  app.use(`${path}/academic/exam`, exam);
  app.use(`${path}/academic/student`, student);
};
