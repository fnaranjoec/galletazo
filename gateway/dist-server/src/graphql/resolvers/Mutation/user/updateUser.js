"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserService = _interopRequireDefault(require("../../../../adapters/UserService"));

var _storeCloud = _interopRequireDefault(require("../../../../helpers/storeCloud"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const updateUserResolver = async (obj, args, context) => {
  if (!args.user_id) {
    return new Error("User ID is missing!");
  } // SI NO HAY ARCHIVO SOLO CREO EL OBJETO
  // if (!args.file || args.file===null || args.file==="undefined") {


  return await _UserService.default.updateUser({
    args
  }); // }
  // /* Aqui primero graba el archivo luego la entidad */
  // var uploaded=null;
  //
  // await storeCloud({file: await args.file}, true)
  //     .then((res) => {
  //         uploaded=res;
  //     })
  //     .catch(err => {
  //         return new Error("Has errors when uploading file!");
  //     });
  //
  // if (uploaded===null || uploaded==="undefined") {
  //     return new Error(`Has errors when uploading file. Target directory could not exists.`);
  // }
  //
  // if (!isEmpty(uploaded)) {
  //     args.user_picture = uploaded.DESTINO_EN_GCLOUD;
  //     delete args.file;
  //     return await UserService.updateUser({args});
  // }
};

var _default = updateUserResolver;
exports.default = _default;