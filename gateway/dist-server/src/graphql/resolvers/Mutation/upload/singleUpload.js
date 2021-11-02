"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _storeUpload = _interopRequireDefault(require("../../../../helpers/storeUpload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import MediasService from "#root/adapters/MediasService";
const singleUploadResolver = async (obj, {
  file,
  upload_dir
}) => {
  await (0, _storeUpload.default)({
    file,
    upload_dir
  }).then(res => {
    return true;
  }).catch(err => {
    return false;
  });
};

var _default = singleUploadResolver;
exports.default = _default;