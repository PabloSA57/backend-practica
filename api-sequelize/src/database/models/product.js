"use strict";
const { Model, DataTypes } = require("sequelize");

const PRODUCT_TABLE = "products";
const SchemaProduct = {
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: {
        args: 1,
        msg: "Minimo 1",
      },
    },
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

module.exports = {
  PRODUCT_TABLE,
  SchemaProduct,
  func(sequelize) {
    class Product extends Model {
      static associate(models) {
        this.hasMany(models.OrderDetail, {
          as: "orderdetail",
          foreignKey: "productId",
          onDelete: "SET NULL",
        });
      }
    }
    Product.init(SchemaProduct, {
      sequelize,
      modelName: "Product",
      tableName: PRODUCT_TABLE,
      timestamps: false,
    });
    return Product;
  },
};
