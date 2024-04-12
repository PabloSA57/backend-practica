const Router = require("express").Router;
const OrderController = require("./controller/OrderController.js");
const OrderRepository = require("./domain/OrderRepository.js");
const OrderService = require("./domain/OrderService.js");

const OrderDetailService = require("../orderdetail/domain/OrderDetailService.js");
const OrderDetailRepository = require("../orderdetail/domain/OrderDetailRepository.js");

const ProductService = require("../products/domain/ProductService.js");
const ProductRepository = require("../products/domain/ProductRepository.js");

const route = Router();

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

const orderDetailRepository = new OrderDetailRepository();
const orderDetailService = new OrderDetailService(
  orderDetailRepository,
  productService
);

const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository, orderDetailService);
const orderController = new OrderController(orderService);

route.post("/", orderController.createOrder.bind(orderController));
route.get("/:id", orderController.getOneOrder.bind(orderController));
route.get(
  "/customer/:customerId",
  orderController.getAllOrders.bind(orderController)
);
route.delete("/:id", orderController.deleteOrder.bind(orderController));
route.put("/:id", orderController.updateOrder.bind(orderController));

module.exports = route;
