"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserService = _interopRequireDefault(require("../../../../adapters/UserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const customersResolver = async (obj, args, context) => {
  // // console.log(args);
  // return await  UserService.fetchAllCustomers({args});
  return await Promise.all([_UserService.default.countCustomers(), _UserService.default.fetchAllCustomers({
    args
  })]).then(([totalCount, filteredData]) => {
    return {
      total: totalCount.count,
      filtered: filteredData.count,
      rows: filteredData.rows
    };
  });
};

var _default = customersResolver;
exports.default = _default;