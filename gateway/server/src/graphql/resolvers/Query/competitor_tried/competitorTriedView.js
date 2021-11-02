import CompetitorService from "#root/adapters/CompetitorService";
import isEmpty from "lodash/isEmpty";
import { AuthenticationError } from "apollo-server-express";

const competitorTriedViewResolver = async(obj, args, context) => {

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

    
    return await  Promise.all([
        CompetitorService.competitorTriedViewCount(),
        await CompetitorService.competitorTriedView({args})
    ]).then(([totalCount, filteredData]) => {
        return {
            total: totalCount.count,
            filtered: filteredData.count,
            rows: filteredData.rows
        }
    })

};

export default competitorTriedViewResolver;

