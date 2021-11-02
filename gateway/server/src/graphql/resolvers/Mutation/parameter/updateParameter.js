import SystemService from "#root/adapters/SystemService";
import accessEnv from "#root/helpers/accessEnv";
import storeUpload from "#root/helpers/storeUpload";

//{product_id, brand_id, product_name, product_slug, product_desc, product_picture, product_status, file=null}
const updateParameterResolver = async (obj, args, context) => {


    // Si no envio archivo solo actualizo los datos y no subo nada al BUCKET S3
    //file===null
    if (!args.parameter_id) {
        return new Error("Parameter NAME is missing!");
    }

    return await SystemService.updateParameter({args});

};

export default updateParameterResolver;

