import { Router } from "express";
import {
  registerUser,
  authenticatedUser,
  loginUser,
  loginUserWithPassport,
} from "../controllers/user.controller.js";
import routerPrivate from "../middleware/routerPrivate.js";

const router = Router();

/**
 * @openapi
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: id
 *        name:
 *          type: string
 *          description: the name of the user
 *          example: Pablo
 *        lastname:
 *          type: string
 *          description: the lastname of the user
 *          example: Sierra
 *        email:
 *          type: string
 *          description: the email of the user
 *          example: psierra@gmail.com
 *        password:
 *          type: string
 *          description: the password of the user
 *          example: 122osdosP@
 *      required:
 *        - password
 *    LoginUser:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: User Email
 *        password:
 *          type: string
 *          description: User Password
 *    UserNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found user
 *      example:
 *        msg: Post was not found
 *
 *  parameters:
 *    userId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 *      description: the user id
 *    authorization:
 *      in: header
 *      name: Authorization
 *      required: true
 *      schema:
 *        type: string
 *      description: the jwt
 */

/**
 * @openapi
 * /api/user/register:
 *   post:
 *     tags:
 *        - User
 *     description: Add new User
 *     summary: Add new User
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Success response
 *       406:
 *         description: User already exists
 */

router.post("/register", registerUser);

/**
 * @openapi
 * /api/user/login:
 *   post:
 *     tags:
 *        - User
 *     description: Login User
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: Success response.
 */

router.post("/login", loginUserWithPassport);

/**
 * @openapi
 * /api/user/{id}:
 *  get:
 *    summary: get a user by Id
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - User
 *    parameters:
 *      - $ref: '#/components/parameters/userId'
 *      - $ref: '#/components/parameters/authorization'
 *    responses:
 *      200:
 *        description: The Found User
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/User'
 *      404:
 *        description: the user was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserNotFound'
 */

router.get("/:id", routerPrivate, authenticatedUser);

export default router;
