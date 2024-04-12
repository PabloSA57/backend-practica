"use strict";
const { Model, DataTypes } = require("sequelize");

const CUSTOMER_TABLE = "customers";
const SchemaCustomer = {
  customerId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "El email tiene que ser un correo valido",
      },
    },
  },
  phone: {
    type: DataTypes.STRING,
    validate: {
      min: {
        args: 5,
        msg: "Minimo 5 caracteres",
      },
    },
  },
  direction: {
    type: DataTypes.STRING,
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
  CUSTOMER_TABLE,
  SchemaCustomer,
  func(sequelize) {
    class Customer extends Model {
      static associate(models) {
        this.hasMany(models.Order, {
          foreignKey: "customerId",
          as: "order",
        });
      }
    }
    Customer.init(SchemaCustomer, {
      sequelize,
      modelName: "Customer",
      tableName: CUSTOMER_TABLE,
      timestamps: false,
    });
    return Customer;
  },
};
