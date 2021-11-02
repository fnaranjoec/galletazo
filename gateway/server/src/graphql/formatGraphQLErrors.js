import _ from "lodash";

// import SystemService from "#root/adapters/SystemService";

// **** ESTO USE PARA TRAER EL TEXTO DEL CODIGO DEL MENSAJE QUE ESTA UNA TABLA DE MENSAJES ****
// const getMessage = (code, error) => {
//
//     const message = SystemService.fetchMessageByCode({message_motor: "ABBOTTCOUPONS", message_code: code});
//     return {
//         error: message.message_code,
//         message: message.message_message,
//         path: error.path[0],
//         stacktrace: error.extensions.exception.stacktrace,
//     };
//
// }

const formatGraphQLErrors = error => {
    // console.log("error--->", error);
    const errorDetails = _.get(error, 'originalError.response.body')

    try {
        // console.log("formatGraphQLErrors errorDetails==> ", errorDetails);
        if (errorDetails) return JSON.parse(errorDetails)
    } catch (e) {
        // console.log("formatGraphQLErrors ==> ", e);
        return {
            error: e.code,
            message: e.message.replace(/"/g, "'"),
            path: null,
            stacktrace: null,
        }

    }

    return {
        error: error.extensions.code,
        message: error.message.replace(/"/g, "'"),
        // path: error.locations[0],
        path: error.path,
        stacktrace: error.extensions.exception.stacktrace[0].replace(/"/g, "'"),
    }

    // return error

}

export default formatGraphQLErrors;
