import UserService from "#root/adapters/UserService";
import { AuthenticationError } from "apollo-server-express";

// logged in competitor resolver
const isEmpty = require("lodash/isEmpty");
const loggedInUser = async(_, __, { req }) => {

    // if (isEmpty(req.competitor)) throw new AuthenticationError("Must authenticate");

    const user = await UserService.fetchUserById({ user_id: req.user.id });
    return user;

}


export default  loggedInUser;