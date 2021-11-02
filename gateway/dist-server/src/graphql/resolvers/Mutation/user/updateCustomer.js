"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserService = _interopRequireDefault(require("../../../../adapters/UserService"));

var _accessEnv = _interopRequireDefault(require("../../../../helpers/accessEnv"));

var _storeUpload = _interopRequireDefault(require("../../../../helpers/storeUpload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//{customer_id, customer_name, customer_address, customer_phone, customer_email, customer_picture, customer_status, file=null}
const updateCustomerResolver = async (obj, args, context) => {
  // Si no envio archivo solo actualizo los datos y no subo nada al BUCKET S3
  // file===null
  if (!args.customer_id) {
    return new Error("Customer ID is missing!");
  }

  if (!args.file) {
    // return await UserService.updateCustomer({customer_id, customer_name, customer_address, customer_phone, customer_email, customer_picture, customer_status});
    return await _UserService.default.updateCustomer({
      args
    });
  }

  if (!args.customer_picture) {
    return new Error("File is present but Picture argument is missing!");
  } // Solo si subo el archivo grabo la marca


  const PREFIX_FILES = (0, _accessEnv.default)("PREFIX_CUSTOMERS", 'CUSTOMERS');
  /* Aqui primero graba el archivo luego la entidad */

  var uploaded = null;
  await (0, _storeUpload.default)({
    file: args.file
  }, PREFIX_FILES).then(res => {
    uploaded = res.path;
  }).catch(err => {
    return new Error("Has errors when uploading file!");
  });

  if (uploaded === null || uploaded === undefined) {
    return new Error(`Has errors when uploading file. Target directory could not exists.`);
  }

  if (uploaded.length > 0) {
    // customer_picture = uploaded;
    // return await UserService.updateCustomer({customer_id, customer_name, customer_address, customer_phone, customer_email, customer_picture, customer_status});
    args.customer_picture = uploaded;
    return await _UserService.default.updateCustomer({
      args
    });
  }
};

var _default = updateCustomerResolver;
exports.default = _default;