class OrderService {
  constructor(orderRepository, orderdetailService) {
    this.orderRepository = orderRepository;
    this.orderDetailService = orderdetailService;
  }

  async createOrder(customerId, products) {
    const order = await this.orderRepository.createOrder({ customerId });
    await this.orderDetailService.addProducts(order.orderId, products);
  }
  async getOneOrder(id) {
    return await this.orderRepository.getOneOrder(id);
  }
  async getAllOrders(customerId) {
    return await this.orderRepository.getAllOrders(customerId);
  }
  async deleteOrder(id) {
    return await this.orderRepository.deleteOrder(id);
  }
  async updateOrder(data, id) {
    return await this.orderRepository.updateOrder(data, id);
  }
}

module.exports = OrderService;
