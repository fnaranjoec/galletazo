"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CompetitorService = _interopRequireDefault(require("../../../../adapters/CompetitorService"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import accessEnv from "#root/helpers/accessEnv";
// import storeUpload from "#root/helpers/storeUpload";
const createCompetitorRefillResolver = async (obj, args, context) => {
  var created = await _CompetitorService.default.createCompetitorRefill({
    args
  });
  const statusOperation = !(0, _isEmpty.default)(created);
  return {
    success: statusOperation ? true : false,
    code: statusOperation ? 0 : 99,
    message: statusOperation ? 'El Competidor Recarga se creo correctamente!' : 'Hubo problemas al crear el Competidor Recarga !',
    data: created
  };
};

var _default = createCompetitorRefillResolver;
exports.default = _default;