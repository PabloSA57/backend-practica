const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const routesApi = require("./routes/index.js");
const {
  errorHandler,
  ormErrorHandler,
  logErrors,
} = require("./middleware/errorHandler.js");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

routesApi(app);
app.use(ormErrorHandler);
app.use(errorHandler);
app.use(logErrors);

module.exports = { app };
