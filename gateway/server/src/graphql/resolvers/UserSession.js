import UserService from "#root/adapters/UserService";

const UserSession = {
    user: async userSession => {
        return await UserService.fetchUserById({user_id: userSession.user_id});
    }
};

export default UserSession;
