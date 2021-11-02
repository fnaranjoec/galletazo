"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParameterModel = void 0;

var _sequelize = require("sequelize");

var _connection = _interopRequireDefault(require("../connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ********************************************* PARAMETER **************************************
class ParameterModel extends _sequelize.Model {}

exports.ParameterModel = ParameterModel;
ParameterModel.init({
  parameter_id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: _sequelize.DataTypes.INTEGER
  },
  parameter_name: {
    allowNull: false,
    unique: true,
    type: _sequelize.DataTypes.STRING(100)
  },
  parameter_desc: {
    allowNull: false,
    type: _sequelize.DataTypes.TEXT
  },
  parameter_text: {
    allowNull: false,
    type: _sequelize.DataTypes.TEXT
  },
  parameter_value: {
    type: _sequelize.DataTypes.FLOAT,
    defaultValue: 0
  },
  parameter_created: {
    allowNull: false,
    type: _sequelize.DataTypes.DATE
  }
}, {
  modelName: "parameter",
  tableName: "parameter",
  timestamps: true,
  createdAt: 'parameter_created',
  updatedAt: false,
  sequelize: _connection.default
}); // ********************************************** VIEWS **********************************
// ****************************************** RELATIONS ***********************************