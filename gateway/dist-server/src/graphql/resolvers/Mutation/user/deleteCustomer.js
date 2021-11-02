"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserService = _interopRequireDefault(require("../../../../adapters/UserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const deleteCustomerResolver = async (obj, {
  customer_id
}) => {
  return await _UserService.default.deleteCustomer({
    customer_id
  });
};

var _default = deleteCustomerResolver;
exports.default = _default;