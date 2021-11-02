import express from 'express';
var router = express.Router();

import {
    UserModel,
    UserSessionModel,
    ParameterModel,
    MessageModel,
    RolModel,
    RolUserModel,
    CustomerModel,
    OperatorModel,
} from "#root/db/models";

import * as sequelize from "sequelize";

import accessEnv from "#root/helpers/accessEnv";
import generateUUID from "#root/helpers/generateUUID";
import hashPassword from "#root/helpers/hashPassword";
import getWhere from "#root/helpers/getWhere";
import passwordCompareSync from "#root/helpers/passwordCompareSync";


// import * as rabbit from "#root/rabbit";

import Queue from 'bull';

import { addHours } from "date-fns";

    
    const ENDPOINT_URI = accessEnv("ENDPOINT_URI");
    const USER_SESSION_EXPIRY_HOURS = accessEnv("USER_SESSION_EXPIRY_HOURS");


// *************************************************************************** GET ONE SESSION BY ID INFO ***
    router.get( `/:session_id` , async(req, res, next) => {

        // Valido el body si llega con el ID
        if (!req.params.session_id) {
            return next (new Error("Session ID is missing!"));
        }

        try{

            // const userSession = await UserSessionModel.findByPk(req.params.session_id);
            // return res.json(userSession);

            // Si ya tiene un token activo
            const lastUserSession = await UserSessionModel.findOne({
                attributes: {},
                where: {
                    session_id: req.params.session_id,
                    [sequelize.Op.not] : [{session_status: "X"}]
                }
            });

            return res.json(lastUserSession);
        }
        catch(e){
            // return next(e);
            if (e.errors===undefined) {
                return next(new Error(e.parent.code))
                // return next(new Error(e.parent.sqlMessage))
            } else {
                return next(new Error(e.errors[0].message))
            }
        }

    });


// *************************************************************************** POST SESSIONS (CREATE SESSION) ***
    router.post(`/`, async(req, res, next) => {

        // console.log("req.body.args==>", req.body.args);

        // Valido el body si llega con todos los datos
        if (!req.body.args.user_email || !req.body.args.user_password ) {
            return next (new Error("Invalid Email or Password!"));
        }

        try {
            const user = await UserModel.findOne({
                attributes: {},
                where: {
                    user_email: req.body.args.user_email,
                    [sequelize.Op.not] : [{user_status: "X"}]
                }
            });


            // Si no encontro usuario con email enviado
            if (!user) return next(new Error("Invalid email!"));

            // Si la clave no concuerda
            if (!passwordCompareSync(req.body.args.user_password, user.user_password)) {
                return next(new Error("Incorrect password!"));
            }


            // Si ya tiene un token activo
            const lastUserSession = await UserSessionModel.findOne({
                attributes: {},
                where: {
                    user_id: user.user_id,
                    [sequelize.Op.not] : [{session_status: "X"}]
                }
            });


            if (lastUserSession !== null) return next(new Error("Has token active yet!"));


            // Genero Token
            const expiresAt = addHours(new Date(), USER_SESSION_EXPIRY_HOURS);
            const sessionToken = generateUUID();
            const userSession = await UserSessionModel.create({
                session_id: sessionToken,
                user_id: user.user_id,
                session_access_token: sessionToken,
                session_refresh_token: sessionToken,
                // session_expire: expiresAt,
            });

            return res.json(userSession);

        } catch(e) {
            // console.log(e)
            // return next(e);
            if (e.errors===undefined) {
                return next(new Error(e.parent.code))
                // return next(new Error(e.parent.sqlMessage))
            } else {
                return next(new Error(e.errors[0].message))
            }

        }



    });


// *************************************************************************** PUT SESSIONS (UPDATE SESSION) ***
    router.put(`/:session_id`, async(req, res, next) => {

        if (!req.params.session_id){
            return next (new Error("Session Id is missing!"));
        }

        // Valido el body si llega con todos los datos
        if (!req.body.session_access_token || !req.body.session_refresh_token ) {
            return next (new Error("Tokens are missing!"));
        }

        try {

            var updateJSON = {};
            updateJSON['session_access_token'] = req.body.session_access_token;
            updateJSON['session_refresh_token'] = req.body.session_refresh_token;


            // Actualizo session
            const [numberOfAffectedRows, affectedRows] = await UserSessionModel.update(updateJSON,
                {
                    where: {
                        session_id: req.params.session_id,
                        [sequelize.Op.not] : [{session_status: "X"}]
                    },
                    returning: true,
                    // plain: true,
                });

            // Devuelvo customer actualizado
            const updatedSession = await UserSessionModel.findOne({
                attributes: {},
                where: {
                    session_id: req.params.session_id,
                    [sequelize.Op.not] : [{session_status: "X"}]
                }
            });


            // Devuelvo producto eliminado
            if (affectedRows===0) return new Error("Session id is invalid!");

            return res.json(updatedSession);


        } catch(e) {
            // console.log(e)
            // return next(e);
            if (e.errors===undefined) {
                return next(new Error(e.parent.code))
                // return next(new Error(e.parent.sqlMessage))
            } else {
                return next(new Error(e.errors[0].message))
            }

        }



    });


// *************************************************************************** DELETE SESSIONS (DELETE SESSION) ***
    router.delete(`/:session_id`, async(req, res, next) => {

        // Valido el body si llega con el ID
        if (!req.params.session_id) {
            return next (new Error("Session ID is missing!"));
        }

        try {


            // BORRADO LOGICO

            var updateJSON = {};
            updateJSON['session_status'] = "X";
            updateJSON['session_expire'] = new Date();


            // Actualizo session
            const [numberOfAffectedRows, affectedRows] = await UserSessionModel.update(updateJSON,
                {
                    where: {
                        session_id: req.params.session_id,
                        [sequelize.Op.not] : [{session_status: "X"}]
                    },
                    returning: true,
                    // plain: true,
                });

            // Devuelvo customer actualizado
            const updatedSession = await UserSessionModel.findOne({
                attributes: {},
                where: {
                    session_id: req.params.session_id,
                    [sequelize.Op.not] : [{session_status: "X"}]
                }
            });


            // Devuelvo producto eliminado
            if (affectedRows===0) return res.json(false);
            return res.json(true);


            // // BORRADO FISICO de la session

            // const userSession = await UserSessionModel.findByPk(req.params.session_id);
            // if (!userSession) return next(new Error("Invalid session ID"));
            // await userSession.destroy();
            // return res.end();

        }
        catch (e) {
            // return next(e);
            if (e.errors===undefined) {
                return next(new Error(e.parent.code))
                // return next(new Error(e.parent.sqlMessage))
            } else {
                return next(new Error(e.errors[0].message))
            }

        }

    });

module.exports = router;



