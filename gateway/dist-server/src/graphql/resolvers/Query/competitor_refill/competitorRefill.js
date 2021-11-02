"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CompetitorService = _interopRequireDefault(require("../../../../adapters/CompetitorService"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _apolloServerExpress = require("apollo-server-express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const competitorRefillResolver = async (obj, args, context) => {
  // // -------------------------------- AUTENTICACION -----------------------------------
  // if (isEmpty(context.req.competitor)) throw new AuthenticationError("000|Must authenticate");
  return await Promise.all([_CompetitorService.default.countCompetitorsRefill(), await _CompetitorService.default.fetchAllCompetitorsRefill({
    args
  })]).then(([totalCount, filteredData]) => {
    return {
      total: totalCount.count,
      filtered: filteredData.count,
      rows: filteredData.rows
    };
  });
};

var _default = competitorRefillResolver;
exports.default = _default;