import passport from "passport";
import { Strategy as localStrategy } from "passport-local";

import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";

import userService from "../services/user.service.js";
import { isValidPassword } from "./bycrypt.js";
import { customError } from "../utils/error.js";
const KEY_JWT = process.env.KEY_JWT;
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await userService.createUser(email, password);
        return done(null, user);
      } catch (e) {
        done(e);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const user = await userService.getOneUser(email);
      if (!user) {
        const err = customError("Password or email invalid", 403);
        return done(err, false, { message: "User not found" });
      }

      try {
        const match = await isValidPassword(password, user?.password_hash);

        if (!match) {
          console.log("not match");
          const err = customError("Password or email invalid", 403);

          return done(err, false, { message: "Password do not match" });
        }

        return done(false, user, { message: "Login successfull" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      secretOrKey: KEY_JWT,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      console.log("jwt");
      try {
        return done(null, token.user);
      } catch (e) {
        console.log(e, "err-pass");
        return done(e);
      }
    }
  )
);
