import UserService from "#root/adapters/UserService";

const deleteUserResolver = async (obj, {user_id}) => {

  return await UserService.deleteUser({user_id});

};

export default deleteUserResolver;

