// ------------------------ VARS -----------------------
const createError = require('http-errors');
const express = require('express');
const useragent = require('express-useragent');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const http = require('http');


// ----------------------- IMPORTS -----------------
import accessEnv from "#root/helpers/accessEnv";
import indexRouter from "./routes/index";
import routesUser from "./routes/routesUser";
import routesParameter from "./routes/routesParameter";
// import routesPerson from "./routes/routesPerson";
// import routesSession from "./routes/routesSession";
import routesCompetitor from "./routes/routesCompetitor";
import routesCompetitorRefill from "./routes/routesCompetitorRefill";
import routesPromocode from "./routes/routesPromocode";
import routesPrize from "./routes/routesPrize";


// ------------------------ CONSTANTS --------------------
const app = express();
const httpServer = http.createServer(app);
const ENDPOINT_URI = accessEnv("ENDPOINT_URI");

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// ------------------------ SETTINGS ---------------------
app.use(logger('dev'));
app.use(express.json());
app.use(useragent.express());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// ----------------- PARSERS --------------
// If graphql
app.use(bodyParser.json({
    limit: '50mb', extende: true
}));

app.use(bodyParser.text({
    type: 'application/graphql'
}));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

app.use(
    cors({
        origin: function (origin, cb) { cb(null, true) },
        optionsSuccessStatus: 200,
        credentials: true
    })
);

// =============== ROUTERS PATHS ====================
app.use('/', indexRouter);
app.use(`${ENDPOINT_URI}/users`, routesUser);
app.use(`${ENDPOINT_URI}/parameters`, routesParameter);
app.use(`${ENDPOINT_URI}/competitors`, routesCompetitor);
app.use(`${ENDPOINT_URI}/competitors-refill`, routesCompetitorRefill);
app.use(`${ENDPOINT_URI}/promocodes`, routesPromocode);
app.use(`${ENDPOINT_URI}/prizes`, routesPrize);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error'); // Cuando usas PUG
  // res.json('error');
  res.json(err.message);

});

module.exports = {app, httpServer};
