"use strict";

var _express = _interopRequireDefault(require("express"));

var _models = require("../src/db/models");

var sequelize = _interopRequireWildcard(require("sequelize"));

var _accessEnv = _interopRequireDefault(require("../src/helpers/accessEnv"));

var _generateUUID = _interopRequireDefault(require("../src/helpers/generateUUID"));

var _hashPassword = _interopRequireDefault(require("../src/helpers/hashPassword"));

var _getWhere = _interopRequireDefault(require("../src/helpers/getWhere"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _path = _interopRequireDefault(require("path"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

const ENDPOINT_URI = (0, _accessEnv.default)("ENDPOINT_URI"); // ---------------------------------------------------- PARAMETER --------------------------------------------------------------
// *** FETCH ALL PARAMETER

router.post(`/all`, async (req, res, next) => {
  const filter = await (0, _getWhere.default)({
    filter: req.body.args.filter,
    status: ""
  });

  try {
    const users = await _models.ParameterModel.findAndCountAll({
      order: [['parameter_created', 'desc']],
      attributes: {},
      where: filter
    });
    return res.json(users);
  } catch (e) {
    // console.log("e==>",e);
    // return next(e);
    if (e.errors === undefined) {
      return next(new Error(e.parent.code)); // return next(new Error(e.parent.sqlMessage))
    } else {
      return next(new Error(e.errors[0].message));
    }
  }
}); // *** COUNT PARAMETER

router.get(`/count`, async (req, res, next) => {
  try {
    const parameteres = await _models.ParameterModel.findAndCountAll();
    return res.json(parameteres);
  } catch (e) {
    // return next(e);
    // console.log("e==>", e);
    if (e.errors === undefined) {
      return next(new Error(e.parent.code)); // return next(new Error(e.parent.sqlMessage))
    } else {
      return next(new Error(e.errors[0].message));
    }
  }
}); // *** FETCH PARAMETER BY ID

router.get(`/:parameter_name`, async (req, res, next) => {
  try {
    var parameter = await _models.ParameterModel.findOne({
      attributes: {},
      where: {
        parameter_id: req.params.parameter_name // [sequelize.Op.not] : [{parameter_status: "X"}]

      }
    });
    return res.json(parameter);
  } catch (e) {
    // return next(e);
    // console.log("e==>", e);
    if (e.errors === undefined) {
      return next(new Error(e.parent.code)); // return next(new Error(e.parent.sqlMessage))
    } else {
      return next(new Error(e.errors[0].message));
    }
  }
}); // // *** POST PARAMETER
// router.post(`/`, async(req, res, next) => {
//
//     // Valido el body si llega con todos los datos
//     if (
//         !req.body.args.parameter_name ||
//         !req.body.args.parameter_desc ||
//         !req.body.args.parameter_text ||
//         !req.body.args.parameter_value
//     ) {
//         return next (new Error("Parameter data are incomplete!"));
//     }
//
//
//     try {
//
//
//         var newJSON = {};
//
//         newJSON['parameter_id']=generateUUID();
//         if (req.body.args.parameter_name) newJSON['parameter_name'] = req.body.args.parameter_name;
//         if (req.body.args.parameter_desc) newJSON['parameter_desc'] = req.body.args.parameter_desc;
//         if (req.body.args.parameter_text) newJSON['parameter_text'] = req.body.args.parameter_text;
//         if (req.body.args.parameter_value) newJSON['parameter_value'] = req.body.args.parameter_value;
//
//         if (isEmpty(newJSON)) {
//             return next (new Error("Nothing to create !"));
//         }
//
//         // Creo ROW USUARIO para ser guardado
//         const newParameter = await ParameterModel.create(newJSON);
//
//         // Return URL to share
//         return res.json(newParameter) ;
//
//     } catch(e) {
//
//         // console.log("e===>", e);
//         if (e.errors===undefined) {
//             return next(new Error(e.parent.code))
//             // return next(new Error(e.parent.sqlMessage))
//         } else {
//             return next(new Error(e.errors[0].message))
//         }
//
//     }
//
//     return next({});
//
//
// });
// *** PUT PARAMETER

router.put(`/:parameter_name`, async (req, res, next) => {
  // Valido el body si llega con el ID
  if (!req.params.parameter_name) {
    return next(new Error("Parameter NAME is missing!"));
  } // Armo el JSON de Actualizacion solo con los campos que vienen


  var updateJSON = {};
  if (req.body.args.parameter_name) updateJSON['parameter_name'] = req.body.args.parameter_name;
  if (req.body.args.parameter_desc) updateJSON['parameter_desc'] = req.body.args.parameter_desc;
  if (req.body.args.parameter_text) updateJSON['parameter_text'] = req.body.args.parameter_text;
  if (req.body.args.parameter_value) updateJSON['parameter_value'] = req.body.args.parameter_value;

  if ((0, _isEmpty.default)(updateJSON)) {
    return next(new Error("Nothing to update !"));
  }

  try {
    const [numberOfAffectedRows, affectedRows] = await _models.ParameterModel.update(updateJSON, {
      where: {
        parameter_name: req.params.parameter_name // [sequelize.Op.not] : [{parameter_status: "X"}]

      },
      returning: true
    }); // Devuelvo media product actualizado

    const updatedParameter = await _models.ParameterModel.findOne({
      attributes: {},
      where: {
        parameter_name: req.params.parameter_name // [sequelize.Op.not] : [{parameter_status: "X"}]

      }
    });
    if (!updatedParameter) return next(new Error("Invalid Parameter NAME or Deleted"));
    return res.json(updatedParameter);
  } catch (e) {
    // return next(e);
    // console.log("e==>",e);
    if (e.errors === undefined) {
      return next(new Error(e.parent.code)); // return next(new Error(e.parent.sqlMessage))
    } else {
      return next(new Error(e.errors[0].message));
    }
  }
}); // // *** DELETE PARAMETER
// router.delete(`/:parameter_id`, async(req, res, next) => {
//
//     // Valido el body si llega con el ID
//     if (!req.params.parameter_id) {
//         return next (new Error("User ID is missing!"));
//     }
//
//     const deletedUser = await ParameterModel.findOne({
//         attributes: {},
//         where: {
//             parameter_id: req.params.parameter_id,
//             [sequelize.Op.not] : [{parameter_status: "X"}]
//         }
//     });
//
//     // console.log("deletedUser==>", deletedUser);
//
//     if (!deletedUser) return next(new Error("Invalid Parameter ID or Deleted"));
//
//
//     try {
//
//         // Actualizo estado con X
//         const [numberOfAffectedRows, affectedRows] = await ParameterModel.update({
//             parameter_status: "X",
//         },{
//             where: {
//                 parameter_id: req.params.parameter_id,
//                 [sequelize.Op.not] : [{parameter_status: "X"}]
//             },
//             returning: true,
//             // plain: true,
//         });
//
//         // Devuelvo media product eliminado
//         if (affectedRows==0) return next(new Error("Invalid User ID or Deleted"));
//         // return res.end();
//         return res.json(true);
//
//
//     } catch(e) {
//         // return next(e);
//         if (e.errors===undefined) {
//             return next(new Error(e.parent.code))
//             // return next(new Error(e.parent.sqlMessage))
//         } else {
//             return next(new Error(e.errors[0].message))
//         }
//
//     }
//
//
// });

module.exports = router;