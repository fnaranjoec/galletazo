"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _accessEnv = _interopRequireDefault(require("./accessEnv"));

var _jsonwebtoken = require("jsonwebtoken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const setTokens = async ({
  userSession
}) => {
  // console.log('userSession==>', userSession);
  // SECRET KEYS
  const SECRET_ACCESS_KEY = (0, _accessEnv.default)("SECRET_ACCESS_KEY", "SECRET_ACCESS_KEY#SECRET_ACCESS_KEY");
  const SECRET_REFRESH_KEY = (0, _accessEnv.default)("SECRET_REFRESH_KEY", "SECRET_REFRESH_KEY#SECRET_REFRESH_KEY"); // EXPIRATION KEYS

  const EXP_ACCESS_KEY = (0, _accessEnv.default)("EXP_ACCESS_KEY", 86400);
  const EXP_REFRESH_KEY = (0, _accessEnv.default)("EXP_REFRESH_KEY", 3600);
  if (SECRET_ACCESS_KEY === null || SECRET_REFRESH_KEY === null) return null; // Lea expiracion de los tokens se aumenta en segundos

  const accessExp = Math.floor(Date.now() / 1000) + parseInt(EXP_ACCESS_KEY);
  const refreshExp = Math.floor(Date.now() / 1000) + parseInt(EXP_REFRESH_KEY);
  const accessUser = {
    user_id: userSession.user_id,
    session_id: userSession.session_id
  };
  const accessToken = await (0, _jsonwebtoken.sign)({
    exp: accessExp,
    user: accessUser
  }, SECRET_ACCESS_KEY);
  const refreshUser = {
    user_id: userSession.user_id,
    session_id: userSession.session_id // count: userSession.tokenCount

  };
  const refreshToken = await (0, _jsonwebtoken.sign)({
    exp: refreshExp,
    user: refreshUser
  }, SECRET_REFRESH_KEY);
  return await {
    accessToken,
    refreshToken
  };
};

var _default = setTokens;
exports.default = _default;