import jwt from "jsonwebtoken";

import { pool } from "../database/index.js";
import userService from "../services/user.service.js";
import { customError } from "../utils/error.js";
import { passwordHash, isValidPassword } from "../libs/bycrypt.js";
import passport from "passport";
const KEY_JWT = process.env.KEY_JWT;

const registerUser = async (req, res, next) => {
  const { name, lastname, email, password } = req.body;

  const password_hash = passwordHash(password);

  try {
    await userService.createUser(name, lastname, email, password_hash, null);
    res.status(201).json({ msg: "Successful registration" });
  } catch (error) {
    if (
      error.message ===
      "llave duplicada viola restricción de unicidad «users_email_key»"
    ) {
      error = customError("User already exists", 409);
    }
    next(error);
  }
};

//Login with passport

const loginUserWithPassport = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        throw err;
      }

      req.login(user, { session: false }, async (err) => {
        if (err) return next(err);
        const body = { userId: user.id, email: user.email };

        const token = jwt.sign({ user: body }, KEY_JWT);
        return res.json({ token });
      });
    } catch (e) {
      return next(e);
    }
  })(req, res, next);
};

//Login
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const userResult = await userService.getOneUser(email);

  if (!userResult) {
    return res.status(401).json({ error: "User not register" });
  }

  try {
    const match = await isValidPassword(password, userResult.password);

    if (!match) {
      const errPassword = customError("Incorrect password", 401);
      throw errPassword;
    }
    const token = jwt.sign({ userId: userResult?.id }, KEY_JWT, {
      expiresIn: "24h",
    });

    res.json({ token, userId: userResult?.id });
  } catch (error) {
    next(error);
  }
};

const authenticatedUser = async (req, res, next) => {
  const userId = req.user.userId || req.params.id;
  try {
    const result = await userService.getOneUser("", userId);

    if (!user) {
      const err = customError("user not found", 404);
      next(err);
    }
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { registerUser, loginUser, loginUserWithPassport, authenticatedUser };
