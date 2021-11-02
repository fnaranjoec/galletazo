"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CompetitorService = _interopRequireDefault(require("../../../../adapters/CompetitorService"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _apolloServerExpress = require("apollo-server-express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const competitorTriedViewResolver = async (obj, args, context) => {
  // // -------------------------------- AUTENTICACION -----------------------------------
  // if (isEmpty(context.req.competitor)) throw new AuthenticationError("000|Must authenticate");
  // // Check TIMEOUT
  // obj.incrementResolverCount =  function () {
  //     var runTime = Date.now() - startTime;
  //     //  config.graphql.queryTimeout
  //     if (runTime > 90) {
  //         if (obj.logTimeoutError) {
  //             logger('ERROR', 'Request ' + obj.uuid + ' query execution timeout');
  //         }
  //         obj.logTimeoutError = false;
  //         throw 'Query execution has timeout. Field resolution aborted';
  //     }
  //     this.resolverCount++;
  // };
  return await Promise.all([_CompetitorService.default.competitorTriedViewCount(), await _CompetitorService.default.competitorTriedView({
    args
  })]).then(([totalCount, filteredData]) => {
    return {
      total: totalCount.count,
      filtered: filteredData.count,
      rows: filteredData.rows
    };
  });
};

var _default = competitorTriedViewResolver;
exports.default = _default;