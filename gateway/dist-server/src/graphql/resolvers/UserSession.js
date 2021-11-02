"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserService = _interopRequireDefault(require("../../adapters/UserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserSession = {
  user: async userSession => {
    return await _UserService.default.fetchUserById({
      user_id: userSession.user_id
    });
  }
};
var _default = UserSession;
exports.default = _default;