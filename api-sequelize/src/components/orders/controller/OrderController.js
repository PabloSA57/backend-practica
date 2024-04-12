"use strict";
const createError = require("../../../utils/createError");

class OrderController {
  constructor(orderService) {
    this.orderService = orderService;
  }

  async createOrder(req, res, next) {
    const { customerId, products } = req.body;
    console.log(customerId, "cutomerId");
    try {
      await this.orderService.createOrder(customerId, products);
      res.status(201).json({ status: "OK", data: {}, message: "Created" });
    } catch (error) {
      next(error);
    }
  }

  async getOneOrder(req, res, next) {
    const { id } = req.params;
    try {
      const response = await this.orderService.getOneOrder(id);
      if (!response) {
        const err = createError("Cliente no encontrado", 404);
        throw err;
      }
      res.status(200).json({ status: "OK", data: response });
    } catch (error) {
      next(error);
    }
  }
  async getAllOrders(req, res, next) {
    const { customerId } = req.params;
    try {
      const response = await this.orderService.getAllOrders(customerId);

      res.status(200).json({ status: "OK", data: response });
    } catch (error) {
      next(error);
    }
  }
  async deleteOrder(req, res, next) {
    const { id } = req.params;
    try {
      const response = await this.orderService.deleteOrder(id);

      if (!response) {
        const err = createError("Cliente no encontrado", 404);
        throw err;
      }

      res.status(200).json({ status: "OK", data: response });
    } catch (error) {
      next(error);
    }
  }
  async updateOrder(req, res, next) {
    const { id } = req.params;
    const data = req.body;
    try {
      const response = await this.orderService.updateOrder(data, id);

      if (!response[0]) {
        const err = createError("Cliente no encontrado", 404);
        throw err;
      }

      res.status(200).json({ status: "OK", data: response });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
