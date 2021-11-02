import UserService from "#root/adapters/UserService";
import isEmpty from "lodash/isEmpty";
import { AuthenticationError } from "apollo-server-express";

const usersResolver = async(obj, args, context) => {

    // // -------------------------------- AUTENTICACION -----------------------------------
    // if (isEmpty(context.req.competitor)) throw new AuthenticationError("000|Must authenticate");

    // return await UserService.fetchAllUsers({args});
    return await  Promise.all([
        UserService.countUsers(),
        await UserService.fetchAllUsers({args})
    ]).then(([totalCount, filteredData]) => {
        return {
            total: totalCount.count,
            filtered: filteredData.count,
            rows: filteredData.rows
        }
    })

};

export default usersResolver;

