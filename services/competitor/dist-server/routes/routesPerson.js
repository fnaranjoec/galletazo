"use strict";

var _express = _interopRequireDefault(require("express"));

var _models = require("../src/db/models");

var sequelize = _interopRequireWildcard(require("sequelize"));

var _accessEnv = _interopRequireDefault(require("../src/helpers/accessEnv"));

var _generateUUID = _interopRequireDefault(require("../src/helpers/generateUUID"));

var _hashPassword = _interopRequireDefault(require("../src/helpers/hashPassword"));

var _getWhere = _interopRequireDefault(require("../src/helpers/getWhere"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

const ENDPOINT_URI = (0, _accessEnv.default)("ENDPOINT_URI"); // ---------------------------------------------------- PERSON --------------------------------------------------------------
// *** FETCH ALL PERSON

router.post(`/all`, async (req, res, next) => {
  const filter = await (0, _getWhere.default)({
    filter: req.body.args.filter,
    status: "person_status"
  });

  try {
    const persons = await _models.PersonModel.findAndCountAll({
      order: [['person_created', 'desc']],
      attributes: {},
      where: filter
    });
    return res.json(persons);
  } catch (e) {
    // console.log("e==>",e);
    // return next(e);
    if (e.errors === undefined) {
      return next(new Error(e.parent.code)); // return next(new Error(e.parent.sqlMessage))
    } else {
      return next(new Error(e.errors[0].message));
    }
  }
}); // *** COUNT PERSON

router.get(`/count`, async (req, res, next) => {
  try {
    const persons = await _models.PersonModel.findAndCountAll();
    return res.json(persons);
  } catch (e) {
    // return next(e);
    // console.log("e==>", e);
    if (e.errors === undefined) {
      return next(new Error(e.parent.code)); // return next(new Error(e.parent.sqlMessage))
    } else {
      return next(new Error(e.errors[0].message));
    }
  }
}); // *** FETCH PERSON BY ID

router.get(`/:person_id`, async (req, res, next) => {
  try {
    const person = await _models.PersonModel.findOne({
      attributes: {},
      where: {
        person_id: req.params.person_id,
        [sequelize.Op.not]: [{
          person_status: "X"
        }]
      }
    });
    return res.json(person);
  } catch (e) {
    // return next(e);
    // console.log("e==>", e);
    if (e.errors === undefined) {
      return next(new Error(e.parent.code)); // return next(new Error(e.parent.sqlMessage))
    } else {
      return next(new Error(e.errors[0].message));
    }
  }
}); // *** POST PERSON

router.post(`/`, async (req, res, next) => {
  // console.log("req.body.args==>", req.body.args);
  // Valido el body si llega con todos los datos
  if (!req.body.args.country_id || !req.body.args.person_fname || !req.body.args.person_lname || !req.body.args.person_occupation || !req.body.args.person_bio || !req.body.args.person_city || !req.body.args.person_dob || !req.body.args.person_company || !req.body.args.person_website || !req.body.args.user_name || !req.body.args.user_display_name || !req.body.args.user_email || !req.body.args.user_password || !req.body.args.user_picture) {
    return next(new Error("Person data are incomplete!"));
  }

  try {
    // Obtengo el ROL
    const rolCustomer = await _models.ParameterModel.findOne({
      attributes: {},
      where: {
        parameter_name: "ROL_CUSTOMER"
      }
    }); // Creo ROW PERSON para ser guardado

    const person = await _models.PersonModel.create({
      person_id: (0, _generateUUID.default)(),
      country_id: req.body.args.country_id,
      person_fname: req.body.args.person_fname,
      person_lname: req.body.args.person_lname,
      person_occupation: req.body.args.person_occupation,
      person_bio: req.body.args.person_bio,
      person_city: req.body.args.person_city,
      person_dob: req.body.args.person_dob,
      person_company: req.body.args.person_company,
      person_website: req.body.args.person_website
    }); // Creo ROW USUARIO para ser guardado

    const user = await _models.UserModel.create({
      user_id: (0, _generateUUID.default)(),
      person_id: person.dataValues.person_id,
      user_name: req.body.args.user_name,
      user_display_name: req.body.args.user_display_name,
      user_email: req.body.args.user_email,
      user_password: (0, _hashPassword.default)(req.body.args.user_password),
      user_picture: req.body.args.user_picture,
      user_last_event_id: "0"
    }); // Creo Usuario Rol

    const userRol = await _models.UserRolModel.create({
      user_rol_id: (0, _generateUUID.default)(),
      user_id: user.dataValues.user_id,
      rol_id: rolCustomer.parameter_text
    });
    const customer = await _models.CustomerModel.create({
      customer_id: (0, _generateUUID.default)(),
      user_rol_id: userRol.dataValues.user_rol_id
    }); // Devuelvo nuevo person

    const newPerson = await _models.PersonModel.findOne({
      attributes: {},
      where: {
        person_id: person.person_id,
        [sequelize.Op.not]: [{
          person_status: "X"
        }]
      }
    });
    return res.json(newPerson);
  } catch (e) {
    console.log("e===>", e);

    if (e.errors === undefined) {
      return next(new Error(e.parent.code)); // return next(new Error(e.parent.sqlMessage))
    } else {
      return next(new Error(e.errors[0].message));
    }
  }

  return next({});
}); // *** PUT PERSON

router.put(`/:person_id`, async (req, res, next) => {
  console.log("req.body.args==>", req.body.args); // Valido el body si llega con el ID

  if (!req.params.person_id) {
    return next(new Error("Person ID is missing!"));
  } // Armo el JSON de Actualizacion solo con los campos que vienen


  var updateJSON = {};
  if (req.body.args.country_id) updateJSON['country_id'] = req.body.args.country_id;
  if (req.body.args.person_fname) updateJSON['person_fname'] = req.body.args.person_fname;
  if (req.body.args.person_lname) updateJSON['person_lname'] = req.body.args.person_lname;
  if (req.body.args.person_occupation) updateJSON['person_occupation'] = req.body.args.person_occupation;
  if (req.body.args.person_bio) updateJSON['person_bio'] = req.body.args.person_bio;
  if (req.body.args.person_city) updateJSON['person_city'] = req.body.args.person_city;
  if (req.body.args.person_dob) updateJSON['person_dob'] = req.body.args.person_dob;
  if (req.body.args.person_company) updateJSON['person_company'] = req.body.args.person_company;
  if (req.body.args.person_website) updateJSON['person_website'] = req.body.args.person_website;
  if (req.body.args.person_updated) updateJSON['person_updated'] = new Date();

  if ((0, _isEmpty.default)(updateJSON)) {
    return next(new Error("Nothing to update !"));
  }

  try {
    const [numberOfAffectedRows, affectedRows] = await _models.PersonModel.update(updateJSON, {
      where: {
        person_id: req.params.person_id,
        [sequelize.Op.not]: [{
          person_status: "X"
        }]
      },
      returning: true
    }); // Devuelvo media product actualizado

    const updatedPerson = await _models.PersonModel.findOne({
      attributes: {},
      where: {
        person_id: req.params.person_id,
        [sequelize.Op.not]: [{
          person_status: "X"
        }]
      }
    });
    if (!updatedPerson) return next(new Error("Invalid Person ID or Deleted"));
    return res.json(updatedPerson);
  } catch (e) {
    // return next(e);
    // console.log("e==>",e);
    if (e.errors === undefined) {
      return next(new Error(e.parent.code)); // return next(new Error(e.parent.sqlMessage))
    } else {
      return next(new Error(e.errors[0].message));
    }
  }
}); // *** DELETE PERSON

router.delete(`/:person_id`, async (req, res, next) => {
  // Valido el body si llega con el ID
  if (!req.params.person_id) {
    return next(new Error("Person ID is missing!"));
  }

  const deletedPerson = await _models.PersonModel.findOne({
    attributes: {},
    where: {
      person_id: req.params.person_id,
      [sequelize.Op.not]: [{
        person_status: "X"
      }]
    }
  });
  if (!deletedPerson) return next(new Error("Invalid Person ID or Deleted")); // VERIFICO QUE NO USUARIO GENERADOS

  const user = await _models.UserModel.findAll({
    attributes: {},
    where: {
      person_id: req.params.person_id,
      [sequelize.Op.not]: [{
        user_status: "X"
      }]
    }
  });
  if (!(0, _isEmpty.default)(user)) return next(new Error("Person has generated a competitor, can't delete it  !!!"));

  try {
    // Actualizo estado con X
    const [numberOfAffectedRows, affectedRows] = await _models.PersonModel.update({
      person_status: "X"
    }, {
      where: {
        person_id: req.params.person_id,
        [sequelize.Op.not]: [{
          person_status: "X"
        }]
      },
      returning: true // plain: true,

    }); // Devuelvo media product eliminado

    if (affectedRows == 0) return next(new Error("Invalid Person ID or Deleted")); // return res.end();

    return res.json(true);
  } catch (e) {
    // return next(e);
    if (e.errors === undefined) {
      return next(new Error(e.parent.code)); // return next(new Error(e.parent.sqlMessage))
    } else {
      return next(new Error(e.errors[0].message));
    }
  }
});
module.exports = router;