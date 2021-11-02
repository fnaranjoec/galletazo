"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageModel = void 0;

var _sequelize = require("sequelize");

var _connection = _interopRequireDefault(require("../connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ********************************************* MESSAGE **************************************
class MessageModel extends _sequelize.Model {}

exports.MessageModel = MessageModel;
MessageModel.init({
  message_id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: _sequelize.DataTypes.INTEGER
  },
  message_code: {
    allowNull: false,
    type: _sequelize.DataTypes.CHAR(20)
  },
  message_title: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING(255)
  },
  message_text: {
    allowNull: false,
    type: _sequelize.DataTypes.TEXT
  },
  message_severity: {
    allowNull: false,
    type: _sequelize.DataTypes.INTEGER
  },
  message_created: {
    allowNull: false,
    type: _sequelize.DataTypes.DATE
  }
}, {
  modelName: "message",
  tableName: "message",
  createdAt: 'message_created',
  updatedAt: false,
  sequelize: _connection.default
}); // ********************************************** VIEWS **********************************
// ****************************************** RELATIONS ***********************************