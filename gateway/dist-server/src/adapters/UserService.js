"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _got = _interopRequireDefault(require("got"));

var _accessEnv = _interopRequireDefault(require("../helpers/accessEnv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const USER_SERVICE_URI = (0, _accessEnv.default)("USER_SERVICE_URI");

class UserService {
  // ----------------------------------------------------- USER ----------------------------------------------------
  // *** FETCH ALL USER
  static async fetchAllUsers({
    args
  }) {
    const body = await _got.default.post(`${USER_SERVICE_URI}/users/all`, {
      json: {
        args: args
      }
    }).json();
    return body || [];
  }

  static async fetchAllUsersRank({
    args
  }) {
    const body = await _got.default.post(`${USER_SERVICE_URI}/users/rank/all`, {
      json: {
        args: args
      }
    }).json();
    return body || [];
    s;
  }

  // *** COUNT USER
  static async countUsers() {
    const body = await _got.default.get(`${USER_SERVICE_URI}/users/count`).json();
    return body || [];
  }

  static async fetchUserById({
    user_id
  }) {
    const body = await _got.default.get(`${USER_SERVICE_URI}/users/${user_id}`).json();
    return body || {};
  }

  static async fetchUserRankByEmail({
    user_email
  }) {
    const body = await _got.default.get(`${USER_SERVICE_URI}/users/rank/${user_email}`).json();
    return body || {};
  }

  static async createUser({
    args
  }) {
    const body = await _got.default.post(`${USER_SERVICE_URI}/users`, {
      json: {
        args
      }
    }).json();
    return body || {};
  }

  static async createUserIntercom({
    args
  }) {
    const body = await _got.default.post(`${USER_SERVICE_URI}/users/intercom`, {
      json: {
        args
      }
    }).json();
    return body || {};
  }

  static async updateUser({
    args
  }) {
    const body = await _got.default.put(`${USER_SERVICE_URI}/users/${args.user_id}`, {
      json: {
        args
      }
    }).json();
    return body || [];
  }

  static async deleteUser({
    args
  }) {
    const body = await _got.default.delete(`${USER_SERVICE_URI}/users/${args.user_id}`).json();
    return body || false;
  }

}

exports.default = UserService;