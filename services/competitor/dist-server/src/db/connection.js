"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.testConnection = testConnection;

var _sequelize = require("sequelize");

var _accessEnv = _interopRequireDefault(require("../helpers/accessEnv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
const DB_URI = (0, _accessEnv.default)("DB_URI", '');
const sequelize = new _sequelize.Sequelize(DB_URI, {
  dialectOptions: {
    charset: "utf8",
    multipleStatements: true // ssl: {
    //     key: client_key,
    //     cert: client_cert,
    //     ca: server_ca,
    // },

  },
  logging: false,
  timezone: "-05:00" // timezone: "America/Guayaquil",
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

});
sequelize.authenticate().then(() => {
  console.log('Connection to database has been successfully established.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

function testConnection() {
  return sequelize.authenticate().then(() => true);
}

var _default = sequelize;
exports.default = _default;