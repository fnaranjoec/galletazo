"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PromocodeModel = void 0;

var _sequelize = require("sequelize");

var _connection = _interopRequireDefault(require("../connection"));

var _competitor_tried = require("../models/competitor_tried");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ********************************************* PROMOCODE **************************************
class PromocodeModel extends _sequelize.Model {}

exports.PromocodeModel = PromocodeModel;
PromocodeModel.init({
  promocode_id: {
    allowNull: false,
    primaryKey: true,
    type: _sequelize.DataTypes.STRING(36)
  },
  promocode_code: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING(100)
  },
  promocode_created: {
    allowNull: false,
    type: _sequelize.DataTypes.DATE
  },
  promocode_status: {
    allowNull: false,
    type: _sequelize.DataTypes.CHAR(1),
    defaultValue: "A"
  },
  promocode_used_at: {
    allowNull: true,
    type: _sequelize.DataTypes.DATE
  }
}, {
  modelName: "promocode",
  tableName: "promocode",
  timestamps: true,
  createdAt: 'promocode_created',
  updatedAt: false,
  sequelize: _connection.default
}); // ********************************************** VIEWS **********************************
// ****************************************** RELATIONS ***********************************