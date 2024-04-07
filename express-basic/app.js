import express, { json } from "express";
import passport from "passport";
import logger from "morgan";
import cookieParser from "cookie-parser";
import { createClient } from "redis";
import cookieSession from "cookie-session";
import session from "express-session";

import { routerApi } from "./routes/index.js";
import apiDocV1 from "./swagger.js";
import { errorHandler, logError } from "./middleware/error.js";

import "./libs/passport-google.js";
import "./libs/passport.js";
const app = express();

app.use(
  session({
    secret: "keyboard session",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate("session"));
/*app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());*/
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(json());

const client = createClient({
  host: "127.0.0.1",
  port: 6379,
});

apiDocV1(app);
routerApi(app, client);
app.use(logError);
app.use(errorHandler);

export { app, client };
