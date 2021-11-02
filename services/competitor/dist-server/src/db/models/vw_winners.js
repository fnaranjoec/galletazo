"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VwWinnersModel = void 0;

var _sequelize = require("sequelize");

var _connection = _interopRequireDefault(require("../connection"));

var _competitor_tried = require("../models/competitor_tried");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ********************************************* VW-WINNERS **************************************
class VwWinnersModel extends _sequelize.Model {}

exports.VwWinnersModel = VwWinnersModel;
VwWinnersModel.init({
  competitor_id: {
    allowNull: false,
    primaryKey: true,
    type: _sequelize.DataTypes.STRING(36)
  }
}, {
  modelName: "vw_winners",
  tableName: "vw_winners",
  timestamps: false,
  createdAt: false,
  updatedAt: false,
  sequelize: _connection.default
}); // ****************************************** RELATIONS ***********************************