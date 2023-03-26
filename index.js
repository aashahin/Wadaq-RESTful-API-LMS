// External
require("dotenv").config();
const express = require("express"),
    app = express(),
    morgan = require("morgan"),
    compression = require("compression"),
    cors = require("cors"),
    rateLimit = require("express-rate-limit"),
    hpp = require("hpp"),
    xssClean = require("xss-clean"),
    mongoSanitize = require("express-mongo-sanitize"),
    helmet = require("helmet");


// Internal
require("./config/db");
const { routes } = require("./routes");
const { globalErrors } = require("./middlewares/Errors/GlobalError");
const ErrorHandler = require("./middlewares/Errors/ErrorHandler");

// Security
// CORS Enable on Domain Limit
const corsOptions = {
  origin: process.env.BASE_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Limit each IP to limit requests
const limiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 500, // Limit each IP to 200 create account requests per `window` (here, per hour)
  message:
      "Too many accounts created from this IP, please try again after 30 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
// Limit for Auth
const limiterAuth = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 20, // Limit each IP to 200 create account requests per `window` (here, per hour)
  message:
      "Too many accounts created from this IP, please try again after 30 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// MiddleWares
// limit requests
app.use(express.json({ limit: "50kb" }));
// Mongo Sanitize
app.use(mongoSanitize());
// Helmet
app.use(helmet());
// XSS Clean
app.use(xssClean());
// Limit each IP to limit requests
app.use("/api", limiter);
app.use("/api/v1/auth/", limiterAuth);
// Compression for requests and CORS for all routes
app.use(compression(), cors(corsOptions));
// HPP
app.use(hpp());

if (process.env.NODE_MODE === "development") {
  app.use(morgan("dev"));
  console.log(`Server Mode: ${process.env.NODE_MODE}`);
}

// Routes
routes(app);

app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Can't Find This Route: ${req.originalUrl}`, 404));
});
app.use(globalErrors);
// Setup Server
const PORT = process.env.PORT || 4000;
const onServer = app.listen(PORT, () => {
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
