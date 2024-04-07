import { Router } from "express";
import routerUser from "./user.route.js";
import routerPost from "./post.route.js";
import routerAuthGoogle from "./auth.route.js";

export const routerApi = (app, clientRedis) => {
  const router = Router();
  app.use("/api", router);
  router.use("/user", routerUser);
  router.use("/post", routerPost(clientRedis));
  router.use("/oauth2", routerAuthGoogle);
};
