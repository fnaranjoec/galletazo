"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserService = _interopRequireDefault(require("../../../../adapters/UserService"));

var _apolloServerExpress = require("apollo-server-express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// logged in competitor resolver
const isEmpty = require("lodash/isEmpty");

const loggedInUser = async (_, __, {
  req
}) => {
  // if (isEmpty(req.competitor)) throw new AuthenticationError("Must authenticate");
  const user = await _UserService.default.fetchUserById({
    user_id: req.user.id
  });
  return user;
};

var _default = loggedInUser;
exports.default = _default;