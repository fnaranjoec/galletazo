"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fileManager = _interopRequireDefault(require("./fileManager"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const downloadCloud = async ({
  filePath,
  destinationFolder,
  filename
}, isProfile = false) => {
  const filer = new _fileManager.default();
  await filer.setupFolder(destinationFolder);
  return await filer.gc_CopyFile(filePath, _path.default.join(destinationFolder, filename)); // return filer.gc_DownloadFile(`https://storage.cloud.google.com/mm_main/${file}`, file);   // Para bajar un stream
};

var _default = downloadCloud;
exports.default = _default;