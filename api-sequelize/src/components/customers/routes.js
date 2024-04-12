const Router = require("express").Router;
const CustomerController = require("./controller/CustomerController.js");
const CustomerRepository = require("./domain/CustomerRepository.js");
const CustomerService = require("./domain/CustomerService.js");

const customerSchema = require("../../schemas/customer.schema.js");
const validationHandler = require("../../middleware/validationHandler.js");

const route = Router();

const customerRepository = new CustomerRepository();
const customerService = new CustomerService(customerRepository);
const customerController = new CustomerController(customerService);

route.post(
  "/",
  validationHandler(customerSchema, "body"),
  customerController.createCustomer.bind(customerController)
);
route.get("/:id", customerController.getOneCustomer.bind(customerController));
route.get("/", customerController.getAllCustomers.bind(customerController));
route.delete(
  "/:id",
  customerController.deleteCustomer.bind(customerController)
);
route.put("/:id", customerController.updateCustomer.bind(customerController));

module.exports = route;
