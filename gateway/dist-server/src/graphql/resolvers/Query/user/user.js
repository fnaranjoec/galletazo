"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserService = _interopRequireDefault(require("../../../../adapters/UserService"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _apolloServerExpress = require("apollo-server-express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersResolver = async (obj, args, context) => {
  // // -------------------------------- AUTENTICACION -----------------------------------
  // if (isEmpty(context.req.competitor)) throw new AuthenticationError("000|Must authenticate");
  // return await UserService.fetchAllUsers({args});
  return await Promise.all([_UserService.default.countUsers(), await _UserService.default.fetchAllUsers({
    args
  })]).then(([totalCount, filteredData]) => {
    return {
      total: totalCount.count,
      filtered: filteredData.count,
      rows: filteredData.rows
    };
  });
};

var _default = usersResolver;
exports.default = _default;