class OrderDetailService {
  constructor(orderdetailRepository, productService) {
    this.orderdetailRepository = orderdetailRepository;
    this.productService = productService;
  }

  async addProducts(orderId, products) {
    const data = products.map((p) => {
      return {
        ...p,
        orderId,
      };
    });
    console.log(data, "data-addProduct");
    await this.orderdetailRepository.createOrderDetail(data);
    await this.productService.decrementQuantityAndPrice(products);
  }
}

module.exports = OrderDetailService;
