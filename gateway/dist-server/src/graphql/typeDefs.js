"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServer = require("apollo-server");

var _graphqlTypeJson = _interopRequireWildcard(require("graphql-type-json"));

var _file = require("./defs/file");

var _user = require("./defs/user");

var _userRank = require("./defs/userRank");

var _userFilter = require("./defs/userFilter");

var _userRankFilter = require("./defs/userRankFilter");

var _parameterFilter = require("./defs/parameterFilter");

var _parameter = require("./defs/parameter");

var _competitor = require("./defs/competitor");

var _competitor_filter = require("./defs/competitor_filter");

var _competitorInput = require("./defs/competitorInput");

var _prize = require("./defs/prize");

var _promocode = require("./defs/promocode");

var _competitor_tried = require("./defs/competitor_tried");

var _competitor_tried_view = require("./defs/competitor_tried_view");

var _competitor_tried_view_filter = require("./defs/competitor_tried_view_filter");

var _competitor_refill = require("./defs/competitor_refill");

var _competitor_refill_filter = require("./defs/competitor_refill_filter");

var _competitorRefillInput = require("./defs/competitorRefillInput");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import { usersession } from "./defs/usersession";
// import { userIntercom } from "./defs/userIntercom";
// import { userIntercomAttributes } from "./defs/userIntercomAttributes";
// Galletazo defs
const preTypeDefs = `

    scalar DateTime 
    scalar Object
    scalar Date
    scalar Integer
    scalar BigInt
    scalar GraphQLJSON
    scalar GraphQLJSONObject
    scalar Text
    scalar Bool
    
    # ------------------------- CACHE ----------------------
    enum CacheControlScope {
      PUBLIC
      PRIVATE
    }
    
    directive @cacheControl(
      maxAge: Int
      scope: CacheControlScope
      inheritMaxAge: Boolean
    ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION
  
    #--------------------------- TYPES ---------------------
    type File {
      ${_file.file.toString()}
    }

    type User {
      ${_user.user.toString()}
    }
    
    type UserRank {
      ${_userRank.userRank.toString()}
    }
    
    type Parameter {
      ${_parameter.parameter.toString()}
    }
    
    type Competitor {
      ${_competitor.competitor.toString()}
    }
    
    type CompetitorTried {
      ${_competitor_tried.competitor_tried.toString()}
    }
    
    
    type Prize {
      ${_prize.prize.toString()}
    }
    
    type Promocode {
      ${_promocode.promocode.toString()}
    }
    

    type CompetitorTriedView {
      ${_competitor_tried_view.competitor_tried_view.toString()}
    }
    
    type CompetitorRefill {
      ${_competitor_refill.competitor_refill.toString()}
    }
    
    #--------------------------- FILTERS ---------------------
    input _UserFilter {
      AND: [_UserFilter!]
      OR: [_UserFilter!]
      ${_userFilter.userFilter.toString()}
    }
            
    input _UserRankFilter {
      AND: [_UserRankFilter!]
      OR: [_UserRankFilter!]
      ${_userRankFilter.userRankFilter.toString()}
    }
        
    input _ParameterFilter {
      AND: [_ParameterFilter!]
      OR: [_ParameterFilter!]
      ${_parameterFilter.parameterFilter.toString()}
    }
    
    input _CompetitorFilter {
      AND: [_CompetitorFilter!]
      OR: [_CompetitorFilter!]
      ${_competitor_filter.competitor_filter.toString()}
    }
    
    input _CompetitorTriedViewFilter {
      AND: [_CompetitorTriedViewFilter!]
      OR: [_CompetitorTriedViewFilter!]
      ${_competitor_tried_view_filter.competitor_tried_view_filter.toString()}
    }  
        
    input _CompetitorRefillFilter {
      AND: [_CompetitorRefillFilter!]
      OR: [_CompetitorRefillFilter!]
      ${_competitor_refill_filter.competitor_refill_filter.toString()}
    }

    #--------------------------- INPUTS ---------------------
    input _competitor {
        ${_competitorInput.competitorInput.toString()}
    }
    
    input _competitorRefill {
        ${_competitorRefillInput.competitorRefillInput.toString()}
    }
    
    #--------------------------- MUTATIONS ---------------------
    type Mutation {
    
        ## ----> UPLOAD
        ##singleUpload(file: Upload!): File!
        ##singleUpload(file: Upload!, entity: String!, entity_id: String!): File!
        ##multipleUpload(files: [Upload!]): [File!]!

        # ----> USER
        #createUser(
        #            user_name: String,
        #            user_email: String!,
        #            user_shorturl: String,
        #            referencial_id: String,
        #            user_lat: Float,
        #            user_lon: Float,
        #            user_browser: String,
        #            user_ip: String,
        #            user_os: String,
        #            user_country: String,
        #            user_lang: String,
        #            ) : GraphQLJSON!
        
        #updateUser(
        #            user_id: String!,
        #            user_name: String,
        #            user_email: String,
        #            user_shorturl: String,
        #            user_status: String,
        #            user_lat: Float,
        #            user_lon: Float,
        #            user_browser: String,
        #            user_ip: String,
        #            user_os: String,
        #            user_country: String,
        #            user_lang: String,
        #            ) : User!

        #deleteUser(user_id: String!) : Boolean!

        # ----> PARAMETER
        updateParameter(
                    parameter_name: String!, 
                    parameter_text: Text, 
                    parameter_value: Float,
                    ) : Parameter!

        # ----> COMPETITOR
        createCompetitor(input: _competitor) : RespuestaCodeJSON!
        # ----> COMPETITOR-REFILL
        createCompetitorRefill(input: _competitorRefill) : RespuestaCodeJSON!
    }
    
    
    type Respuesta {
      success: Boolean!
      message: String!
      data: String!
    }
        
    type RespuestaCode {
      success: Boolean!
      code: Int!
      message: String!
      data: String!
    } 
            
    type RespuestaCodeJSON {
      success: Boolean!
      code: Int!
      message: String!
      data: GraphQLJSON!
    }        

    type ParameterList {
        total: Int!
        filtered: Int!
        rows: [Parameter!]!
    }

    type CompetitorList {
        total: Int!
        filtered: Int!
        rows: [Competitor!]!
    }
    
    type CompetitorTriedViewList {
        total: Int!
        filtered: Int!
        rows: [CompetitorTriedView!]!
    }

    type UserList {
        total: Int!
        filtered: Int!
        rows: [User!]!
    }
       
    type UserRankList {
        total: Int!
        filtered: Int!
        rows: [UserRank!]!
    }

    
    type CompetitorRefillList {
        total: Int!
        filtered: Int!
        rows: [CompetitorRefill!]!
    }
            
    #--------------------------- QUERIES ---------------------
    type Query {
    
        # loggedInUser: User!
    
        # uploads: [File!]!

        parameters(filter: _ParameterFilter): ParameterList

        #users(filter: _UserFilter): UserList
        #usersRank(filter: _UserRankFilter): UserRankList
        #userRankByEmail(user_email: String!): UserRank
        ## userSession(me: Boolean!): UserSession
        
        verifyCode(promocode_code: String!): RespuestaCodeJSON!
        competitorTried(competitor_external_id: String!, promocode_code: String!) : RespuestaCodeJSON!
        
        competitor(filter: _CompetitorFilter) : CompetitorList
        competitorTriedView(filter: _CompetitorTriedViewFilter): CompetitorTriedViewList
        
        competitorRefill(filter: _CompetitorRefillFilter): CompetitorRefillList

    }

`;
const typeDefs = (0, _apolloServer.gql)`${preTypeDefs}`;
var _default = typeDefs;
exports.default = _default;