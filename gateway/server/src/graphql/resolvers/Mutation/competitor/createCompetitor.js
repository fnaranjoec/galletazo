import CompetitorService from "#root/adapters/CompetitorService";
import isEmpty from "lodash/isEmpty";
// import accessEnv from "#root/helpers/accessEnv";
// import storeUpload from "#root/helpers/storeUpload";


const createCompetitorResolver = async (obj, args, context) => {
        var created;
        const exists = await CompetitorService.fetchCompetitorByExternalId({competitor_external_id: args.input.competitor_external_id});
        
        if (isEmpty(exists)) {
            created = await CompetitorService.createCompetitor({args});
        } else {
            created = await CompetitorService.updateCompetitor({args});
        }
        const statusOperation=!isEmpty(created);
        return  {
            success: statusOperation ? true : false,
            code: statusOperation ? 0 : 99,
            message: statusOperation ? 'El Competidor se creo correctamente!' : 'Hubo problemas al crear el Competidor !',
            data: created
        }
};

export default createCompetitorResolver;

