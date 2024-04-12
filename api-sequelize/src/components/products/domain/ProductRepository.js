const { Product } = require("../../../database/models/index");

class ProductRepository {
  constructor() {}

  async createProduct(data) {
    return await Product.create(data);
  }
  async bulkCreateProducts(data) {
    return await Product.bulkCreate(data);
  }
  async getOneProduct(id) {
    return await Product.findByPk(id);
  }
  async getAllProducts(limit = null, offset = null) {
    let condition = {
      order: [["productId", "DESC"]],
    };

    if (limit || offset) {
      condition = {
        ...condition,
        offset,
        limit,
      };
    }
    return await Product.findAll(condition);
  }
  async deleteProduct(id) {
    return await Product.destroy({
      where: {
        productId: id,
      },
    });
  }
  async updateProduct(data, id) {
    return await Product.update(
      { ...data },
      {
        where: {
          productId: id,
        },
      }
    );
  }
}

module.exports = ProductRepository;
