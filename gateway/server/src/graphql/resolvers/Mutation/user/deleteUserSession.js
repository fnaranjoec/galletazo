import UserService from "#root/adapters/UserService";

const deleteUserSessionResolver = async (obj, {session_id}, context) => {
    const userSession = await UserService.deleteUserSession({session_id});
    context.res.clearCookie("userSessionId");
    return true;
};

export default deleteUserSessionResolver;

