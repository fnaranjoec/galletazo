import CompetitorService from "#root/adapters/CompetitorService";
import isEmpty from "lodash/isEmpty";
import { AuthenticationError } from "apollo-server-express";

const competitorResolver = async(obj, args, context) => {

    // // -------------------------------- AUTENTICACION -----------------------------------
    // if (isEmpty(context.req.competitor)) throw new AuthenticationError("000|Must authenticate");
    
    return await  Promise.all([
        CompetitorService.countCompetitors(),
        await CompetitorService.fetchAllCompetitors({args})
    ]).then(([totalCount, filteredData]) => {
        return {
            total: totalCount.count,
            filtered: filteredData.count,
            rows: filteredData.rows
        }
    })

};

export default competitorResolver;

