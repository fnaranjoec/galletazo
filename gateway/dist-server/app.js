"use strict";

var _apolloServerExpress = require("apollo-server-express");

var _apolloServerCore = require("apollo-server-core");

var _resolvers = _interopRequireDefault(require("./src/graphql/resolvers"));

var _typeDefs = _interopRequireDefault(require("./src/graphql/typeDefs"));

var _validateTokensMiddleware = _interopRequireDefault(require("./src/helpers/validateTokensMiddleware"));

var _formatGraphQLErrors = _interopRequireDefault(require("./src/graphql/formatGraphQLErrors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createError = require('http-errors');

const express = require('express');

const useragent = require('express-useragent');

const path = require('path');

const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const cors = require('cors');

const logger = require('morgan');

const http = require('http'); // Apollo


const {
  MemcachedCache
} = require('apollo-server-cache-memcached'); // ------------------------ CONSTANTS --------------------


const app = express();
const httpServer = http.createServer(app); // view engine

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // ------------------------ SETTINGS ---------------------

app.use(logger('dev'));
app.use(express.json());
app.use(useragent.express());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public'))); // Token Midleware

app.use(_validateTokensMiddleware.default); // ----------------- PARSERS --------------

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
})); // // GraphQL
// const apolloConfig = new ApolloServerExpressConfig({
//     time
// });

const apolloServer = new _apolloServerExpress.ApolloServer({
  uploads: {
    // Limits here should be stricter than config for surrounding
    // infrastructure such as Nginx so errors can be handled elegantly by
    // graphql-upload:
    // https://github.com/jaydenseric/graphql-upload#type-processrequestoptions
    maxFileSize: 50000000,
    // 50 MB
    maxFiles: 20
  },
  context: ({
    req,
    res
  }) => ({
    req,
    res
  }),
  formatError: _formatGraphQLErrors.default,
  resolvers: _resolvers.default,
  typeDefs: _typeDefs.default,
  tracing: true,
  plugins: [(0, _apolloServerCore.ApolloServerPluginDrainHttpServer)({
    httpServer
  }), (0, _apolloServerCore.ApolloServerPluginCacheControl)({
    defaultMaxAge: 90
  })],
  persistedQueries: {
    ttl: 900 // 15 minutes

  },
  persistedQueries: {
    cache: new MemcachedCache(['memcached-1.local', 'memcached-2.local', 'memcached-3.local'], {
      retries: 10,
      retry: 10000
    })
  }
});
apolloServer.start();
apolloServer.applyMiddleware({
  app,
  cors: false,
  path: "/api-web",
  bodyParserConfig: {
    limit: '50mb'
  }
}); // // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
// error handler

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