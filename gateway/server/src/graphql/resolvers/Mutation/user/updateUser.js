import UserService from "#root/adapters/UserService";
import storeCloud from "#root/helpers/storeCloud";
import isEmpty from "lodash/isEmpty";

const updateUserResolver = async (obj, args, context) => {

    if (!args.user_id) {
        return new Error("User ID is missing!");
    }

    // SI NO HAY ARCHIVO SOLO CREO EL OBJETO
    // if (!args.file || args.file===null || args.file==="undefined") {
        return await UserService.updateUser({args});
    // }

    // /* Aqui primero graba el archivo luego la entidad */
    // var uploaded=null;
    //
    // await storeCloud({file: await args.file}, true)
    //     .then((res) => {
    //         uploaded=res;
    //     })
    //     .catch(err => {
    //         return new Error("Has errors when uploading file!");
    //     });
    //
    // if (uploaded===null || uploaded==="undefined") {
    //     return new Error(`Has errors when uploading file. Target directory could not exists.`);
    // }
    //
    // if (!isEmpty(uploaded)) {
    //     args.user_picture = uploaded.DESTINO_EN_GCLOUD;
    //     delete args.file;
    //     return await UserService.updateUser({args});
    // }



};

export default updateUserResolver;

