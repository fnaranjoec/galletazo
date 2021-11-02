"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserService = _interopRequireDefault(require("../../../../adapters/UserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// {user_id, user_name, user_email, user_phone, user_password, user_status}
const updateUserResolver = async (obj, args, context) => {
  if (!args.user_id) {
    return new Error("Operator ID is missing!");
  } // return await UserService.updateUser({user_id, user_name, user_email, user_phone, user_password, user_status});


  return await _UserService.default.updateUser({
    args
  });
};

var _default = updateUserResolver;
exports.default = _default;