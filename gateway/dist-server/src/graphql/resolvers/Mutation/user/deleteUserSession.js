"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserService = _interopRequireDefault(require("../../../../adapters/UserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const deleteUserSessionResolver = async (obj, {
  session_id
}, context) => {
  const userSession = await _UserService.default.deleteUserSession({
    session_id
  });
  context.res.clearCookie("userSessionId");
  return true;
};

var _default = deleteUserSessionResolver;
exports.default = _default;