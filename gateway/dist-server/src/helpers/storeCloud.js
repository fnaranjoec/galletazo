"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var fs = _interopRequireWildcard(require("fs"));

var _accessEnv = _interopRequireDefault(require("./accessEnv"));

var _sanitizeFilename = _interopRequireDefault(require("sanitize-filename"));

var _generateUUID = _interopRequireDefault(require("./generateUUID"));

var _path = _interopRequireDefault(require("path"));

var _fileManager = _interopRequireDefault(require("./fileManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const GCLOUD_PID = (0, _accessEnv.default)("GCLOUD_PID", "flexinvest");
const GCLOUD_KEY = (0, _accessEnv.default)("GCLOUD_KEY", "/opt/app/src/helpers/flexinvest-bcd3b3715fda.json");
const GCLOUD_BUCKET = (0, _accessEnv.default)("GCLOUD_BUCKET", "mm_main");
const GCLOUD_FOLDER = (0, _accessEnv.default)("GCLOUD_FOLDER", "convert_uploads");
const GCLOUD_FOLDER_PROFILES = (0, _accessEnv.default)("GCLOUD_FOLDER_PROFILES", "profile_uploads");
const LOCAL_FOLDER = (0, _accessEnv.default)("LOCAL_FOLDER", "opt/app/uploads");

const storeCloud = async ({
  file
}, isProfile = false) => {
  const {
    createReadStream,
    filename,
    mimetype
  } = await file;
  const filer = new _fileManager.default(); //Reemplazo (espacios, caracteres especiales) del nombre de archivo
  // var pureFilename= await filename.replace(/[^\x20-\x7E]/g, '').replace('(', '-').replace(')', '-').replace(/\s/g, '-');

  var pureFilename = await (0, _sanitizeFilename.default)(filename);
  const prefixedFileName = [Math.floor(+new Date() / 1000), pureFilename].join('_');

  const DESTINO_EN_GCLOUD = _path.default.join(!isProfile ? GCLOUD_FOLDER : GCLOUD_FOLDER_PROFILES, prefixedFileName);

  var uploaded = null;
  console.log("Antes de createReadStream");
  const readStream = createReadStream();
  console.log("Despues de createReadStream"); // Para escribir en disco
  // const ORIGEN_LOCAL = `/${LOCAL_FOLDER}/${prefixedFileName}`;
  // const writeStream = fs.createWriteStream(ORIGEN_LOCAL)
  // readStream.pipe(writeStream);
  // const status = await filer.gc_UploadFile(ORIGEN_LOCAL,DESTINO_EN_GCLOUD);    // Para subir un archivo local

  const status = await filer.gc_UploadFileStream(readStream, DESTINO_EN_GCLOUD); // Para subir un stream

  if (status == false) {
    console.log('Error, file doesn`t upload to google cloud bucket');
  } else {
    uploaded = {
      pureFilename,
      prefixedFileName,
      mimetype,
      DESTINO_EN_GCLOUD
    };
  }

  return uploaded;
};

var _default = storeCloud;
exports.default = _default;