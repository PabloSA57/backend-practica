"use strict";
const { Model, DataTypes } = require("sequelize");
const { ORDER_TABLE } = require("./order.js");
const { PRODUCT_TABLE } = require("./product.js");

const ORDERDETAIL_TABLE = "orderdetails";
const SchemaOrderDetail = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ORDER_TABLE,
      key: "orderId",
    },
    onDelete: "CASCADE",
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: PRODUCT_TABLE,
      key: "productId",
    },
    onUpdate: "SET NULL",
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
  ORDERDETAIL_TABLE,
  SchemaOrderDetail,
  func(sequelize) {
    class OrderDetail extends Model {
      static associate(models) {
        this.belongsTo(models.Order, {
          as: "order",
          foreignKey: { name: "orderId" },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        });
        this.belongsTo(models.Product, {
          as: "product",
          foreignKey: { name: "productId" },
        });
      }
    }
    OrderDetail.init(SchemaOrderDetail, {
      sequelize,
      modelName: "OrderDetail",
      tableName: ORDERDETAIL_TABLE,
      timestamps: false,
    });
    return OrderDetail;
  },
};
