"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompetitorTriedModel = void 0;

var _sequelize = require("sequelize");

var _connection = _interopRequireDefault(require("../connection"));

var _competitor = require("../models/competitor");

var _prize = require("../models/prize");

var _promocode = require("../models/promocode");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ********************************************* COMPETITOR-TRIED **************************************
class CompetitorTriedModel extends _sequelize.Model {}

exports.CompetitorTriedModel = CompetitorTriedModel;
CompetitorTriedModel.init({
  competitor_tried_id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: _sequelize.DataTypes.BIGINT
  },
  promocode_id: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING(36),
    onUpdate: "CASCADE",
    references: {
      key: "promocode_id",
      model: "promocode",
      as: "promocode_id"
    }
  },
  competitor_id: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING(36),
    onUpdate: "CASCADE",
    references: {
      key: "competitor_id",
      model: "competitor",
      as: "competitor_id"
    }
  },
  prize_id: {
    allowNull: true,
    type: _sequelize.DataTypes.STRING(36),
    onUpdate: "CASCADE",
    references: {
      key: "prize_id",
      model: "prize",
      as: "prize_id"
    }
  },
  competitor_tried_at: {
    allowNull: true,
    type: _sequelize.DataTypes.DATE
  },
  competitor_tried_status: {
    allowNull: true,
    type: _sequelize.DataTypes.CHAR(1),
    defaultValue: "A"
  }
}, {
  modelName: "competitor_tried",
  tableName: "competitor_tried",
  timestamps: true,
  createdAt: 'competitor_tried_at',
  updatedAt: false,
  sequelize: _connection.default
}); // ********************************************** VIEWS **********************************
// ****************************************** RELATIONS ***********************************
// CompetitorModel.hasMany(CompetitorTriedModel, {as:'competitor_tried', foreignKey:'competitor_id'});
// PrizeModel.hasMany(CompetitorTriedModel, {as:'competitor_tried', foreignKey:'prize_id'});
// PromocodeModel.hasMany(CompetitorTriedModel, {as:'competitor_tried', foreignKey:'promocode_id'});