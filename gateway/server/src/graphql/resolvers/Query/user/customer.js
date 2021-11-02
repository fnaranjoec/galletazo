import UserService from "#root/adapters/UserService";

const customersResolver = async(obj, args, context) => {

    // // console.log(args);
    // return await  UserService.fetchAllCustomers({args});

    return await  Promise.all([
        UserService.countCustomers(),
        UserService.fetchAllCustomers({args})
    ]).then(([totalCount, filteredData]) => {
        return {
            total: totalCount.count,
            filtered: filteredData.count,
            rows: filteredData.rows
        }
    })

};

export default customersResolver;

