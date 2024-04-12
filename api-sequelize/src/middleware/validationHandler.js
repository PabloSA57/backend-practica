const createError = require("../utils/createError");

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(createError(error.message, 400));
    }
    next();
  };
}

module.exports = validatorHandler;
