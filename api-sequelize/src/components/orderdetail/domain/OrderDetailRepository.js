const { OrderDetail } = require("../../../database/models/index");

class OrderDetailRepository {
  constructor() {}

  async createOrderDetail(data) {
    return await OrderDetail.bulkCreate(data);
  }
}

module.exports = OrderDetailRepository;
