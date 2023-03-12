// External
require("dotenv").config();
const express = require("express"),
  app = express(),
  server = require("http").createServer(app);
morgan = require("morgan");

// Internal
require("./config/db");
const { routes } = require("./routes");
const { globalErrors } = require("./middlewares/Errors/GlobalError");
const ErrorHandler = require("./middlewares/Errors/ErrorHandler");

if (process.env.NODE_MODE === "development") {
  app.use(morgan("dev"));
  console.log(`Server Mode: ${process.env.NODE_MODE}`);
}

app.use(express.json());
// Routes
routes(app);

app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Can't Find This Route: ${req.originalUrl}`, 404));
});
app.use(globalErrors);
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
