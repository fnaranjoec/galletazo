import UserService from "#root/adapters/UserService";
import isEmpty from "lodash/isEmpty";
import { AuthenticationError } from "apollo-server-express";

const usersRankByEmailResolver = async(obj, args, context) => {

    // // -------------------------------- AUTENTICACION -----------------------------------
    // if (isEmpty(context.req.competitor)) throw new AuthenticationError("000|Must authenticate");


    return await UserService.fetchUserRankByEmail({user_email: args.user_email});

    // return await  Promise.all([
    //     UserService.countUsers(),
    //     await UserService.fetchUserRankByEmail({args})
    // ]).then(([totalCount, filteredData]) => {
    //     return {
    //         total: totalCount.count,
    //         filtered: filteredData.count,
    //         rows: filteredData.rows
    //     }
    // })

};

export default usersRankByEmailResolver;

