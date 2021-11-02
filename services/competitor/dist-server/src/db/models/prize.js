"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrizeModel = void 0;

var _sequelize = require("sequelize");

var _connection = _interopRequireDefault(require("../connection"));

var _competitor_tried = require("./competitor_tried");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ********************************************* PRIZE **************************************
class PrizeModel extends _sequelize.Model {}

exports.PrizeModel = PrizeModel;
PrizeModel.init({
  prize_id: {
    allowNull: false,
    primaryKey: true,
    type: _sequelize.DataTypes.STRING(36)
  },
  prize_name: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING(255)
  },
  prize_desc: {
    allowNull: true,
    type: _sequelize.DataTypes.TEXT
  },
  prize_image: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING(500)
  },
  prize_qty: {
    allowNull: false,
    type: _sequelize.DataTypes.INTEGER
  },
  prize_period_type: {
    allowNull: false,
    type: _sequelize.DataTypes.CHAR(1),
    defaultValue: "D"
  },
  prize_period_value: {
    allowNull: false,
    type: _sequelize.DataTypes.INTEGER
  },
  prize_last_delivery: {
    allowNull: true,
    type: _sequelize.DataTypes.DATE
  },
  prize_created: {
    allowNull: false,
    type: _sequelize.DataTypes.DATE
  },
  prize_status: {
    allowNull: false,
    type: _sequelize.DataTypes.CHAR(1),
    defaultValue: "A"
  },
  prize_period_qty: {
    allowNull: false,
    type: _sequelize.DataTypes.INTEGER
  },
  prize_last_reset: {
    allowNull: true,
    type: _sequelize.DataTypes.DATE
  } // prize_period_qty_remain: {
  //     type: Sequelize.VIRTUAL,
  //     get () {
  //         return this.getDataValue('prize_period_qty') - this.getDataValue('prize_qty');
  //     }
  // },

}, {
  modelName: "prize",
  tableName: "prize",
  timestamps: true,
  createdAt: 'prize_created',
  updatedAt: false,
  sequelize: _connection.default
}); // ********************************************** VIEWS **********************************
// ****************************************** RELATIONS ***********************************
// CompetitorTriedModel.belongsTo(PrizeModel,{
//     foreignKey: "prize_id",
// });