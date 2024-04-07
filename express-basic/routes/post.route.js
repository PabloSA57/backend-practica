import { Router } from "express";
import controllerPost from "../controllers/post.controller.js";
import routerPrivate from "../middleware/routerPrivate.js";

const router = Router();

export default function routerPost(clientRedis) {
  const { createPost, getPosts, deletePost, updatePost } =
    controllerPost(clientRedis);
  /**
   * @swagger
   * security:
   *  BearerAuth: []
   * components:
   *  securitySchemes:
   *    BearerAuth:
   *      type: http
   *      schema: bearer
   *      bearerFormat: JWT
   *  schemas:
   *    Post:
   *      type: object
   *      properties:
   *        id:
   *          type: integer
   *          description: id
   *        content:
   *          type: string
   *          description: the text of the post
   *        user_id:
   *          type: integer
   *          description: the id_user of the post
   *      required:
   *        - content
   *        - user_id
   *      example:
   *        id: 1
   *        text: My first Post
   *        id_user: 1
   *    GetPost:
   *      type: object
   *      properties:
   *        msg:
   *          type:
   *          description: message
   *        data:
   *          type: object
   *          properties:
   *            id:
   *              type: integer
   *              description: id
   *            content:
   *              type: string
   *              description: the text of the post
   *            user_id:
   *              type: integer
   *              description: the userId of the user/post
   *            name:
   *              type: string
   *              description: the name of the user/post
   *            email:
   *              type: string
   *              description: the email of the user/post
   *            lastname:
   *              type: string
   *              description: the lastname of the user/post
   *          example:
   *            id: 1
   *            text: My first Post
   *            name: Pablo
   *            lastname: Sierra
   *    PostNotFound:
   *      type: object
   *      properties:
   *        msg:
   *          type: string
   *          description: A message for the not found post
   *      example:
   *        msg: Post was not found
   *
   *  parameters:
   *    postId:
   *      in: path
   *      name: id
   *      required: true
   *      schema:
   *        type: string
   *      description: the post id
   */

  /**
   * @openapi
   * /api/post:
   *   post:
   *     tags:
   *        - Post
   *     description: Add new Post
   *     summary: Add new Post
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Post'
   *     responses:
   *       200:
   *         description: Success response
   */
  router.post("/", routerPrivate, createPost);

  /**
   * @openapi
   * /api/post:
   *   get:
   *     tags:
   *        - Post
   *     description: Get all Post
   *     summary: Get all Post
   *     responses:
   *       '200':
   *         description: Success response
   *         content:
   *          application/json:
   *            schema:
   *              type: object
   *              items:
   *                $ref: '#/components/schemas/Post'
   */
  router.get("/", getPosts);

  /**
   * @openapi
   * /api/post/{postId}:
   *   put:
   *     tags:
   *        - Post
   *     description: Update one Post
   *     summary: Update one Post
   *     security:
   *      - BearerAuth: []
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              content:
   *                type: string
   *     parameters:
   *      - name: postId
   *        in: path
   *        description: post id to update
   *        required: true
   *        schema:
   *          type: integer
   *          format: int64
   *     responses:
   *       '200':
   *         description: Success updated
   *         content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/GetPost'
   */
  router.put("/:id", routerPrivate, updatePost);

  /**
   * @openapi
   * /api/post/{postId}:
   *   delete:
   *     tags:
   *        - Post
   *     description: Delete one Post
   *     summary: delete one Post
   *     parameters:
   *      - name: postId
   *        in: path
   *        description: post id to delete
   *        required: true
   *        schema:
   *          type: integer
   *          format: int64
   *     responses:
   *       '200':
   *         description: Success delete
   *         content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/GetPost'
   */
  router.delete("/:id", routerPrivate, deletePost);

  return router;
}
