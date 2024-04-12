const Router = require("express").Router;

const customerRoutes = require("../components/customers/routes");
const orderRoutes = require("../components/orders/routes");
const productRoutes = require("../components/products/routes");
const orderdetailRoutes = require("../components/orderdetail/routes");

function routesApi(app) {
  const router = Router();

  app.use("/api/v1", router);

  router.use("/customer", customerRoutes);
  router.use("/order", orderRoutes);
  router.use("/product", productRoutes);
  router.use("/orderdetail", orderdetailRoutes);
}

module.exports = routesApi;
