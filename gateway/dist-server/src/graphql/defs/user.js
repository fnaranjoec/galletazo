"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user = void 0;
const user = `
        user_id: String!
        user_origin: String
        user_name: String
        user_email: String!
        user_shorturl: String
        user_entry_pos: Integer!
        user_status: String!
        user_lat: Float
        user_lon: Float
        user_browser: String
        user_ip: String
        user_os: String
        user_country: String
        user_lang: String
        user_created: DateTime!
`;
exports.user = user;