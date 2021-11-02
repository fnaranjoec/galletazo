"use strict";

var _express = _interopRequireDefault(require("express"));

var _parameter = require("../src/db/models/parameter");

var _competitor_refill = require("../src/db/models/competitor_refill");

var sequelize = _interopRequireWildcard(require("sequelize"));

var _connectiondb = _interopRequireDefault(require("../src/db/connectiondb"));

var _accessEnv = _interopRequireDefault(require("../src/helpers/accessEnv"));

var _generateUUID = _interopRequireDefault(require("../src/helpers/generateUUID"));

var _getWhere = _interopRequireDefault(require("../src/helpers/getWhere"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

// import hashPassword from "#root/helpers/hashPassword";
// import path from "path";
// import axios from"axios";
const ENDPOINT_URI = (0, _accessEnv.default)("ENDPOINT_URI");

const CircularJSON = require('circular-json'); // ---------------------------------------------------- COMPETITOR-REFILL --------------------------------------------------------------
// *** FETCH ALL


router.post(`/all`, async (req, res, next) => {
  const filter = await (0, _getWhere.default)({
    filter: req.body.args.filter,
    status: "competitor_refill_status"
  });

  try {
    const competitorsRefill = await _competitor_refill.CompetitorRefillModel.findAndCountAll({
      order: [['competitor_refill_created', 'asc']],
      attributes: {},
      where: filter
    });
    return res.json(competitorsRefill);
  } catch (e) {
    // Error Handling
    switch (e.name) {
      case "SequelizeUniqueConstraintError":
        return next({
          message: `Constraint Error: ${e.errors[0].message.replace(/"/g, "'")}`
        });
        break;

      case "SequelizeDatabaseError":
        return next({
          message: `Database Error: ${e.parent.sqlMessage.replace(/"/g, "'")}`
        });
        break;

      default:
        return next({
          message: `Unknown error: ${e.message.replace(/"/g, "'")}`
        });
    }
  }
}); // *** COUNT

router.get(`/count`, async (req, res, next) => {
  try {
    const competitorsRefill = await _competitor_refill.CompetitorRefillModel.findAndCountAll();
    return res.json(competitorsRefill);
  } catch (e) {
    // Error Handling
    switch (e.name) {
      case "SequelizeUniqueConstraintError":
        return next({
          message: `Constraint Error: ${e.errors[0].message.replace(/"/g, "'")}`
        });
        break;

      case "SequelizeDatabaseError":
        return next({
          message: `Database Error: ${e.parent.sqlMessage.replace(/"/g, "'")}`
        });
        break;

      default:
        return next({
          message: `Unknown error: ${e.message.replace(/"/g, "'")}`
        });
    }
  }
}); // FETCH BY ID

router.get(`/:competitor_refill_id`, async (req, res, next) => {
  try {
    var competitor = await _competitor_refill.CompetitorRefillModel.findOne({
      attributes: {},
      where: {
        competitor_refill_id: req.params.competitor_refill_id,
        [sequelize.Op.not]: [{
          competitor_refill_status: "X"
        }]
      }
    });
    return res.json(competitor);
  } catch (e) {
    // Error Handling
    switch (e.name) {
      case "SequelizeUniqueConstraintError":
        return next({
          message: `Constraint Error: ${e.errors[0].message.replace(/"/g, "'")}`
        });
        break;

      case "SequelizeDatabaseError":
        return next({
          message: `Database Error: ${e.parent.sqlMessage.replace(/"/g, "'")}`
        });
        break;

      default:
        return next({
          message: `Unknown error: ${e.message.replace(/"/g, "'")}`
        });
    }
  }
}); // *** CREATE

router.post(`/`, async (req, res, next) => {
  // console.log("req.body.args-->", req.body.args);
  if (!req.body.args.competitor_id || !req.body.args.competitor_refill_phone || !req.body.args.competitor_refill_company || !req.body.args.competitor_refill_value) {
    return next(new Error("Data are incomplete!"));
  }

  try {
    // // // Obtengo el PARAMETRO URL_HOST
    // // const urlHostParameter = await ParameterModel.findOne({
    // //     attributes: {},
    // //     where: {parameter_name: "URL_HOST"}
    // // });
    //
    // // Verifico si ya existe o no
    // const oldCompetitor = await CompetitorModel.findOne({
    //     attributes: {},
    //     where: {
    //         competitor_id: req.body.args.competitor_id,
    //         // [sequelize.Op.not] : [{competitor_refill_status: "X"}]
    //     }
    // });
    //
    // if (oldCompetitor) {
    //     return res.json({oldCompetitor}) ;
    // };
    var newJSON = {};
    console.log(`args-->${JSON.stringify(req.body.args)}`);
    newJSON['competitor_refill_id'] = (0, _generateUUID.default)();
    if (req.body.args.competitor_id) newJSON['competitor_id'] = req.body.args.competitor_id;
    if (req.body.args.competitor_refill_phone) newJSON['competitor_refill_phone'] = req.body.args.competitor_refill_phone;
    if (req.body.args.competitor_refill_company) newJSON['competitor_refill_company'] = req.body.args.competitor_refill_company;
    if (req.body.args.competitor_refill_value) newJSON['competitor_refill_value'] = req.body.args.competitor_refill_value; // console.log("newJSON=>", newJSON);

    if ((0, _isEmpty.default)(newJSON)) {
      return next(new Error("Nothing to create !"));
    }

    const newCompetitorRefill = await _competitor_refill.CompetitorRefillModel.create(newJSON); // console.log("newCompetitorRefill=>", newCompetitorRefill);

    return res.json({
      newCompetitorRefill
    });
  } catch (e) {
    // Error Handling
    console.log("e->", e);

    switch (e.name) {
      case "SequelizeUniqueConstraintError":
        return next({
          message: `Constraint Error: ${e.errors[0].message.replace(/"/g, "'")}`
        });
        break;

      case "SequelizeDatabaseError":
        return next({
          message: `Database Error: ${e.parent.sqlMessage.replace(/"/g, "'")}`
        });
        break;

      default:
        return next({
          message: `Unknown error: ${e.message.replace(/"/g, "'")}`
        });
    }
  }
}); // *** UPDATE

router.put(`/:competitor_refill_id`, async (req, res, next) => {
  // console.log("req.body.args==>", req.body.args);
  // Valido el body si llega con el ID
  if (!req.params.competitor_refill_id) {
    return next(new Error("ID is missing!"));
  } // Armo el JSON de Actualizacion solo con los campos que vienen


  var updateJSON = {};
  if (req.body.args.competitor_refill_phone) updateJSON['competitor_refill_phone'] = req.body.args.competitor_refill_phone;
  if (req.body.args.competitor_refill_company) updateJSON['competitor_refill_company'] = req.body.args.competitor_refill_company;
  if (req.body.args.competitor_refill_value) updateJSON['competitor_refill_value'] = req.body.args.competitor_refill_value;

  if ((0, _isEmpty.default)(updateJSON)) {
    return next(new Error("Nothing to update !"));
  }

  try {
    const [numberOfAffectedRows, affectedRows] = await _competitor_refill.CompetitorRefillModel.update(updateJSON, {
      where: {
        competitor_refill_id: req.params.competitor_refill_id,
        [sequelize.Op.not]: [{
          competitor_refill_status: "X"
        }]
      },
      returning: true
    }); // Devuelvo row actualizado

    const updatedCompetitorRefill = await _competitor_refill.CompetitorRefillModel.findOne({
      attributes: {},
      where: {
        competitor_refill_id: req.params.competitor_refill_id,
        [sequelize.Op.not]: [{
          competitor_refill_status: "X"
        }]
      }
    });
    if (!updatedCompetitorRefill) return next(new Error("Invalid ID or Deleted"));
    return res.json(updatedCompetitorRefill);
  } catch (e) {
    // Error Handling
    switch (e.name) {
      case "SequelizeUniqueConstraintError":
        return next({
          message: `Constraint Error: ${e.errors[0].message.replace(/"/g, "'")}`
        });
        break;

      case "SequelizeDatabaseError":
        return next({
          message: `Database Error: ${e.parent.sqlMessage.replace(/"/g, "'")}`
        });
        break;

      default:
        return next({
          message: `Unknown error: ${e.message.replace(/"/g, "'")}`
        });
    }
  }
}); // *** DELETE

router.delete(`/:competitor_refill_id`, async (req, res, next) => {
  // Valido el body si llega con el ID
  if (!req.params.competitor_refill_id) {
    return next(new Error("ID is missing!"));
  }

  const deletedCompetitorRefill = await _competitor_refill.CompetitorRefillModel.findOne({
    attributes: {},
    where: {
      competitor_refill_id: req.params.competitor_refill_id,
      [sequelize.Op.not]: [{
        competitor_refill_status: "X"
      }]
    }
  }); // console.log("deletedCompetitorRefill==>", deletedCompetitorRefill);

  if (!deletedCompetitorRefill) return next(new Error("Invalid ID or Deleted"));

  try {
    // // Actualizo estado con X
    // const [numberOfAffectedRows, affectedRows] = await CompetitorModel.update({
    //     competitor_refill_status: "X",
    // },{
    //     where: {
    //         competitor_refill_id: req.params.competitor_refill_id,
    //         [sequelize.Op.not] : [{competitor_refill_status: "X"}]
    //     },
    //     returning: true,
    //     // plain: true,
    // });
    // // Devuelvo media product eliminado
    // if (affectedRows==0) return next(new Error("Invalid User ID or Deleted"));
    // Borrado fisico
    await deletedCompetitorRefill.destroy(); // return res.end();

    return res.json(true);
  } catch (e) {
    // Error Handling
    switch (e.name) {
      case "SequelizeUniqueConstraintError":
        return next({
          message: `Constraint Error: ${e.errors[0].message.replace(/"/g, "'")}`
        });
        break;

      case "SequelizeDatabaseError":
        return next({
          message: `Database Error: ${e.parent.sqlMessage.replace(/"/g, "'")}`
        });
        break;

      default:
        return next({
          message: `Unknown error: ${e.message.replace(/"/g, "'")}`
        });
    }
  }
});
module.exports = router;