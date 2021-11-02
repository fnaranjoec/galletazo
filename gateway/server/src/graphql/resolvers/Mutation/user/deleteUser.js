import UserService from "#root/adapters/UserService";

const deleteUserResolver = async (obj, args, context) => {

  if (!args.user_id) {
      return new Error("User ID is missing!");
  }

  return await UserService.deleteUser({args});

};

export default deleteUserResolver;

