import express from 'express';
var router = express.Router();

import {
    UserModel,
    UserReferencialModel,
    UserRankModel,
    ParameterModel,
} from "#root/db/models";

import * as sequelize from "sequelize";
import SequelizeDatabaseError from "sequelize";

import accessEnv from "#root/helpers/accessEnv";
import generateUUID from "#root/helpers/generateUUID";
// import hashPassword from "#root/helpers/hashPassword";
import getWhere from "#root/helpers/getWhere";
import isEmpty from "lodash/isEmpty";
// import path from "path";


import axios from"axios";


const ENDPOINT_URI = accessEnv("ENDPOINT_URI");
// const BASE_URL_INTERCOM = accessEnv("BASE_URL_INTERCOM");
// const TOKEN_INTERCOM = accessEnv("TOKEN_INTERCOM");

const CircularJSON = require('circular-json');

    // ---------------------------------------------------- USER --------------------------------------------------------------

    // *** FETCH ALL USER
    router.post( `/all` , async (req, res, next) => {

        const filter = await getWhere({filter: req.body.args.filter, status: "user_status"});

        try {
            const users = await UserModel.findAndCountAll({
                order: [['user_created','desc']],
                attributes: {},
                where: filter
            });
            return res.json(users);
        }
        catch (e){
            // Error Handling
            switch (e.name) {
                case "SequelizeUniqueConstraintError":
                    return next({message: `Constraint Error: ${e.errors[0].message.replace(/"/g, "'")}`});
                    break;
                case "SequelizeDatabaseError":
                    return next({message: `Database Error: ${e.parent.sqlMessage.replace(/"/g, "'")}`});
                    break;
                default:
                    return next({message: `Unknown error: ${e.message.replace(/"/g, "'")}`});
            }

        }

    });

    // *** FETCH ALL USER RANK
    router.post( `/rank/all` , async (req, res, next) => {

        const filter = await getWhere({filter: req.body.args.filter, status: ""});

        try {
            const users = await UserRankModel.findAndCountAll({
                // order: [['user_created','desc']],
                attributes: {},
                where: filter
            });
            return res.json(users);
        }
        catch (e){
            // Error Handling
            switch (e.name) {
                case "SequelizeUniqueConstraintError":
                    return next({message: `Constraint Error: ${e.errors[0].message.replace(/"/g, "'")}`});
                    break;
                case "SequelizeDatabaseError":
                    return next({message: `Database Error: ${e.parent.sqlMessage.replace(/"/g, "'")}`});
                    break;
                default:
                    return next({message: `Unknown error: ${e.message.replace(/"/g, "'")}`});
            }


        }

    });


    // *** COUNT USER
    router.get( `/count` , async (req, res, next) => {

        try {
            const users = await UserModel.findAndCountAll();
            return res.json(users);
        }
        catch (e){
            // Error Handling
            switch (e.name) {
                case "SequelizeUniqueConstraintError":
                    return next({message: `Constraint Error: ${e.errors[0].message.replace(/"/g, "'")}`});
                    break;
                case "SequelizeDatabaseError":
                    return next({message: `Database Error: ${e.parent.sqlMessage.replace(/"/g, "'")}`});
                    break;
                default:
                    return next({message: `Unknown error: ${e.message.replace(/"/g, "'")}`});
            }


        }

    });


    // *** FETCH USER BY ID
    router.get( `/:user_id` , async (req, res, next) => {

        try {
            var user = await UserModel.findOne({
                attributes: {},
                where: {
                    user_id: req.params.user_id,
                    [sequelize.Op.not] : [{user_status: "X"}]
                }
            });

            return res.json(user);
        }
        catch (e){
            // Error Handling
            switch (e.name) {
                case "SequelizeUniqueConstraintError":
                    return next({message: `Constraint Error: ${e.errors[0].message.replace(/"/g, "'")}`});
                    break;
                case "SequelizeDatabaseError":
                    return next({message: `Database Error: ${e.parent.sqlMessage.replace(/"/g, "'")}`});
                    break;
                default:
                    return next({message: `Unknown error: ${e.message.replace(/"/g, "'")}`});
            }

        }

    });

    // *** FETCH USER RANK BY EMAIL
    router.get( `/rank/:user_email` , async (req, res, next) => {

        try {
            var user = await UserRankModel.findOne({
                attributes: {},
                where: {
                    user_email: req.params.user_email,
                    // [sequelize.Op.not] : [{user_status: "X"}]
                }
            });

            return res.json(user);
        }
        catch (e){
            // Error Handling
            switch (e.name) {
                case "SequelizeUniqueConstraintError":
                    return next({message: `Constraint Error: ${e.errors[0].message.replace(/"/g, "'")}`});
                    break;
                case "SequelizeDatabaseError":
                    return next({message: `Database Error: ${e.parent.sqlMessage.replace(/"/g, "'")}`});
                    break;
                default:
                    return next({message: `Unknown error: ${e.message.replace(/"/g, "'")}`});
            }


        }

    });


    // // *** POST USER INTERCOM
    // router.post(`/intercom/`, async(req, res, next) => {
    //
    //     // Valido el body si llega con todos los datos
    //     console.log("req.body.args-->", req.body.args);
    //
    //     // *** Essto ya no valida en el resolver
    //     // if (!req.body.args.userIntercom.email || !req.body.args.userIntercom.custom_attributes.shortenURLEarlyAccess) || !req.body.args.userIntercom.custom_attributes.referenceId) {
    //     //     return next (new Error("User email is missing!"));
    //     // }
    //
    //     try {
    //         req.body.args.userIntercom['role']='competitor';
    //
    //
    //         const payload = req.body.args.userIntercom;
    //
    //         // `${BASE_URL_INTERCOM}/intercom_api`
    //         const axios_response = await axios({
    //             method: "POST",
    //             url : `${BASE_URL_INTERCOM}`,
    //             headers: {
    //                 "Content-type": "application/json",
    //                 "Accept": "application/json",
    //                 "Access-Control-Allow-Origin": "*",
    //                 "Authorization": `Bearer ${TOKEN_INTERCOM}`,
    //                 "Access-Control-Allow-Credentials": "true",
    //                 "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    //                 "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Methods",
    //                 // "x-rapidapi-host":"astrology-horoscope.p.rapidapi.com",
    //                 // "x-rapidapi-key": "yourapikey"
    //             },
    //             data: payload
    //         });
    //         //     .then(res=>{
    //         //     console.log(`res: ${res}`);
    //         //     return res.json(response);
    //         // }).catch(err=>{
    //         //     console.log(`err: ${err}`);
    //         // });
    //         let circularJson = CircularJSON.stringify(axios_response);
    //
    //         console.log(`circularJson==>${circularJson}`);
    //
    //         return res.send(circularJson) ;
    //
    //     } catch(e) {
    //
    //         // Error Handling
    //         console.log("e->",e);
    //         switch (e.name) {
    //             case "SequelizeUniqueConstraintError":
    //                 return next({message: `Constraint Error: ${e.errors[0].message.replace(/"/g, "'")}`});
    //                 break;
    //             case "SequelizeDatabaseError":
    //                 return next({message: `Database Error: ${e.parent.sqlMessage.replace(/"/g, "'")}`});
    //                 break;
    //             default:
    //                 return next({message: `Unknown error: ${e.message.replace(/"/g, "'")}`});
    //         }
    //
    //     }
    //
    // });


    // *** POST USER
    router.post(`/`, async(req, res, next) => {

        // Valido el body si llega con todos los datos
        // console.log("req.body.args-->", req.body.args);

        if (!req.body.args.user_email) {
            return next (new Error("User email is missing!"));
        }


        try {

            // // Obtengo el PARAMETRO URL_HOST
            // const urlHostParameter = await ParameterModel.findOne({
            //     attributes: {},
            //     where: {parameter_name: "URL_HOST"}
            // });

            // Verifico si ya existe o no
            const oldUser = await UserModel.findOne({
                attributes: {},
                where: {
                    user_email: req.body.args.user_email,
                    [sequelize.Op.not] : [{user_status: "X"}]
                }
            });

            if (oldUser) {
                return res.json({
                    user_id: oldUser.user_id,
                    user_shorturl: oldUser.user_shorturl
                }) ;
            };


            // Verifico si existe el ID REFERENCIAL
            if (req.body.args.referencial_id) {
                const referencialUser = await UserModel.findOne({
                    attributes: {},
                    where: {
                        user_id: req.body.args.referencial_id,
                        [sequelize.Op.not] : [{user_status: "X"}]
                    }
                });


                if (!referencialUser) {
                    return next (new Error("Referencial User doesn't exists!"));
                };
            }


            var newJSON = {};

            newJSON['user_id']=generateUUID();
            if (req.body.args.user_name) newJSON['user_name'] = req.body.args.user_name;
            if (req.body.args.user_email) newJSON['user_email'] = req.body.args.user_email;
            if (req.body.args.user_shorturl) newJSON['user_shorturl'] = req.body.args.user_shorturl;
            if (req.body.args.referencial_id) newJSON['user_origin'] = req.body.args.referencial_id;
            if (req.body.args.user_lat) newJSON['user_lat'] = req.body.args.user_lat;
            if (req.body.args.user_lon) newJSON['user_lon'] = req.body.args.user_lon;
            if (req.body.args.user_browser) newJSON['user_browser'] = req.body.args.user_browser;
            if (req.body.args.user_ip) newJSON['user_ip'] = req.body.args.user_ip;
            if (req.body.args.user_os) newJSON['user_os'] = req.body.args.user_os;
            if (req.body.args.user_country) newJSON['user_country'] = req.body.args.user_country;
            if (req.body.args.user_lang) newJSON['user_lang'] = req.body.args.user_lang;

            console.log("newJSON=>", newJSON);
            if (isEmpty(newJSON)) {
                return next (new Error("Nothing to create !"));
            }

            const newUser = await UserModel.create(newJSON);

            // Creo ROW USUARIO para ser guardado
            // Si hay codigo de referido lo grabo en USER_REFERENCIAL

            if (req.body.args.referencial_id) {
                const newUserReferencial = await UserReferencialModel.create({
                    user_referencial_id: generateUUID(),
                    user_id: req.body.args.referencial_id,
                    user_id_new: newUser.user_id,
                });
            }

            // Return URL to share
            // return res.json(urlHostParameter.parameter_text + '/' + newUser.user_id) ;
            console.log("newUser=>", newUser);
            return res.json({
                user_id: newUser.user_id,
                user_shorturl: null
            }) ;

        } catch(e) {

            // Error Handling
            console.log("e->",e);
            switch (e.name) {
                case "SequelizeUniqueConstraintError":
                    return next({message: `Constraint Error: ${e.errors[0].message.replace(/"/g, "'")}`});
                    break;
                case "SequelizeDatabaseError":
                    return next({message: `Database Error: ${e.parent.sqlMessage.replace(/"/g, "'")}`});
                    break;
                default:
                    return next({message: `Unknown error: ${e.message.replace(/"/g, "'")}`});
            }

        }

    });


    // *** PUT USER
    router.put(`/:user_id`, async(req, res, next) => {

        // console.log("req.body.args==>", req.body.args);

        // Valido el body si llega con el ID
        if (!req.params.user_id) {
            return next (new Error("User ID is missing!"));
        }

        // Armo el JSON de Actualizacion solo con los campos que vienen
        var updateJSON = {};
        if (req.body.args.user_name) updateJSON['user_name'] = req.body.args.user_name;
        if (req.body.args.user_email) updateJSON['user_email'] = req.body.args.user_email;
        if (req.body.args.user_shorturl) updateJSON['user_shorturl'] = req.body.args.user_shorturl;
        if (req.body.args.user_lat) updateJSON['user_lat'] = req.body.args.user_lat;
        if (req.body.args.user_lon) updateJSON['user_lon'] = req.body.args.user_lon;
        if (req.body.args.user_browser) updateJSON['user_browser'] = req.body.args.user_browser;
        if (req.body.args.user_ip) updateJSON['user_ip'] = req.body.args.user_ip;
        if (req.body.args.user_os) updateJSON['user_os'] = req.body.args.user_os;
        if (req.body.args.user_country) updateJSON['user_country'] = req.body.args.user_country;
        if (req.body.args.user_lang) updateJSON['user_lang'] = req.body.args.user_lang;

        if (isEmpty(updateJSON)) {
            return next (new Error("Nothing to update !"));
        }


        try {

            const [numberOfAffectedRows, affectedRows] = await UserModel.update(updateJSON,
                {
                    where: {
                        user_id: req.params.user_id,
                        [sequelize.Op.not] : [{user_status: "X"}]
                    },
                    returning: true,
                });

            // Devuelvo media product actualizado
            const updatedUser = await UserModel.findOne({
                attributes: {},
                where: {
                    user_id: req.params.user_id,
                    [sequelize.Op.not] : [{user_status: "X"}]
                }
            });

            if (!updatedUser) return next(new Error("Invalid User ID or Deleted"));
            return res.json(updatedUser);


        } catch(e) {
            // Error Handling
            switch (e.name) {
                case "SequelizeUniqueConstraintError":
                    return next({message: `Constraint Error: ${e.errors[0].message.replace(/"/g, "'")}`});
                    break;
                case "SequelizeDatabaseError":
                    return next({message: `Database Error: ${e.parent.sqlMessage.replace(/"/g, "'")}`});
                    break;
                default:
                    return next({message: `Unknown error: ${e.message.replace(/"/g, "'")}`});
            }


        }


    });


    // *** DELETE USER
    router.delete(`/:user_id`, async(req, res, next) => {

        // Valido el body si llega con el ID
        if (!req.params.user_id) {
            return next (new Error("User ID is missing!"));
        }

        const deletedUser = await UserModel.findOne({
            attributes: {},
            where: {
                user_id: req.params.user_id,
                [sequelize.Op.not] : [{user_status: "X"}]
            }
        });

        // console.log("deletedUser==>", deletedUser);

        if (!deletedUser) return next(new Error("Invalid User ID or Deleted"));


        // VERIFICO QUE NO HAYA USUARIO_REFENCIALES GENERADOS
        const userReferencials = await UserReferencialModel.findAll({
            attributes: {},
            where: {
                user_id: req.params.user_id,
                // [sequelize.Op.not] : [{user_referencial_status: "X"}]
            }
        });
        
        if (!isEmpty(userReferencials)) return next(new Error("User has referencial users, can't delete it !!!"));


        try {

            // // Actualizo estado con X
            // const [numberOfAffectedRows, affectedRows] = await UserModel.update({
            //     user_status: "X",
            // },{
            //     where: {
            //         user_id: req.params.user_id,
            //         [sequelize.Op.not] : [{user_status: "X"}]
            //     },
            //     returning: true,
            //     // plain: true,
            // });
            // // Devuelvo media product eliminado
            // if (affectedRows==0) return next(new Error("Invalid User ID or Deleted"));

            // Borrado fisico
            await deletedUser.destroy();


            // return res.end();
            return res.json(true);


        } catch(e) {
            // Error Handling
            switch (e.name) {
                case "SequelizeUniqueConstraintError":
                    return next({message: `Constraint Error: ${e.errors[0].message.replace(/"/g, "'")}`});
                    break;
                case "SequelizeDatabaseError":
                    return next({message: `Database Error: ${e.parent.sqlMessage.replace(/"/g, "'")}`});
                    break;
                default:
                    return next({message: `Unknown error: ${e.message.replace(/"/g, "'")}`});
            }


        }


    });


module.exports = router;
