"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserService = _interopRequireDefault(require("../../../../adapters/UserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const deleteUserResolver = async (obj, {
  user_id
}) => {
  return await _UserService.default.deleteUser({
    user_id
  });
};

var _default = deleteUserResolver;
exports.default = _default;