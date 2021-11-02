import UserService from "#root/adapters/UserService";

// {user_id, user_name, user_email, user_phone, user_password, user_status}

const updateUserResolver = async (obj, args, context) => {

    if (!args.user_id) {
        return new Error("Operator ID is missing!");
    }

    // return await UserService.updateUser({user_id, user_name, user_email, user_phone, user_password, user_status});
    return await UserService.updateUser({args});

};

export default updateUserResolver;

