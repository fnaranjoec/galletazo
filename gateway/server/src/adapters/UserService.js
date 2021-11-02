import got from "got";
import accessEnv from "#root/helpers/accessEnv";

const USER_SERVICE_URI = accessEnv("USER_SERVICE_URI");

export default class UserService {

    // ----------------------------------------------------- USER ----------------------------------------------------
    // *** FETCH ALL USER
    static async fetchAllUsers({args}) {
        const body = await got.post(`${USER_SERVICE_URI}/users/all`, {json: {args: args}}).json();

        return body || [];

    };


    static async fetchAllUsersRank({args}) {

        const body = await got.post(`${USER_SERVICE_URI}/users/rank/all`, {json: {args: args}}).json();

        return body || [];
s
    };


    // *** COUNT USER
    static async countUsers() {

        const body = await got.get(`${USER_SERVICE_URI}/users/count`).json();

        return body || [];

    };

    static async fetchUserById({user_id}) {

        const body = await got.get(`${USER_SERVICE_URI}/users/${user_id}`).json();

        return body || {};

    };

    static async fetchUserRankByEmail({user_email}) {

        const body = await got.get(`${USER_SERVICE_URI}/users/rank/${user_email}`).json();

        return body || {};

    };

    static async createUser({args}) {

        const body= await got.post(`${USER_SERVICE_URI}/users`, {
            json: {args}
        }).json();

        return body || {};
    };


    static async createUserIntercom({args}) {

        const body= await got.post(`${USER_SERVICE_URI}/users/intercom`, {
            json: {args}
        }).json();

        return body || {};
    };


    static async updateUser({args}) {

        const body= await got.put(`${USER_SERVICE_URI}/users/${args.user_id}`, {
            json: {args}
        }).json();

        return body || [];
    };

    static async deleteUser({args}) {

        const body= await got.delete(`${USER_SERVICE_URI}/users/${args.user_id}`).json();

        return body || false;
    };

}


