"use strict";
const {
  ORDERDETAIL_TABLE,
  SchemaOrderDetail,
} = require("../models/orderdetail");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(ORDERDETAIL_TABLE, SchemaOrderDetail);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDERDETAIL_TABLE);
  },
};
