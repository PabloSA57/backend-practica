export function logError(err, req, res, next) {
  console.log(err, "err");
  next(err);
}

export function errorHandler(err, req, res, next) {
  res
    .status(err?.statusCode || 500)
    .json({ err: err.statusCode ? err?.message : "Server error" });
}
