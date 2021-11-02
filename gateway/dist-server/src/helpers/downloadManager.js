"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFilePathDownload = exports.deleteDownload = exports.createDownload = void 0;

var fs = _interopRequireWildcard(require("fs"));

var crypto = _interopRequireWildcard(require("crypto"));

var _path = _interopRequireDefault(require("path"));

var _accessEnv = _interopRequireDefault(require("./accessEnv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const DL_SESSION_FOLDER = (0, _accessEnv.default)("DL_SESSION_FOLDER", "opt/app/downloads"); // Makes an authenticated API request.

const createDownload = async (filePath, callback) => {
  try {
    // Check the existence of DL_SESSION_FOLDER
    if (!fs.existsSync(`../../${DL_SESSION_FOLDER}`)) return callback(new Error('Session directory does not exist')); // // Check the existence of the file
    // if (!fs.existsSync(filePath)) return callback(new Error('File doest not exist'));
    // Generate the download sid (session id)

    var downloadSid = crypto.createHash('md5').update(Math.random().toString()).digest('hex'); // Generate the download session filename

    var dlSessionFileName = _path.default.join(`../../${DL_SESSION_FOLDER}`, downloadSid + '.download'); // Write the link of the file to the download session file


    fs.writeFile(dlSessionFileName, filePath, function (err) {
      if (err) return callback(err); // If succeeded, return the new download sid
      // callback(null, downloadSid);

      callback(null, downloadSid);
    });
  } catch (err) {
    console.error('ERROR:', err);
  }
}; // Makes an authenticated API request.


exports.createDownload = createDownload;

const getFilePathDownload = async (downloadSid, callback) => {
  try {
    // Get the download session file name
    var dlSessionFileName = _path.default.join(DL_SESSION_FOLDER, downloadSid + '.download'); // Check if the download session exists


    if (!fs.existsSync(dlSessionFileName)) return callback(new Error('Download does not exist')); // Get the file path

    fs.readFile(dlSessionFileName, function (err, data) {
      if (err) return callback(err); // Return the file path

      callback(null, data);
    });
  } catch (err) {
    console.error('ERROR:', err);
  }
}; // Makes an authenticated API request.


exports.getFilePathDownload = getFilePathDownload;

const deleteDownload = async (downloadSid, callback) => {
  try {
    // Get the download session file name
    var dlSessionFileName = _path.default.join(DL_SESSION_FOLDER, downloadSid + '.download'); // Check if the download session exists


    if (!fs.existsSync(dlSessionFileName)) return callback(new Error('Download does not exist')); // Delete the download session

    fs.unlink(dlSessionFileName, function (err) {
      if (err) return callback(err); // Return success (no error)

      callback();
    });
  } catch (err) {
    console.error('ERROR:', err);
  }
};

exports.deleteDownload = deleteDownload;