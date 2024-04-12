class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async createProduct(data) {
    if (Array.isArray(data)) {
      return this.productRepository.bulkCreateProducts(data);
    }
    return await this.productRepository.createProduct(data);
  }
  async getOneProduct(id) {
    return await this.productRepository.getOneProduct(id);
  }
  async getAllProducts(limit = null, offset = null) {
    return await this.productRepository.getAllProducts(limit, offset);
  }
  async deleteProduct(id) {
    return await this.productRepository.deleteProduct(id);
  }
  async updateProduct(data, id) {
    return await this.productRepository.updateProduct(data, id);
  }
  async decrementQuantityAndPrice(products) {
    products.forEach(async (p) => {
      const product = await this.getOneProduct(p.productId);
      await product.decrement({
        quantity: p.quantity,
      });
    });
  }
}

module.exports = ProductService;
