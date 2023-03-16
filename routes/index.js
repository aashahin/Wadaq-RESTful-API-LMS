const adminRoutes = require("./staff/adminRoute");
const academicYearRoutes = require("./academics/academicYearRoute");

const path = "/api/v1";

exports.routes = (app) => {
  app.use(`${path}/staff/admin`, adminRoutes);
  app.use(`${path}/academic/academic-year`, academicYearRoutes);
};
