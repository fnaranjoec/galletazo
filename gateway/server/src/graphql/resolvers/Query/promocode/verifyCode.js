import PromocodeService from "#root/adapters/PromocodeService";
import isEmpty from "lodash/isEmpty";
import { AuthenticationError } from "apollo-server-express";

const verifyCodeResolver = async(obj, args, context) => {

    // // -------------------------------- AUTENTICACION -----------------------------------
    // if (isEmpty(context.req.competitor)) throw new AuthenticationError("000|Must authenticate");


    // PROMOCODE QUEMADO PARA RECARGAS
    if (args.promocode_code=='REFILL') {
        return {
            success: true,
            code: 0,
            message: 'El codigo es valido !' ,
            data: {
                competidor: '',
                gano: true,
                premio: {
                    id: "REFILL001",
                    name: "RECARGA DE TIEMPO AIRE",
                    desc: "Recarga celular de tiempo aire",
                    image: "http:/latablta.com/image.png"
                }
            }
        }
    }


    
    const exists = await PromocodeService.fetchPromoCodeByCode({promocode_code: args.promocode_code});
    const statusOperation=!isEmpty(exists);
    return  {
        success: statusOperation ? true : false,
        code: statusOperation ? 0 : 99,
        message: statusOperation ? 'El Código es valido!' : 'El código no es valido o ya fue usado !',
        data: exists
    }

};

export default verifyCodeResolver;

