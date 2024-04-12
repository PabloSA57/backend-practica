"use strict";
const createError = require("../../../utils/createError");

class CustomerController {
  constructor(customerService) {
    this.customerService = customerService;
  }

  async createCustomer(req, res, next) {
    const data = req.body;
    try {
      const response = await this.customerService.createCustomer(data);
      res.status(201).json({ status: "OK", data: response });
    } catch (error) {
      next(error);
    }
  }

  async getOneCustomer(req, res, next) {
    const { id } = req.params;
    try {
      const response = await this.customerService.getOneCustomer(id);
      if (!response) {
        const err = createError("Cliente no encontrado", 404);
        throw err;
      }
      res.status(200).json({ status: "OK", data: response });
    } catch (error) {
      next(error);
    }
  }
  async getAllCustomers(req, res, next) {
    try {
      const response = await this.customerService.getAllCustomers();

      res.status(200).json({ status: "OK", data: response });
    } catch (error) {
      next(error);
    }
  }
  async deleteCustomer(req, res, next) {
    const { id } = req.params;
    try {
      const response = await this.customerService.deleteCustomer(id);

      if (!response) {
        const err = createError("Cliente no encontrado", 404);
        throw err;
      }

      res.status(200).json({ status: "OK", data: response });
    } catch (error) {
      next(error);
    }
  }
  async updateCustomer(req, res, next) {
    const { id } = req.params;
    const data = req.body;
    try {
      const response = await this.customerService.updateCustomer(data, id);

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

module.exports = CustomerController;
