"use strict";

var _models = require("../src/db/models");

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _downloadCloud = _interopRequireDefault(require("../src/helpers/downloadCloud"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router(); // *** FETCH CUSTOMER GALLERY ITEM REQUEST BINARY CONTENT BY SID
// /downloads/views/:customer_conversion_output_file_request_sid


router.get('/views/:customer_conversion_output_file_request_sid', async (req, res, next) => {
  try {
    //Obtengo el output request
    const outputRequest = await _models.CustomerConversionOutputRequestViewModel.findOne({
      attributes: {},
      where: {
        customer_conversion_output_file_request_sid: req.params.customer_conversion_output_file_request_sid
      }
    }); // Verifico si existe el output request

    if ((0, _isEmpty.default)(outputRequest)) {
      res.writeHead(500, {
        "Content-Type": "text/plain"
      });
      res.write("File doesn't exists on system." + "\n");
      res.end();
      return;
    }

    const filePath = outputRequest.customer_conversion_output_file_url;
    const fileName = filePath.split("/")[2];

    const fileDestination = _path.default.join('/tmp/downloads', fileName);

    const destinationFolder = _path.default.normalize('/tmp/downloads'); // Download al disco local


    const responseDownload = await (0, _downloadCloud.default)({
      filePath: filePath,
      destinationFolder: destinationFolder,
      filename: fileName
    });

    if (responseDownload) {
      // Si lo bajo CORRECTAMENTE lo envio al browser cliente
      // setTimeout(async ()=>{
      // },3000);
      var file = _fs.default.readFileSync(fileDestination, 'binary');

      if (!file) {
        res.writeHead(500, {
          "Content-Type": "text/plain"
        });
        res.write(err + "\n");
        res.end();
        return;
      }

      res.setHeader('Cache-Control', 'must-revalidate');
      res.setHeader('Pragma', 'public');
      res.setHeader('Content-Length', file.length); // console.log("outputRequest.customer_conversion_output_file_type==>", outputRequest.customer_conversion_output_file_type);

      if (outputRequest.customer_conversion_output_file_type == "FBX") {
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename=${outputRequest.customer_conversion_output_file_url.split("/")[2]}`);
        res.write(file, 'binary');
        res.end(); // Elimino el archivo del disco

        _fs.default.unlinkSync(fileDestination, 'binary'); // Destroy output request


        const outputRequesDestroy = await _models.CustomerConversionOutputRequestModel.destroy({
          where: {
            customer_conversion_output_file_request_sid: req.params.customer_conversion_output_file_request_sid
          }
        });
      } else if (outputRequest.customer_conversion_output_file_type == "GLTF") {
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename=${outputRequest.customer_conversion_output_file_url.split("/")[2]}`);
        res.write(file, 'binary');
        res.end(); // Elimino el archivo del disco

        _fs.default.unlinkSync(fileDestination, 'binary'); // Destroy output request


        const outputRequesDestroy = await _models.CustomerConversionOutputRequestModel.destroy({
          where: {
            customer_conversion_output_file_request_sid: req.params.customer_conversion_output_file_request_sid
          }
        });
      } else if (outputRequest.customer_conversion_output_file_type == "USDZ") {
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename=${outputRequest.customer_conversion_output_file_url.split("/")[2]}`);
        res.write(file, 'binary');
        res.end(); // Elimino el archivo del disco

        _fs.default.unlinkSync(fileDestination, 'binary'); // Destroy output request   --------------------------------------------------------------------- FOR NOW THE OUTPUT IS NOT DESTROYED SINCE USDZ FILE CAN BE REQUESTED MULTIPLE TIMES IN ONE PAGE CALL
        // const outputRequesDestroy = await CustomerConversionOutputRequestModel.destroy({
        //     where: {
        //         customer_conversion_output_file_request_sid: req.params.customer_conversion_output_file_request_sid,
        //     }
        // });

      } else if (outputRequest.customer_conversion_output_file_type == "IMAGE_PNG") {
        res.setHeader('Content-Type', 'image/png');
        res.write(file, 'binary');
        res.end();
      } else if (outputRequest.customer_conversion_output_file_type == "VIDEO_WEBM") {
        res.setHeader('Content-Type', 'video/webm');
        res.write(file, 'binary');
        res.end();
      } else {
        res.setHeader('Content-Type', 'application/binary');
        res.setHeader('Content-Disposition', `attachment; filename=${outputRequest.customer_conversion_output_file_url.split("/")[2]}`);
        res.write(file, 'binary');
        res.end(); // Elimino el archivo del disco

        _fs.default.unlinkSync(fileDestination, 'binary'); // Destroy output request


        const outputRequesDestroy = await _models.CustomerConversionOutputRequestModel.destroy({
          where: {
            customer_conversion_output_file_request_sid: req.params.customer_conversion_output_file_request_sid
          }
        });
      }
    } else {
      // Si NO EXISTE
      // return next(new Error("File doesn't exists on bucket."));
      res.writeHead(500, {
        "Content-Type": "text/plain"
      });
      res.write("File doesn't exists on storage." + "\n");
      res.end();
      return;
    }
  } catch (e) {
    // return next(e);
    console.log("e==>", e);

    if (e.errors === undefined) {
      return next(new Error(e.parent.code)); // return next(new Error(e.parent.sqlMessage))
    } else {
      return next(new Error(e.errors[0].message));
    }
  }
});
module.exports = router;