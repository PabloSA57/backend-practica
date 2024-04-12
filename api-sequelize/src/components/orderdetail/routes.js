const Router = require("express").Router;
const OrderDetailController = require("./controller/OrderDetailController.js");
const OrderDetailRepository = require("./domain/OrderDetailRepository.js");
const OrderDetailService = require("./domain/OrderDetailService.js");

const route = Router();

const orderdetailRepository = new OrderDetailRepository();
const orderdetailService = new OrderDetailService(orderdetailRepository);
const orderdetailController = new OrderDetailController(orderdetailService);

module.exports = route;
