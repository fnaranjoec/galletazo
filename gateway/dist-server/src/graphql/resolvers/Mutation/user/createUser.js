"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserService = _interopRequireDefault(require("../../../../adapters/UserService"));

var _accessEnv = _interopRequireDefault(require("../../../../helpers/accessEnv"));

var _storeUpload = _interopRequireDefault(require("../../../../helpers/storeUpload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createUserResolver = async (obj, args, context) => {
  console.log("args-->", args); // SI NO HAY ARCHIVO SOLO CREO EL OBJETO
  // if (!args.file || args.file===null || args.file===undefined) {

  return await _UserService.default.createUser({
    args
  }); // }
  // // PROCESO PARA SUBIR ARCHIVO
  // const PREFIX_FILES = accessEnv("PREFIX_CUSTOMERS", 'CUSTOMERS');
  //
  // /* Aqui primero graba el archivo luego la entidad */
  // var uploaded=null;
  //
  // await storeUpload({file: await args.file}, PREFIX_FILES)
  //     .then((res) => {
  //         uploaded=res.path;
  //     })
  //     .catch(err => {
  //         return new Error("Has errors when uploading file!");
  //     });
  //
  // if (uploaded===null || uploaded===undefined) {
  //     return new Error(`Has errors when uploading file. Target directory could not exists.`);
  // }
  //
  // if (uploaded.length>0) {
  //     args.customer_picture = uploaded;
  //
  //     return await UserService.createCustomer(
  //         {
  //             user_name:args.user_name,
  //             user_email: args.user_email,
  //             user_phone: args.user_phone,
  //             user_password: args.user_password,
  //             customer_name: args.customer_name,
  //             customer_address: args.customer_address,
  //             customer_picture: args.customer_picture
  //         }
  //     );
  // }
};

var _default = createUserResolver;
exports.default = _default;