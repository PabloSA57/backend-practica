import { Router } from "express";
import jwt from "jsonwebtoken";
import { customError } from "../utils/error.js";
const KEY_JWT = process.env.KEY_JWT;

const routerPrivate = Router();

routerPrivate.use((req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const isAuthenticated = req.isAuthenticated();
  console.log(req.headers, "headers-token", isAuthenticated);
  if (!token && !isAuthenticated) {
    next(customError("No authenticated", 401));
  }

  if (token) {
    jwt.verify(token, KEY_JWT, (err, decoded) => {
      if (err) {
        next(customError("No valid JWT token", 403));
      } else {
        console.log(decoded, "decoded");
        req.user = decoded.user;
        next();
      }
    });
  }
  if (isAuthenticated) {
    console.log(req.user, "user-iscauthenticated");
    next();
  }
});

export default routerPrivate;
