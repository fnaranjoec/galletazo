import { gql } from 'apollo-server';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';

import { file } from "./defs/file";

import { user } from "./defs/user";
import { userRank } from "./defs/userRank";
// import { usersession } from "./defs/usersession";

// import { userIntercom } from "./defs/userIntercom";
// import { userIntercomAttributes } from "./defs/userIntercomAttributes";

import { userFilter } from "./defs/userFilter";
import { userRankFilter } from "./defs/userRankFilter";
import { parameterFilter } from "./defs/parameterFilter"

// Galletazo defs
import { parameter } from "./defs/parameter";
import { competitor } from "./defs/competitor";
import { competitor_filter } from "./defs/competitor_filter";
import { competitorInput } from "./defs/competitorInput";
import { prize } from "./defs/prize";
import { promocode } from "./defs/promocode";
import { competitor_tried } from "./defs/competitor_tried";

import { competitor_tried_view } from "./defs/competitor_tried_view";
import { competitor_tried_view_filter} from "./defs/competitor_tried_view_filter";

import { competitor_refill } from "./defs/competitor_refill";
import { competitor_refill_filter} from "./defs/competitor_refill_filter";
import { competitorRefillInput } from "./defs/competitorRefillInput";


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
      ${file.toString()}
    }

    type User {
      ${user.toString()}
    }
    
    type UserRank {
      ${userRank.toString()}
    }
    
    type Parameter {
      ${parameter.toString()}
    }
    
    type Competitor {
      ${competitor.toString()}
    }
    
    type CompetitorTried {
      ${competitor_tried.toString()}
    }
    
    
    type Prize {
      ${prize.toString()}
    }
    
    type Promocode {
      ${promocode.toString()}
    }
    

    type CompetitorTriedView {
      ${competitor_tried_view.toString()}
    }
    
    type CompetitorRefill {
      ${competitor_refill.toString()}
    }
    
    #--------------------------- FILTERS ---------------------
    input _UserFilter {
      AND: [_UserFilter!]
      OR: [_UserFilter!]
      ${userFilter.toString()}
    }
            
    input _UserRankFilter {
      AND: [_UserRankFilter!]
      OR: [_UserRankFilter!]
      ${userRankFilter.toString()}
    }
        
    input _ParameterFilter {
      AND: [_ParameterFilter!]
      OR: [_ParameterFilter!]
      ${parameterFilter.toString()}
    }
    
    input _CompetitorFilter {
      AND: [_CompetitorFilter!]
      OR: [_CompetitorFilter!]
      ${competitor_filter.toString()}
    }
    
    input _CompetitorTriedViewFilter {
      AND: [_CompetitorTriedViewFilter!]
      OR: [_CompetitorTriedViewFilter!]
      ${competitor_tried_view_filter.toString()}
    }  
        
    input _CompetitorRefillFilter {
      AND: [_CompetitorRefillFilter!]
      OR: [_CompetitorRefillFilter!]
      ${competitor_refill_filter.toString()}
    }

    #--------------------------- INPUTS ---------------------
    input _competitor {
        ${competitorInput.toString()}
    }
    
    input _competitorRefill {
        ${competitorRefillInput.toString()}
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

const typeDefs = gql`${preTypeDefs}`;

export default typeDefs;

