/**
 * Require .env only in development instances
 */
var debug = require('debug')('static-service:server');
// if(process.env.NODE_ENV == 'development') {
    debug('Enabling development .env');
    require('dotenv').config()
// }


const cache = {};

const accessEnv = (key, defaultValue) => {

    // Si no hay key en process.env
    if (!(key in process.env)){

        // si hay valor default devuelvo default
        if (defaultValue){ return defaultValue };

        // si no hay default ni existe en process.env genero error
        throw new Error(`${key} not found in process.env !`);
    }

    // Si esta en cache devuelvo cache
    if (cache[key]){ return cache[key]};

    // Asigno a cache por primera vez
    cache[key] = process.env[key];
    return cache[key];

};

export default accessEnv;
