"use strict";
const createError = require("../../../utils/createError");

class OrderDetailController {
  constructor(orderdetailService) {
    this.orderdetailService = orderdetailService;
  }
}

module.exports = OrderDetailController;
