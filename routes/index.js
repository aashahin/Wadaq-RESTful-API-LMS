const adminRoutes = require("./staff/adminRoute");
const academicYearRoutes = require("./academics/academicYearRoute");
const academicTermRoutes = require("./academics/academicTermRoute");

const path = "/api/v1";

exports.routes = (app) => {
  app.use(`${path}/staff/admin`, adminRoutes);
  app.use(`${path}/academic/academic-year`, academicYearRoutes);
  app.use(`${path}/academic/academic-term`, academicTermRoutes);
};
