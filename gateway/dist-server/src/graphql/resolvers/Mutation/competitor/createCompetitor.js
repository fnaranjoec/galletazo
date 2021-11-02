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
const createCompetitorResolver = async (obj, args, context) => {
  var created;
  const exists = await _CompetitorService.default.fetchCompetitorByExternalId({
    competitor_external_id: args.input.competitor_external_id
  });

  if ((0, _isEmpty.default)(exists)) {
    created = await _CompetitorService.default.createCompetitor({
      args
    });
  } else {
    created = await _CompetitorService.default.updateCompetitor({
      args
    });
  }

  const statusOperation = !(0, _isEmpty.default)(created);
  return {
    success: statusOperation ? true : false,
    code: statusOperation ? 0 : 99,
    message: statusOperation ? 'El Competidor se creo correctamente!' : 'Hubo problemas al crear el Competidor !',
    data: created
  };
};

var _default = createCompetitorResolver;
exports.default = _default;