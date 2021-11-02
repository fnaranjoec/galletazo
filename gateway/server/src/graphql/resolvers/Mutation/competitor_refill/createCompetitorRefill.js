import CompetitorService from "#root/adapters/CompetitorService";
import isEmpty from "lodash/isEmpty";
// import accessEnv from "#root/helpers/accessEnv";
// import storeUpload from "#root/helpers/storeUpload";


const createCompetitorRefillResolver = async (obj, args, context) => {
        var created = await CompetitorService.createCompetitorRefill({args});
        const statusOperation=!isEmpty(created);
        return  {
            success: statusOperation ? true : false,
            code: statusOperation ? 0 : 99,
            message: statusOperation ? 'El Competidor Recarga se creo correctamente!' : 'Hubo problemas al crear el Competidor Recarga !',
            data: created
        }
};

export default createCompetitorRefillResolver;

