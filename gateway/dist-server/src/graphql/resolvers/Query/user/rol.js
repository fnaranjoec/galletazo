"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserService = _interopRequireDefault(require("../../../../adapters/UserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const { GraphQLDateTime } = require('graphql-iso-date');
const rolesResolver = async () => {
  return await _UserService.default.fetchAllRoles();
};

var _default = rolesResolver;
exports.default = _default;