import UserService from "#root/adapters/UserService";

// const { GraphQLDateTime } = require('graphql-iso-date');

const rolesResolver = async() => {

    return await UserService.fetchAllRoles();
};


export default rolesResolver;

