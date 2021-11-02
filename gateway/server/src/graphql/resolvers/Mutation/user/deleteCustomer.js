import UserService from "#root/adapters/UserService";

const deleteCustomerResolver = async (obj, {customer_id}) => {

  return await UserService.deleteCustomer({customer_id});

};

export default deleteCustomerResolver;

