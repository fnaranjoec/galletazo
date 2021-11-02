"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

// import { v4 as uuidv4 } from 'uuid';
// import { uuid } from 'uuidv4';
const generateUUID = () => {
  return (0, _uuid.v4)();
}; // export default {generateUUID: () => uuidv4() };


var _default = generateUUID;
exports.default = _default;