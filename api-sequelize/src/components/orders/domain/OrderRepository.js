const { Order, OrderDetail } = require("../../../database/models/index");

class OrderRepository {
  constructor() {}

  async createOrder(data) {
    return await Order.create(data);
  }
  async getOneOrder(orderId) {
    return await Order.findAll({
      where: {
        orderId,
      },
      include: [
        {
          association: "orderdetail",
          include: [
            {
              association: "product",
              attributes: ["name", "description"],
            },
          ],
        },
      ],
    });
  }
  async getAllOrders(customerId) {
    return await Order.findAll({
      where: {
        customerId,
      },
      include: [
        {
          association: "orderdetail",
          include: [
            {
              association: "product",
              attributes: ["name", "description"],
            },
          ],
        },
      ],
    });
  }
  async deleteOrder(orderId) {
    return await Order.destroy({
      where: {
        orderId,
      },
    });
  }
  async updateOrder(data, id) {
    return await Order.update(
      { ...data },
      {
        where: {
          orderId: id,
        },
      }
    );
  }
}

module.exports = OrderRepository;
