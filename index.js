// External
require("dotenv").config({ path: ".env" });
const express = require("express"),
  app = express(),
  server = require("http").createServer(app);
  morgan = require("morgan");

// Internal
const { dbConnection } = require("./config/DB");

if (process.env.NODE_MODE === "development") {
  app.use(morgan("dev"));
  console.log(`Server Mode: ${process.env.NODE_MODE}`);
}

// Database
dbConnection();
// Setup Server
const PORT = process.env.PORT || 4000;
const onServer = server.listen(PORT, () => {
  console.log(`Running Server With ${PORT}`);
});

// Unhandled Rejection Outside Express
process.on("unhandledRejection", (err) => {
  console.log(`Unhandled Rejection Error: ${err}`);
  onServer.close(() => {
    console.log("ShutDown The Server.");
    process.exit(1);
  });
});
