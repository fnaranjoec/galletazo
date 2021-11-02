"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PromocodeService = _interopRequireDefault(require("../../../../adapters/PromocodeService"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _apolloServerExpress = require("apollo-server-express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const verifyCodeResolver = async (obj, args, context) => {
  // // -------------------------------- AUTENTICACION -----------------------------------
  // if (isEmpty(context.req.competitor)) throw new AuthenticationError("000|Must authenticate");
  // PROMOCODE QUEMADO PARA RECARGAS
  if (args.promocode_code == 'REFILL') {
    return {
      success: true,
      code: 0,
      message: 'El codigo es valido !',
      data: {
        competidor: '',
        gano: true,
        premio: {
          id: "REFILL001",
          name: "RECARGA DE TIEMPO AIRE",
          desc: "Recarga celular de tiempo aire",
          image: "http:/latablta.com/image.png"
        }
      }
    };
  }

  const exists = await _PromocodeService.default.fetchPromoCodeByCode({
    promocode_code: args.promocode_code
  });
  const statusOperation = !(0, _isEmpty.default)(exists);
  return {
    success: statusOperation ? true : false,
    code: statusOperation ? 0 : 99,
    message: statusOperation ? 'El Código es valido!' : 'El código no es valido o ya fue usado !',
    data: exists
  };
};

var _default = verifyCodeResolver;
exports.default = _default;