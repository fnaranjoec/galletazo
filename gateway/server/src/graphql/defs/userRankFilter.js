const userRankFilter = `

      user_rank: Float
      user_rank_between: [Float!]
      user_rank_notBetween: [Float!]
      user_rank_greatherThan: Float
      user_rank_lessThan: Float
      user_rank_greatherThanOrEqual: Float
      user_rank_lessThanOrEqual: Float

      user_email: String
      user_email_not: String
      user_email_in: [String!]
      user_email_notIn: [String!]
      user_email_like: String
      user_email_notLike: String
      user_email_substring: String
      user_email_startsWith: String
      user_email_endsWith: String
      user_email_notSubstring: String
      user_email_notStartsWith: String
      user_email_notEndsWith: String
      
      user_shorturl: String
      user_shorturl_not: String
      user_shorturl_in: [String!]
      user_shorturl_notIn: [String!]
      user_shorturl_like: String
      user_shorturl_notLike: String
      user_shorturl_substring: String
      user_shorturl_startsWith: String
      user_shorturl_endsWith: String
      user_shorturl_notSubstring: String
      user_shorturl_notStartsWith: String
      user_shorturl_notEndsWith: String
      
      user_entry_pos: Float
      user_entry_pos_between: [Float!]
      user_entry_pos_notBetween: [Float!]
      user_entry_pos_greatherThan: Float
      user_entry_pos_lessThan: Float
      user_entry_pos_greatherThanOrEqual: Float
      user_entry_pos_lessThanOrEqual: Float

      user_id: String
      user_id_not: String
      user_id_in: [String!]
      user_id_notIn: [String!]
      user_id_like: String
      user_id_notLike: String
      user_id_substring: String
      user_id_startsWith: String
      user_id_endsWith: String
      user_id_notSubstring: String
      user_id_notStartsWith: String
      user_id_notEndsWith: String       
      
      user_qty_referencial: Float
      user_qty_referencial_between: [Float!]
      user_qty_referencial_notBetween: [Float!]
      user_qty_referencial_greatherThan: Float
      user_qty_referencial_lessThan: Float
      user_qty_referencial_greatherThanOrEqual: Float
      user_qty_referencial_lessThanOrEqual: Float
`;

export { userRankFilter };