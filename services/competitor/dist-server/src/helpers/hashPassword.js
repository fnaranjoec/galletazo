"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const hashPassword = password => {
  return _bcryptjs.default.hashSync(password, _bcryptjs.default.genSaltSync());
};

var _default = hashPassword;
exports.default = _default;