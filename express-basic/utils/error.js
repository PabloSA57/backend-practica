export function customError(msg, status) {
  const err = new Error(msg);
  err.statusCode = status;
  return err;
}

export const unauthorizedError = customError(
  "No valid JWT token provided",
  401
);
export const notFoundError = customError("Not Found", 404);
