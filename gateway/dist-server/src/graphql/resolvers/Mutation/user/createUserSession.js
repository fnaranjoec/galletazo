"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserService = _interopRequireDefault(require("../../../../adapters/UserService"));

var _setTokens = _interopRequireDefault(require("../../../../helpers/setTokens"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createUserSessionResolver = async (obj, args, context) => {
  // Creo una session
  const userSession = await _UserService.default.createUserSession({
    args
  });
  context.res.cookie("userSessionId", userSession.session_id, {
    httpOnly: true
  }); // Actualizo la session con el token inicial

  const userTokens = await (0, _setTokens.default)({
    userSession
  });
  const sessionUpdated = await _UserService.default.updateUserSession({
    session_id: userSession.session_id,
    session_access_token: userTokens.accessToken,
    session_refresh_token: userTokens.refreshToken
  });
  return userTokens; // return setTokens({userSession});
};

var _default = createUserSessionResolver;
exports.default = _default;