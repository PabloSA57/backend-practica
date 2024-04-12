const { ValidationError } = require("sequelize");

function logErrors(err, req, res, next) {
  //console.error("aqui1",err);
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(err.statusCode || 500).json({
    message: err.message,
    stack: err.stack,
  });
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    console.log(err.message);
    res.status(409).json({
      statusCode: 409,
      message: err.message,
      errors: err.errors,
    });
    return;
  }
  next(err);
}

module.exports = { logErrors, errorHandler, ormErrorHandler };
