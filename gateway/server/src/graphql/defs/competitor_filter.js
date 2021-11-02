const competitor_filter = `
      
      competitor_id: String
      competitor_id_between: [String!]
      competitor_id_notBetween: [String!]
      competitor_id_greatherThan: String
      competitor_id_lessThan: String
      competitor_id_greatherThanOrEqual: String
      competitor_id_lessThanOrEqual: String

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

      competitor_identification: String
      competitor_identification_not: String
      competitor_identification_in: [String!]
      competitor_identification_notIn: [String!]
      competitor_identification_like: String
      competitor_identification_notLike: String
      competitor_identification_substring: String
      competitor_identification_startsWith: String
      competitor_identification_endsWith: String
      competitor_identification_notSubstring: String
      competitor_identification_notStartsWith: String
      competitor_identification_notEndsWith: String

      competitor_dob: String
      competitor_dob_between: [String!]
      competitor_dob_notBetween: [String!]
      competitor_dob_greatherThan: String
      competitor_dob_lessThan: String
      competitor_dob_greatherThanOrEqual: String
      competitor_dob_lessThanOrEqual: String

      competitor_city: String
      competitor_city_not: String
      competitor_city_in: [String!]
      competitor_city_notIn: [String!]
      competitor_city_like: String
      competitor_city_notLike: String
      competitor_city_substring: String
      competitor_city_startsWith: String
      competitor_city_endsWith: String
      competitor_city_notSubstring: String
      competitor_city_notStartsWith: String
      competitor_city_notEndsWith: String
      
      competitor_external_id: String
      competitor_external_id_not: String
      competitor_external_id_in: [String!]
      competitor_external_id_notIn: [String!]
      competitor_external_id_like: String
      competitor_external_id_notLike: String
      competitor_external_id_substring: String
      competitor_external_id_startsWith: String
      competitor_external_id_endsWith: String
      competitor_external_id_notSubstring: String
      competitor_external_id_notStartsWith: String
      competitor_external_id_notEndsWith: String    

      competitor_created: String
      competitor_created_between: [String!]
      competitor_created_notBetween: [String!]
      competitor_created_greatherThan: String
      competitor_created_lessThan: String
      competitor_created_greatherThanOrEqual: String
      competitor_created_lessThanOrEqual: String
        
      competitor_status: String
      competitor_status_not: String
      competitor_status_in: [String!]
      competitor_status_notIn: [String!]
      competitor_status_like: String
      competitor_status_notLike: String
      competitor_status_substring: String
      competitor_status_startsWith: String
      competitor_status_endsWith: String
      competitor_status_notSubstring: String
      competitor_status_notStartsWith: String
      competitor_status_notEndsWith: String
       
`;

export { competitor_filter} ;