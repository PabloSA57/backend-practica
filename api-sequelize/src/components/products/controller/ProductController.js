"use strict";
const createError = require("../../../utils/createError");

class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  async createProduct(req, res, next) {
    const data = req.body;
    try {
      const response = await this.productService.createProduct(data);
      res.status(201).json({ status: "OK", data: response });
    } catch (error) {
      next(error);
    }
  }

  async getOneProduct(req, res, next) {
    const { id } = req.params;
    try {
      const response = await this.productService.getOneProduct(id);
      if (!response) {
        const err = createError("Producto no encontrado", 404);
        throw err;
      }
      res.status(200).json({ status: "OK", data: response });
    } catch (error) {
      next(error);
    }
  }
  async getAllProducts(req, res, next) {
    const { limit, offset } = req.query;
    try {
      const response = await this.productService.getAllProducts(limit, offset);

      res
        .status(200)
        .json({ status: "OK", count: response.length, data: response });
    } catch (error) {
      next(error);
    }
  }
  async deleteProduct(req, res, next) {
    const { id } = req.params;
    try {
      const response = await this.productService.deleteProduct(id);

      if (!response) {
        const err = createError("Producto no encontrado", 404);
        throw err;
      }

      res.status(200).json({ status: "OK", data: response });
    } catch (error) {
      next(error);
    }
  }
  async updateProduct(req, res, next) {
    const { id } = req.params;
    const data = req.body;
    try {
      const response = await this.productService.updateProduct(data, id);

      if (!response[0]) {
        const err = createError("Producto no encontrado", 404);
        throw err;
      }

      res.status(200).json({ status: "OK", data: response });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
