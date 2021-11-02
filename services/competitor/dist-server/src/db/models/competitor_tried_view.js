"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompetitorTriedViewModel = void 0;

var _sequelize = require("sequelize");

var _connection = _interopRequireDefault(require("../connection"));

var _competitor = require("../models/competitor");

var _prize = require("../models/prize");

var _promocode = require("../models/promocode");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ********************************************* COMPETITOR-TRIED **************************************
class CompetitorTriedViewModel extends _sequelize.Model {}

exports.CompetitorTriedViewModel = CompetitorTriedViewModel;
CompetitorTriedViewModel.init({
  competitor_tried_id: {
    allowNull: false,
    primaryKey: true,
    type: _sequelize.DataTypes.BIGINT
  },
  competitor_tried_at: {
    allowNull: false,
    type: _sequelize.DataTypes.DATE
  },
  promocode_code: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING(100)
  },
  competitor_firstname: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING(255)
  },
  competitor_lastname: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING(255)
  },
  competitor_email: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING(255)
  },
  competitor_phone: {
    allowNull: true,
    type: _sequelize.DataTypes.STRING(20)
  },
  prize_name: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING(255)
  }
}, {
  modelName: "vw_trieds",
  tableName: "vw_trieds",
  timestamps: false,
  createdAt: false,
  updatedAt: false,
  sequelize: _connection.default
}); // ********************************************** VIEWS **********************************
// ****************************************** RELATIONS ***********************************
// CompetitorModel.hasMany(CompetitorTriedModel, {as:'competitor_tried', foreignKey:'competitor_id'});
// PrizeModel.hasMany(CompetitorTriedModel, {as:'competitor_tried', foreignKey:'prize_id'});
// PromocodeModel.hasMany(CompetitorTriedModel, {as:'competitor_tried', foreignKey:'promocode_id'});