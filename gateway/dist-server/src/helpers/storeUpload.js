"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _aws = _interopRequireDefault(require("aws4"));

var _config = _interopRequireDefault(require("./config"));

var fs = _interopRequireWildcard(require("fs"));

var https = _interopRequireWildcard(require("https"));

var _pump = _interopRequireDefault(require("pump"));

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

var _accessEnv = _interopRequireDefault(require("./accessEnv"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import generateUUID from "./generateUUID";
const S3_BUCKET_PATH = (0, _accessEnv.default)("S3_BUCKET_PATH", '/coupons');

const getSignatureKey = (key, dateStamp, regionName, serviceName) => {
  var kDate = _cryptoJs.default.HmacSHA256(dateStamp, "AWS4" + key);

  var kRegion = _cryptoJs.default.HmacSHA256(regionName, kDate);

  var kService = _cryptoJs.default.HmacSHA256(serviceName, kRegion);

  var kSigning = _cryptoJs.default.HmacSHA256("aws4_request", kService);

  return kSigning;
};

const putObject = async path => {
  const signature = await getSignatureKey(_config.default.secretAccessKey, new Date(), _config.default.region, 's3');

  const hash = _aws.default.sign({
    service: 's3',
    region: _config.default.region,
    method: 'PUT',
    acl: 'public',
    visibility: 'public',
    path: path,
    host: _config.default.endpoint,
    headers: {
      // 'Content-Type': 'application/octet-stream',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      'x-amz-acl': 'public-read',
      'Authorization': `AWS4-HMAC-SHA256 Credential=${_config.default.accessKeyId}/${new Date()}/${_config.default.region}/s3/aws4_request,SignedHeaders=host;x-amz-acl;x-amz-content-sha256;x-amz-date;x-amz-acl,Signature=${signature} `
    }
  }, _config.default);

  return https.request({
    hostname: _config.default.endpoint,
    port: 443,
    method: 'PUT',
    path: path,
    headers: hash.headers
  });
};

const storeUpload = async ({
  file
}, prefix_files) => {
  const {
    createReadStream,
    filename,
    mimetype
  } = await file;
  const S3_PROTOCOL_PATH = (0, _accessEnv.default)("S3_PROTOCOL_PATH", 'http://'); //Reemplazo (espacios, caracteres especiales) del nombre de archivo

  var pureFilename = await filename.replace(/[^\x20-\x7E]/g, '').replace('(', '-').replace(')', '-').replace(/\s/g, '-'); // *** S3 BUCKET

  const prefixedFileName = [prefix_files, pureFilename].join('-');
  const bucketFile = [S3_BUCKET_PATH, prefixedFileName].join('/'); // const path = `${upload_dir}/${filename}`;

  const path = `${S3_PROTOCOL_PATH}${_config.default.endpoint}${bucketFile}`;
  const uploaded = {
    pureFilename,
    mimetype,
    path
  }; // console.log('uploaded ==> ', uploaded);

  const stream = createReadStream();
  const ws = await putObject(bucketFile);
  (0, _pump.default)(stream, ws, () => {
    /* console.log('Object uploaded !' */
  }); // *** FILESYSTEM
  // // Store the file in the FILESYSTEM.
  // await new Promise((resolve, reject) => {
  //     // Create a stream to which the upload will be written.
  //     const writeStream = fs.createWriteStream(`${path}`);
  //
  //     // When the upload is fully written, resolve the promise.
  //     writeStream.on('finish', resolve);
  //
  //     // If there's an error writing the file, remove the partially written file
  //     // and reject the promise.
  //     writeStream.on('error', (error) => {
  //         fs.unlink(path, () => {
  //             reject(error);
  //         });
  //     });
  //
  //     // In node <= 13, errors are not automatically propagated between piped
  //     // streams. If there is an error receiving the upload, destroy the write
  //     // stream with the corresponding error.
  //     stream.on('error', (error) => writeStream.destroy(error));
  //
  //     // Pipe the upload into the write stream.
  //     stream.pipe(writeStream);
  // });
  // // Record the file metadata in the DB.
  // db.get('uploads').push(file).write();

  return uploaded; // return path;
};

var _default = storeUpload;
exports.default = _default;