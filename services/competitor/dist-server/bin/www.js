#!/usr/bin/env node

/**
 * Module dependencies.
 */
"use strict";

var _app = require("../app");

const debug = require('debug')('static-service:httpServer'); // const http = require('http');


const {
  createTerminus
} = require('@godaddy/terminus');
/**
 * Normalize a port into a number, string, or false.
 */


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

var port = normalizePort(process.env.PORT || '8101');

_app.app.set('port', port); // Run server


_app.httpServer.listen(port); // httpServer.setTimeout(2 * 60 * 1000);


_app.httpServer.on('error', onError);

_app.httpServer.on('listening', onListening);
/**
 * Event listener for HTTP httpServer "error" event.
 */


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port; // handle specific listen errors with friendly messages

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;

    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;

    default:
      throw error;
  }
}
/**
 * Event listener to gracefully terminate program on SIGTERM
 */
//On Termination signal


function TerminateGracefully() {
  debug('Terminating gracefully from sigterm');

  _app.httpServer.close(function () {
    process.exit(0);
  });
} //Health DB check


function onHealthCheck() {
  var {
    testConnection
  } = require("../src/db/connection");

  var connexion = testConnection();
  const data = {
    uptime: process.uptime(),
    database: connexion ? 'Ok' : 'Error',
    message: 'Ok',
    date: new Date()
  };
  return data; // return (connexion) ? Promise.resolve() : Promise.reject(new Error('Healthcheck failed'));
}

const options = {
  healthChecks: {
    '/healthcheck': onHealthCheck
  },
  signal: 'SIGTERM',
  onSignal: TerminateGracefully,
  // both
  logger: console.log
};
createTerminus(_app.httpServer, options);
/**
 * Event listener for HTTP httpServer "listening" event.
 */

function onListening() {
  var addr = _app.httpServer.address();

  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port; // debug('Listening on ' + bind + ' with process id ' + process.pid);

  debug('Listening SERVICE on ' + JSON.stringify(addr) + ' with process id ' + process.pid);
}