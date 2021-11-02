"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompetitorModel = void 0;

var _sequelize = require("sequelize");

var _connection = _interopRequireDefault(require("../connection"));

var _competitor_tried = require("../models/competitor_tried");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ********************************************* COMPETITOR **************************************
class CompetitorModel extends _sequelize.Model {}

exports.CompetitorModel = CompetitorModel;
CompetitorModel.init({
  competitor_id: {
    allowNull: false,
    primaryKey: true,
    type: _sequelize.DataTypes.STRING(36)
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
    allowNull: true,
    type: _sequelize.DataTypes.STRING(255)
  },
  competitor_phone: {
    allowNull: true,
    type: _sequelize.DataTypes.STRING(20)
  },
  competitor_identification: {
    allowNull: true,
    type: _sequelize.DataTypes.CHAR(20)
  },
  competitor_dob: {
    allowNull: true,
    type: _sequelize.DataTypes.DATE
  },
  competitor_city: {
    allowNull: true,
    type: _sequelize.DataTypes.STRING(100)
  },
  competitor_external_id: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING(36)
  },
  competitor_created: {
    allowNull: false,
    type: _sequelize.DataTypes.DATE
  },
  competitor_status: {
    allowNull: false,
    type: _sequelize.DataTypes.CHAR(1),
    defaultValue: "A"
  }
}, {
  modelName: "competitor",
  tableName: "competitor",
  timestamps: true,
  createdAt: 'competitor_created',
  updatedAt: false,
  sequelize: _connection.default
}); // ********************************************** VIEWS **********************************
// ****************************************** RELATIONS ***********************************

CompetitorModel.hasMany(_competitor_tried.CompetitorTriedModel, {
  foreignKey: "competitor_id"
});

_competitor_tried.CompetitorTriedModel.belongsTo(CompetitorModel, {
  foreignKey: "competitor_id"
});