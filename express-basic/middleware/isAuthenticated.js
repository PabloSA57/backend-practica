import { customError } from "../utils/error.js";

export default function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  next(customError("", 401));
}
