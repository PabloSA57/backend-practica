"use strict";
const { PRODUCT_TABLE, SchemaProduct } = require("../models/product");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(PRODUCT_TABLE, SchemaProduct);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(PRODUCT_TABLE);
  },
};
