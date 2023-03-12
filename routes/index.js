const adminRoutes = require("./staff/adminRoute");

const path = "/api/v1";

exports.routes = (app) => {
  app.use(`${path}/staff/admin`, adminRoutes);
};
