"use strict";

var _express = _interopRequireDefault(require("express"));

var _models = require("../src/db/models");

var sequelize = _interopRequireWildcard(require("sequelize"));

var _accessEnv = _interopRequireDefault(require("../src/helpers/accessEnv"));

var _generateUUID = _interopRequireDefault(require("../src/helpers/generateUUID"));

var _hashPassword = _interopRequireDefault(require("../src/helpers/hashPassword"));

var _getWhere = _interopRequireDefault(require("../src/helpers/getWhere"));

var _passwordCompareSync = _interopRequireDefault(require("../src/helpers/passwordCompareSync"));

var _bull = _interopRequireDefault(require("bull"));

var _dateFns = require("date-fns");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

const ENDPOINT_URI = (0, _accessEnv.default)("ENDPOINT_URI");
const USER_SESSION_EXPIRY_HOURS = (0, _accessEnv.default)("USER_SESSION_EXPIRY_HOURS"); // *************************************************************************** GET ONE SESSION BY ID INFO ***

router.get(`/:session_id`, async (req, res, next) => {
  // Valido el body si llega con el ID
  if (!req.params.session_id) {
    return next(new Error("Session ID is missing!"));
  }

  try {
    // const userSession = await UserSessionModel.findByPk(req.params.session_id);
    // return res.json(userSession);
    // Si ya tiene un token activo
    const lastUserSession = await _models.UserSessionModel.findOne({
      attributes: {},
      where: {
        session_id: req.params.session_id,
        [sequelize.Op.not]: [{
          session_status: "X"
        }]
      }
    });
    return res.json(lastUserSession);
  } catch (e) {
    // return next(e);
    if (e.errors === undefined) {
      return next(new Error(e.parent.code)); // return next(new Error(e.parent.sqlMessage))
    } else {
      return next(new Error(e.errors[0].message));
    }
  }
}); // *************************************************************************** POST SESSIONS (CREATE SESSION) ***

router.post(`/`, async (req, res, next) => {
  // console.log("req.body.args==>", req.body.args);
  // Valido el body si llega con todos los datos
  if (!req.body.args.user_email || !req.body.args.user_password) {
    return next(new Error("Invalid Email or Password!"));
  }

  try {
    const user = await _models.UserModel.findOne({
      attributes: {},
      where: {
        user_email: req.body.args.user_email,
        [sequelize.Op.not]: [{
          user_status: "X"
        }]
      }
    }); // Si no encontro usuario con email enviado

    if (!user) return next(new Error("Invalid email!")); // Si la clave no concuerda

    if (!(0, _passwordCompareSync.default)(req.body.args.user_password, user.user_password)) {
      return next(new Error("Incorrect password!"));
    } // Si ya tiene un token activo


    const lastUserSession = await _models.UserSessionModel.findOne({
      attributes: {},
      where: {
        user_id: user.user_id,
        [sequelize.Op.not]: [{
          session_status: "X"
        }]
      }
    });
    if (lastUserSession !== null) return next(new Error("Has token active yet!")); // Genero Token

    const expiresAt = (0, _dateFns.addHours)(new Date(), USER_SESSION_EXPIRY_HOURS);
    const sessionToken = (0, _generateUUID.default)();
    const userSession = await _models.UserSessionModel.create({
      session_id: sessionToken,
      user_id: user.user_id,
      session_access_token: sessionToken,
      session_refresh_token: sessionToken // session_expire: expiresAt,

    });
    return res.json(userSession);
  } catch (e) {
    // console.log(e)
    // return next(e);
    if (e.errors === undefined) {
      return next(new Error(e.parent.code)); // return next(new Error(e.parent.sqlMessage))
    } else {
      return next(new Error(e.errors[0].message));
    }
  }
}); // *************************************************************************** PUT SESSIONS (UPDATE SESSION) ***

router.put(`/:session_id`, async (req, res, next) => {
  if (!req.params.session_id) {
    return next(new Error("Session Id is missing!"));
  } // Valido el body si llega con todos los datos


  if (!req.body.session_access_token || !req.body.session_refresh_token) {
    return next(new Error("Tokens are missing!"));
  }

  try {
    var updateJSON = {};
    updateJSON['session_access_token'] = req.body.session_access_token;
    updateJSON['session_refresh_token'] = req.body.session_refresh_token; // Actualizo session

    const [numberOfAffectedRows, affectedRows] = await _models.UserSessionModel.update(updateJSON, {
      where: {
        session_id: req.params.session_id,
        [sequelize.Op.not]: [{
          session_status: "X"
        }]
      },
      returning: true // plain: true,

    }); // Devuelvo customer actualizado

    const updatedSession = await _models.UserSessionModel.findOne({
      attributes: {},
      where: {
        session_id: req.params.session_id,
        [sequelize.Op.not]: [{
          session_status: "X"
        }]
      }
    }); // Devuelvo producto eliminado

    if (affectedRows === 0) return new Error("Session id is invalid!");
    return res.json(updatedSession);
  } catch (e) {
    // console.log(e)
    // return next(e);
    if (e.errors === undefined) {
      return next(new Error(e.parent.code)); // return next(new Error(e.parent.sqlMessage))
    } else {
      return next(new Error(e.errors[0].message));
    }
  }
}); // *************************************************************************** DELETE SESSIONS (DELETE SESSION) ***

router.delete(`/:session_id`, async (req, res, next) => {
  // Valido el body si llega con el ID
  if (!req.params.session_id) {
    return next(new Error("Session ID is missing!"));
  }

  try {
    // BORRADO LOGICO
    var updateJSON = {};
    updateJSON['session_status'] = "X";
    updateJSON['session_expire'] = new Date(); // Actualizo session

    const [numberOfAffectedRows, affectedRows] = await _models.UserSessionModel.update(updateJSON, {
      where: {
        session_id: req.params.session_id,
        [sequelize.Op.not]: [{
          session_status: "X"
        }]
      },
      returning: true // plain: true,

    }); // Devuelvo customer actualizado

    const updatedSession = await _models.UserSessionModel.findOne({
      attributes: {},
      where: {
        session_id: req.params.session_id,
        [sequelize.Op.not]: [{
          session_status: "X"
        }]
      }
    }); // Devuelvo producto eliminado

    if (affectedRows === 0) return res.json(false);
    return res.json(true); // // BORRADO FISICO de la session
    // const userSession = await UserSessionModel.findByPk(req.params.session_id);
    // if (!userSession) return next(new Error("Invalid session ID"));
    // await userSession.destroy();
    // return res.end();
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