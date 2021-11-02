"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.competitor_tried_view_filter = void 0;
const competitor_tried_view_filter = `
      
      competitor_tried_id: BigInt
      competitor_tried_id_between: [BigInt!]
      competitor_tried_id_notBetween: [BigInt!]
      competitor_tried_id_greatherThan: BigInt
      competitor_tried_id_lessThan: BigInt
      competitor_tried_id_greatherThanOrEqual: BigInt
      competitor_tried_id_lessThanOrEqual: BigInt
      
      competitor_tried_at: String
      competitor_tried_at_between: [String!]
      competitor_tried_at_notBetween: [String!]
      competitor_tried_at_greatherThan: String
      competitor_tried_at_lessThan: String
      competitor_tried_at_greatherThanOrEqual: String
      competitor_tried_at_lessThanOrEqual: String

      promocode_code: String
      promocode_code_not: String
      promocode_code_in: [String!]
      promocode_code_notIn: [String!]
      promocode_code_like: String
      promocode_code_notLike: String
      promocode_code_substring: String
      promocode_code_startsWith: String
      promocode_code_endsWith: String
      promocode_code_notSubstring: String
      promocode_code_notStartsWith: String
      promocode_code_notEndsWith: String

      competitor_firstname: String
      competitor_firstname_not: String
      competitor_firstname_in: [String!]
      competitor_firstname_notIn: [String!]
      competitor_firstname_like: String
      competitor_firstname_notLike: String
      competitor_firstname_substring: String
      competitor_firstname_startsWith: String
      competitor_firstname_endsWith: String
      competitor_firstname_notSubstring: String
      competitor_firstname_notStartsWith: String
      competitor_firstname_notEndsWith: String

      competitor_lastname: String
      competitor_lastname_not: String
      competitor_lastname_in: [String!]
      competitor_lastname_notIn: [String!]
      competitor_lastname_like: String
      competitor_lastname_notLike: String
      competitor_lastname_substring: String
      competitor_lastname_startsWith: String
      competitor_lastname_endsWith: String
      competitor_lastname_notSubstring: String
      competitor_lastname_notStartsWith: String
      competitor_lastname_notEndsWith: String

      competitor_email: String
      competitor_email_not: String
      competitor_email_in: [String!]
      competitor_email_notIn: [String!]
      competitor_email_like: String
      competitor_email_notLike: String
      competitor_email_substring: String
      competitor_email_startsWith: String
      competitor_email_endsWith: String
      competitor_email_notSubstring: String
      competitor_email_notStartsWith: String
      competitor_email_notEndsWith: String
      
      competitor_phone: String
      competitor_phone_not: String
      competitor_phone_in: [String!]
      competitor_phone_notIn: [String!]
      competitor_phone_like: String
      competitor_phone_notLike: String
      competitor_phone_substring: String
      competitor_phone_startsWith: String
      competitor_phone_endsWith: String
      competitor_phone_notSubstring: String
      competitor_phone_notStartsWith: String
      competitor_phone_notEndsWith: String

      prize_name: String
      prize_name_not: String
      prize_name_in: [String!]
      prize_name_notIn: [String!]
      prize_name_like: String
      prize_name_notLike: String
      prize_name_substring: String
      prize_name_startsWith: String
      prize_name_endsWith: String
      prize_name_notSubstring: String
      prize_name_notStartsWith: String
      prize_name_notEndsWith: String
       
`;
exports.competitor_tried_view_filter = competitor_tried_view_filter;