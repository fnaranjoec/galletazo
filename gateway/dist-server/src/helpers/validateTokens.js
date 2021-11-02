"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRefreshToken = exports.validateAccessToken = void 0;

var _accessEnv = _interopRequireDefault(require("./accessEnv"));

var _jsonwebtoken = require("jsonwebtoken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateAccessToken = token => {
  // SECRET KEYS
  const SECRET_ACCESS_KEY = (0, _accessEnv.default)("SECRET_ACCESS_KEY", null);
  if (SECRET_ACCESS_KEY === null) return null; // console.log(`Toke=${token}, KEY=${SECRET_ACCESS_KEY}`);
  // console.log('verify==>', verify(token, SECRET_ACCESS_KEY));

  try {
    return (0, _jsonwebtoken.verify)(token, SECRET_ACCESS_KEY);
  } catch (e) {
    // console.log("error: validateAccessToken ==>", e)
    return null;
  }
};

exports.validateAccessToken = validateAccessToken;

const validateRefreshToken = token => {
  // SECRET KEYS
  const SECRET_REFRESH_KEY = (0, _accessEnv.default)("SECRET_REFRESH_KEY", null);
  if (SECRET_REFRESH_KEY === null) return null;

  try {
    return (0, _jsonwebtoken.verify)(token, SECRET_REFRESH_KEY);
  } catch (e) {
    // console.log("error: validateRefreshToken ==>", e)
    return null;
  }
};

exports.validateRefreshToken = validateRefreshToken;