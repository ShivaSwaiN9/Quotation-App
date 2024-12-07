const { Sequelize, DataTypes, Op } = require("sequelize");
const sequelize = require("../config/db.config");
const { v4: uuidv4 } = require('uuid'); // Import UUID v4 generator

const Customer = sequelize.define('customer', {
  sl: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: DataTypes.STRING, defaultValue: null },
  email: { type: DataTypes.STRING, defaultValue: null},
  number: { type: DataTypes.STRING, defaultValue: null },
  service: { type: DataTypes.STRING, defaultValue: null },
  specificService: { type: DataTypes.STRING, defaultValue: null },
  address: { type: DataTypes.TEXT, defaultValue: null },
  city: { type: DataTypes.STRING, defaultValue: null },
  state: { type: DataTypes.STRING, defaultValue: null },
  status: { type: DataTypes.TINYINT, defaultValue: 1 },
  createdBy: { type: DataTypes.STRING, defaultValue: null },
  updatedBy: { type: DataTypes.STRING, defaultValue: null }
}, { timestamps: true });

module.exports = Customer;