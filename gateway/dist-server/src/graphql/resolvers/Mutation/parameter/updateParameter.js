"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SystemService = _interopRequireDefault(require("../../../../adapters/SystemService"));

var _accessEnv = _interopRequireDefault(require("../../../../helpers/accessEnv"));

var _storeUpload = _interopRequireDefault(require("../../../../helpers/storeUpload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//{product_id, brand_id, product_name, product_slug, product_desc, product_picture, product_status, file=null}
const updateParameterResolver = async (obj, args, context) => {
  // Si no envio archivo solo actualizo los datos y no subo nada al BUCKET S3
  //file===null
  if (!args.parameter_id) {
    return new Error("Parameter NAME is missing!");
  }

  return await _SystemService.default.updateParameter({
    args
  });
};

var _default = updateParameterResolver;
exports.default = _default;