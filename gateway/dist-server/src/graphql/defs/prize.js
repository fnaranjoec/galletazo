"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prize = void 0;
const prize = `
        prize_id: String!
        prize_name: String!
        prize_desc: Text
        prize_image: String!
        prize_qyt: Int!
        prize_period_type: String!
        prize_period_value: Int!
        prize_last_delivery: DateTime
        prize_created: DateTime!
        prize_status: String!
        prize_period_qyt: Int!
        prize_last_reset: DateTime
`;
exports.prize = prize;