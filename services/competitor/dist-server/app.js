"use strict";

var _accessEnv = _interopRequireDefault(require("./src/helpers/accessEnv"));

var _index = _interopRequireDefault(require("./routes/index"));

var _routesUser = _interopRequireDefault(require("./routes/routesUser"));

var _routesParameter = _interopRequireDefault(require("./routes/routesParameter"));

var _routesCompetitor = _interopRequireDefault(require("./routes/routesCompetitor"));

var _routesCompetitorRefill = _interopRequireDefault(require("./routes/routesCompetitorRefill"));

var _routesPromocode = _interopRequireDefault(require("./routes/routesPromocode"));

var _routesPrize = _interopRequireDefault(require("./routes/routesPrize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------ VARS -----------------------
const createError = require('http-errors');

const express = require('express');

const useragent = require('express-useragent');

const path = require('path');

const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const logger = require('morgan');

const cors = require('cors');

const http = require('http'); // ----------------------- IMPORTS -----------------


// ------------------------ CONSTANTS --------------------
const app = express();
const httpServer = http.createServer(app);
const ENDPOINT_URI = (0, _accessEnv.default)("ENDPOINT_URI"); // view engine

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // ------------------------ SETTINGS ---------------------

app.use(logger('dev'));
app.use(express.json());
app.use(useragent.express());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public'))); // ----------------- PARSERS --------------
// If graphql

app.use(bodyParser.json({
  limit: '50mb',
  extende: true
}));
app.use(bodyParser.text({
  type: 'application/graphql'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));
app.use(cors({
  origin: function (origin, cb) {
    cb(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true
})); // =============== ROUTERS PATHS ====================

app.use('/', _index.default);
app.use(`${ENDPOINT_URI}/users`, _routesUser.default);
app.use(`${ENDPOINT_URI}/parameters`, _routesParameter.default);
app.use(`${ENDPOINT_URI}/competitors`, _routesCompetitor.default);
app.use(`${ENDPOINT_URI}/competitors-refill`, _routesCompetitorRefill.default);
app.use(`${ENDPOINT_URI}/promocodes`, _routesPromocode.default);
app.use(`${ENDPOINT_URI}/prizes`, _routesPrize.default); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500); // res.render('error'); // Cuando usas PUG
  // res.json('error');

  res.json(err.message);
});
module.exports = {
  app,
  httpServer
};