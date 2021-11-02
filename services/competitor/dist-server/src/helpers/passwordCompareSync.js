"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passwordCompareSync = (passwordToTest, passwordHash) => _bcryptjs.default.compareSync(passwordToTest, passwordHash);

var _default = passwordCompareSync;
exports.default = _default;