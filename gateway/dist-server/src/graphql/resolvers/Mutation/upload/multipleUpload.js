"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// import MediasService from "#root/adapters/MediasService";
const multipleUploadResolver = async (parent, {
  files
}, {
  storeUpload
}) => {
  const results = await Promise.allSettled(files.map(storeUpload));
  return results.reduce((storedFiles, {
    value,
    reason
  }) => {
    if (value) storedFiles.push(value); // Realistically you would do more than just log an error.
    else console.error(`Failed to store upload: ${reason}`);
    return storedFiles;
  }, []);
};

var _default = multipleUploadResolver;
exports.default = _default;