"use strict";
const { CUSTOMER_TABLE, SchemaCustomer } = require("../models/customer");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(CUSTOMER_TABLE, SchemaCustomer);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CUSTOMER_TABLE);
  },
};
