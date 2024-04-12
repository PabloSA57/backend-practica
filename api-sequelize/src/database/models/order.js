"use strict";
const { Model, DataTypes } = require("sequelize");
const { CUSTOMER_TABLE } = require("./customer");
const ORDER_TABLE = "orders";
const SchemaOrder = {
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  state: {
    type: DataTypes.ENUM("pendding", "success", "cancelled"),
    defaultValue: "pendding",
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CUSTOMER_TABLE,
      key: "customerId",
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

module.exports = {
  ORDER_TABLE,
  SchemaOrder,
  func(sequelize) {
    class Order extends Model {
      static associate(models) {
        this.belongsTo(models.Customer, {
          as: "customer",
          foreignKey: { name: "customerId" },
        });
        this.hasMany(models.OrderDetail, {
          as: "orderdetail",
          foreignKey: { name: "orderId" },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        });
      }
    }
    Order.init(SchemaOrder, {
      sequelize,
      modelName: "Order",
      tableName: ORDER_TABLE,
      timestamps: false,
    });
    return Order;
  },
};
