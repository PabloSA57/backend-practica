const { Customer } = require("../../../database/models/index");

class CustomerRepository {
  constructor() {}

  async createCustomer(data) {
    return await Customer.create(data);
  }
  async getOneCustomer(id) {
    return await Customer.findByPk(id);
  }
  async getAllCustomers() {
    return await Customer.findAll();
  }
  async deleteCustomer(id) {
    return await Customer.destroy({
      where: {
        customerId: id,
      },
    });
  }
  async updateCustomer(data, id) {
    return await Customer.update(
      { ...data },
      {
        where: {
          customerId: id,
        },
      }
    );
  }
}

module.exports = CustomerRepository;
