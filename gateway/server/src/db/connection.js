// import { Sequelize } from "sequelize";
// import accessEnv from "#root/helpers/accessEnv";
// import fs from "fs";
// import path from 'path';
//
// const client_key = (process.env.NODE_ENV == 'development') ?
//     fs.readFileSync(path.join(__dirname, accessEnv("SSL_CLIENT_KEY", ''))) :
//     fs.readFileSync(accessEnv("SSL_CLIENT_KEY", ''));
//
// const client_cert = (process.env.NODE_ENV == 'development') ?
//     fs.readFileSync(path.join(__dirname, accessEnv("SSL_CLIENT_CERT", ''))) :
//     fs.readFileSync(accessEnv("SSL_CLIENT_CERT", ''));
//
// const server_ca = (process.env.NODE_ENV == 'development') ?
//     fs.readFileSync(path.join(__dirname, accessEnv("SSL_SERVER_CA", ''))) :
//     fs.readFileSync(accessEnv("SSL_SERVER_CA", ''));
//
// const db_uri = accessEnv("DB_URI", '');
//
// const sequelize = new Sequelize(db_uri, {
//     dialectOptions: {
//         charset: "utf8",
//         multipleStatements: true,
//         ssl: {
//             key: client_key,
//             cert: client_cert,
//             ca: server_ca,
//         },
//     },
//     logging: false,
//     timezone: "-05:00",
// }) ;
//
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection to database has been successfully established.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });
//
// export function testConnection() {
//     return sequelize.authenticate().then(() => true);
// }
//
// export default sequelize;


import { Sequelize } from "sequelize";
import accessEnv from "#root/helpers/accessEnv";

// -------------SSL COMMUNICATION WITH DB IMPLEMENTATION ---------
// import fs from "fs";
// import path from 'path';

// const client_key = (process.env.NODE_ENV == 'development') ?
//     fs.readFileSync(path.join(__dirname, accessEnv("SSL_CLIENT_KEY", ''))) :
//     fs.readFileSync(accessEnv("SSL_CLIENT_KEY", ''));
//
// const client_cert = (process.env.NODE_ENV == 'development') ?
//     fs.readFileSync(path.join(__dirname, accessEnv("SSL_CLIENT_CERT", ''))) :
//     fs.readFileSync(accessEnv("SSL_CLIENT_CERT", ''));
//
// const server_ca = (process.env.NODE_ENV == 'development') ?
//     fs.readFileSync(path.join(__dirname, accessEnv("SSL_SERVER_CA", ''))) :
//     fs.readFileSync(accessEnv("SSL_SERVER_CA", ''));

const DB_URI = accessEnv("DB_URI", '');

const sequelize = new Sequelize(DB_URI, {
    dialectOptions: {
        charset: "utf8",
        multipleStatements: true,
        // ssl: {
        //     key: client_key,
        //     cert: client_cert,
        //     ca: server_ca,
        // },
    },
    logging: false,
    timezone: "-05:00",
    // timezone: "America/Guayaquil",
    // typeCast: function (field, next) { // for reading from database
    //     switch(field.type){
    //         case 'DATETIME':
    //         case 'TIMESTAMP':
    //             return new Date(field.string());
    //             break;
    //         case 'BIT':
    //             var bytes = field.buffer();
    //             return( bytes[ 0 ] === 1 );
    //             break;
    //         default:
    //             return next();
    //             break;
    //     }
    // },
    // define: {
    //     timestamps: false
    // }
}) ;

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to database has been successfully established.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export function testConnection() {
    return sequelize.authenticate().then(() => true);
}

export default sequelize;
