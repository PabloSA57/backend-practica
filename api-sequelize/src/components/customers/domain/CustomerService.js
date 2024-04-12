class CustomerService {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  async createCustomer(data) {
    return await this.customerRepository.createCustomer(data);
  }
  async getOneCustomer(id) {
    return await this.customerRepository.getOneCustomer(id);
  }
  async getAllCustomers() {
    return await this.customerRepository.getAllCustomers();
  }
  async deleteCustomer(id) {
    return await this.customerRepository.deleteCustomer(id);
  }
  async updateCustomer(data, id) {
    return await this.customerRepository.updateCustomer(data, id);
  }
}

module.exports = CustomerService;
