"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _got = _interopRequireDefault(require("got"));

var _accessEnv = _interopRequireDefault(require("../helpers/accessEnv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const COMPETITOR_SERVICE_URI = (0, _accessEnv.default)("COMPETITOR_SERVICE_URI");

class CodeService {// // *** CREATE
  // static async createPromoCode({args}) {
  //
  //     const body= await got.post(`${COMPETITOR_SERVICE_URI}/promocodes`, {
  //         json: {args: args.input}
  //     }).json();
  //
  //     return body || {};
  // };
  //
  // // *** UPDATE
  // static async updatePromoCode({args}) {
  //
  //     const body= await got.put(`${COMPETITOR_SERVICE_URI}/promocodes/${args.input.promocode_id}`, {
  //         json: {args: args.input}
  //     }).json();
  //
  //     return body || [];
  // };
  //
  // // *** DELETE
  // static async deletePromoCode({args}) {
  //
  //     const body= await got.delete(`${COMPETITOR_SERVICE_URI}/promocodes/${args.input.promocode_id}`).json();
  //
  //     return body || false;
  // };

  // ----------------------------------------------------- PROMOCODE ----------------------------------------------------
  // *** FETCH ALL
  static async fetchAllPromoCodes({
    args
  }) {
    const body = await _got.default.post(`${COMPETITOR_SERVICE_URI}/promocodes/all`, {
      json: {
        args: args
      }
    }).json();
    return body || [];
  }

  // *** COUNT
  static async countPromoCodes() {
    const body = await _got.default.get(`${COMPETITOR_SERVICE_URI}/promocodes/count`).json();
    return body || [];
  }

  // *** FETCH BY ID
  static async fetchPromoCodeById({
    promocode_id
  }) {
    const body = await _got.default.get(`${COMPETITOR_SERVICE_URI}/promocodes/${promocode_id}`).json();
    return body || {};
  }

  // *** FETCH BY CODE
  static async fetchPromoCodeByCode({
    promocode_code
  }) {
    const body = await _got.default.get(`${COMPETITOR_SERVICE_URI}/promocodes/code/${promocode_code}`).json();
    return body || {};
  }

}

exports.default = CodeService;