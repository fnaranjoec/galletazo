"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompetitorRefillModel = void 0;

var _sequelize = require("sequelize");

var _connection = _interopRequireDefault(require("../connection"));

var _competitor_tried = require("../models/competitor_tried");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ********************************************* COMPETITOR **************************************
// export class CompetitorRefillModel extends Model {}
// CompetitorRefillModel.init(
//     {
//         competitor_refill_id: {
//             allowNull: false,
//             primaryKey: true,
//             type: DataTypes.STRING(36)
//         },
//         competitor_id: {
//             allowNull: false,
//             type: DataTypes.STRING(36)
//         },
//         competitor_refill_phone: {
//             allowNull: false,
//             type: DataTypes.STRING(20),
//         },
//         competitor_refill_company: {
//             allowNull: false,
//             type: DataTypes.STRING(100),
//         },
//         competitor_refill_value: {
//             allowNull: true,
//             type: DataTypes.INTEGER,
//         },
//         competitor_refill_status: {
//             allowNull: false,
//             type: DataTypes.CHAR(1),
//             defaultValue: "A"
//         },
//         competitor_refill_created: {
//             allowNull: false,
//             type: DataTypes.DATE,
//         },
//     },
//     {
//         modelName: "competitor_refill",
//         tableName: "competitor_refill",
//         timestamps: true,
//         createdAt: 'competitor_refill_created',
//         updatedAt: false,
//         sequelize
//     }
// );
class CompetitorRefillModel extends _sequelize.Model {}

exports.CompetitorRefillModel = CompetitorRefillModel;
CompetitorRefillModel.init({
  competitor_refill_id: {
    allowNull: false,
    primaryKey: true,
    type: _sequelize.DataTypes.STRING(36)
  },
  competitor_id: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING(36)
  },
  competitor_refill_phone: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING(20)
  },
  competitor_refill_company: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING(100)
  },
  competitor_refill_value: {
    allowNull: true,
    type: _sequelize.DataTypes.INTEGER
  },
  competitor_refill_status: {
    allowNull: false,
    type: _sequelize.DataTypes.CHAR(1),
    defaultValue: "A"
  },
  competitor_refill_created: {
    allowNull: false,
    type: _sequelize.DataTypes.DATE
  },
  competitor_firstname: {
    allowNull: true,
    type: _sequelize.DataTypes.STRING(255)
  },
  competitor_lastname: {
    allowNull: true,
    type: _sequelize.DataTypes.STRING(255)
  },
  competitor_email: {
    allowNull: true,
    type: _sequelize.DataTypes.STRING(36)
  },
  competitor_city: {
    allowNull: true,
    type: _sequelize.DataTypes.STRING(100)
  },
  competitor_identification: {
    allowNull: true,
    type: _sequelize.DataTypes.CHAR(20)
  }
}, {
  modelName: "vw_competitor_refill",
  tableName: "vw_competitor_refill",
  timestamps: true,
  createdAt: 'competitor_refill_created',
  updatedAt: false,
  sequelize: _connection.default
}); // ********************************************** VIEWS **********************************
// ****************************************** RELATIONS ***********************************