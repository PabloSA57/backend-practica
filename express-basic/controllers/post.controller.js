import { pool } from "../database/index.js";
import postService from "../services/post.service.js";
import { customError } from "../utils/error.js";

export default function controllerPost(clientRedis) {
  return {
    async createPost(req, res, next) {
      const { content } = req.body;
      const user = req.user;
      try {
        const result = await postService.createPost(content, user?.userId);

        res.status(201).json({ msg: "Post created", data: result.rows[0] });
      } catch (error) {
        next(error);
      }
    },
    async getPosts(req, res, next) {
      try {
        //const reply = await clientRedis.get("posts");
        /* if (reply) {
          console.log(reply, "reply-redis");
          res.set("Cache-Control", "no-cache, private");
          return res.json(JSON.parse(reply));
        }*/
        const result = await postService.getPosts();
        //res.set("Cache-Control", "private, max-age=3600");
        //await clientRedis.set("posts", JSON.stringify(result));
        res.json(result);
      } catch (error) {
        console.log(error);
        next(error);
      }
    },

    async updatePost(req, res, next) {
      const { id } = req.params;
      const user = req.user;
      const data = req.body;

      try {
        const result = await postService.updatePost(id, user.userId, data);

        if (result.rowCount === 0) {
          const err = customError("No data updated", 404);
          return next(err);
        }

        res.json({ msg: "Post updated", data: result.rows[0] });
      } catch (error) {
        next(error);
      }
    },

    async deletePost(req, res, next) {
      const { id } = req.params;
      const user = req.user;
      console.log(user, "user");

      try {
        const result = await postService.deletePost(id, user.userId);

        if (result.rowCount === 0) {
          const err = customError("No data was found with that ID", 404);
          return next(err);
        }

        res.json({ msg: "Post deleted" });
      } catch (error) {
        next(error);
      }
    },
  };
}
