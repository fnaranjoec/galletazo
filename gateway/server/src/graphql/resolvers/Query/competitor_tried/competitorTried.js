import CompetitorService from "#root/adapters/CompetitorService";
import isEmpty from "lodash/isEmpty";
import { AuthenticationError } from "apollo-server-express";

const competitorTriedResolver = async(obj, args, context) => {

    // // -------------------------------- AUTENTICACION -----------------------------------
    // if (isEmpty(context.req.competitor)) throw new AuthenticationError("000|Must authenticate");

    // PROMOCODE QUEMADO PARA RECARGAS
    const competitor = await CompetitorService.fetchCompetitorByExternalId({
        competitor_external_id: args.competitor_external_id
    });

    if (args.promocode_code=='REFILL') {
        return {
            success: true,
            code: 0,
            message: 'La jugada fue exitosa !' ,
            data: {
                gano: true,
                competidor: competitor.competitor_id,
                premio: {
                    id: "REFILL001",
                    name: "RECARGA DE TIEMPO AIRE",
                    desc: "Recarga celular de tiempo aire",
                    image: "http:/latablta.com/image.png"
                }
            }
        }
    }
    
    const exists = await CompetitorService.competitorTried({
        competitor_external_id: args.competitor_external_id,
        promocode_code: args.promocode_code
    });
    
    const statusOperation=!isEmpty(exists);

    if (statusOperation) exists['competidor']= competitor.competitor_id;

    return  {
        success: statusOperation ? true : false,
        code: statusOperation ? 0 : 99,
        message: statusOperation ? 'La jugada fue exitosa !' : 'Hubo problemas en la juada !',
        data: exists
    }

};

export default competitorTriedResolver;
