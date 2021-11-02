import express from 'express';
var router = express.Router();

// import {
//     UserModel,
//     UserReferencialModel,
//     UserRankModel,
// } from "#root/db/models";

import {PromocodeModel} from "#root/db/models/promocode";

import * as sequelize from "sequelize";
import SequelizeDatabaseError from "sequelize";

import accessEnv from "#root/helpers/accessEnv";
import generateUUID from "#root/helpers/generateUUID";
import getWhere from "#root/helpers/getWhere";
import isEmpty from "lodash/isEmpty";

// import hashPassword from "#root/helpers/hashPassword";
// import path from "path";

// import axios from"axios";

const ENDPOINT_URI = accessEnv("ENDPOINT_URI");

const CircularJSON = require('circular-json');

    // ---------------------------------------------------- PROMOCODES --------------------------------------------------------------

    // *** FETCH ALL
    router.post( `/all` , async (req, res, next) => {
        const filter = await getWhere({filter: req.body.args.filter, status: "promocode_status"});

        try {
            const promocodes = await PromocodeModel.findAndCountAll({
                order: [['promocode_created','desc']],
                attributes: {},
                where: filter
            });
            return res.json(promocodes);
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

    // *** COUNT
    router.get( `/count` , async (req, res, next) => {

        try {
            const promocodes = await PromocodeModel.findAndCountAll();
            return res.json(promocodes);
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


    // FETCH BY ID
    router.get( `/:promocode_id` , async (req, res, next) => {

        try {
            var promocode = await PromocodeModel.findOne({
                attributes: {},
                where: {
                    promocode_id: req.params.promocode_id,
                    [sequelize.Op.not] : [{promocode_status: "X"}]
                }
            });

            return res.json(promocode);
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


    // FETCH BY CODE
    router.get( `/code/:promocode_code` , async (req, res, next) => {

        try {
            var promocode = await PromocodeModel.findOne({
                raw: true,
                attributes: {},
                where: {
                    promocode_code: req.params.promocode_code,
                    [sequelize.Op.not] : [{promocode_status: "X"}]
                },
                order: [ [ 'promocode_code', 'ASC' ]],
            });
            return res.json(promocode);
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


    // // *** CREATE
    // router.post(`/`, async(req, res, next) => {
    //     // console.log("req.body.args-->", req.body.args);
    //     if (!req.body.args.promocode_firstname|| !req.body.args.promocode_lastname ||
    //         !req.body.args.promocode_email || !req.body.args.promocode_identification ||
    //         !req.body.args.promocode_external_id
    //     ) {
    //         return next (new Error("Data are incomplete!"));
    //     }
    //
    //
    //     try {
    //
    //         // // // Obtengo el PARAMETRO URL_HOST
    //         // // const urlHostParameter = await ParameterModel.findOne({
    //         // //     attributes: {},
    //         // //     where: {parameter_name: "URL_HOST"}
    //         // // });
    //         //
    //         // // Verifico si ya existe o no
    //         // const oldCompetitor = await PromocodeModel.findOne({
    //         //     attributes: {},
    //         //     where: {
    //         //         promocode_external_id: req.body.args.promocode_external_id,
    //         //         // [sequelize.Op.not] : [{promocode_status: "X"}]
    //         //     }
    //         // });
    //         //
    //         // if (oldCompetitor) {
    //         //     return res.json({oldCompetitor}) ;
    //         // };
    //
    //         var newJSON = {};
    //
    //         newJSON['promocode_id']=generateUUID();
    //         if (req.body.args.promocode_firstname) newJSON['promocode_firstname'] = req.body.args.promocode_firstname;
    //         if (req.body.args.promocode_lastname) newJSON['promocode_lastname'] = req.body.args.promocode_lastname;
    //         if (req.body.args.promocode_email) newJSON['promocode_email'] = req.body.args.promocode_email;
    //         if (req.body.args.promocode_phone) newJSON['promocode_phone'] = req.body.args.promocode_phone;
    //         if (req.body.args.promocode_identification) newJSON['promocode_identification'] = req.body.args.promocode_identification;
    //         if (req.body.args.promocode_dob) newJSON['promocode_dob'] = req.body.args.promocode_dob;
    //         if (req.body.args.promocode_external_id) newJSON['promocode_external_id'] = req.body.args.promocode_external_id;
    //
    //         // console.log("newJSON=>", newJSON);
    //         if (isEmpty(newJSON)) {
    //             return next (new Error("Nothing to create !"));
    //         }
    //
    //         const newCompetitor = await PromocodeModel.create(newJSON);
    //         // console.log("newCompetitor=>", newCompetitor);
    //         return res.json({newCompetitor}) ;
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
    //
    //
    // // *** UPDATE
    // router.put(`/:promocode_external_id`, async(req, res, next) => {
    //
    //     // console.log("req.body.args==>", req.body.args);
    //
    //     // Valido el body si llega con el ID
    //     if (!req.params.promocode_external_id) {
    //         return next (new Error("ID is missing!"));
    //     }
    //
    //     // Armo el JSON de Actualizacion solo con los campos que vienen
    //     var updateJSON = {};
    //     if (req.body.args.promocode_firstname) updateJSON['promocode_firstname'] = req.body.args.promocode_firstname;
    //     if (req.body.args.promocode_lastname) updateJSON['promocode_lastname'] = req.body.args.promocode_lastname;
    //     if (req.body.args.promocode_email) updateJSON['promocode_email'] = req.body.args.promocode_email;
    //     if (req.body.args.promocode_phone) updateJSON['promocode_phone'] = req.body.args.promocode_phone;
    //     if (req.body.args.promocode_identification) updateJSON['promocode_identification'] = req.body.args.promocode_identification;
    //     if (req.body.args.promocode_dob) updateJSON['promocode_dob'] = req.body.args.promocode_dob;
    //     if (req.body.args.promocode_external_id) updateJSON['promocode_external_id'] = req.body.args.promocode_external_id;
    //
    //     if (isEmpty(updateJSON)) {
    //         return next (new Error("Nothing to update !"));
    //     }
    //
    //
    //     try {
    //
    //         const [numberOfAffectedRows, affectedRows] = await PromocodeModel.update(updateJSON,
    //             {
    //                 where: {
    //                     promocode_external_id: req.params.promocode_external_id,
    //                     [sequelize.Op.not] : [{promocode_status: "X"}]
    //                 },
    //                 returning: true,
    //             });
    //
    //         // Devuelvo row actualizado
    //         const updatedCompetitor = await PromocodeModel.findOne({
    //             attributes: {},
    //             where: {
    //                 promocode_external_id: req.params.promocode_external_id,
    //                 [sequelize.Op.not] : [{promocode_status: "X"}]
    //             }
    //         });
    //
    //         if (!updatedCompetitor) return next(new Error("Invalid ID or Deleted"));
    //         return res.json(updatedCompetitor);
    //
    //
    //     } catch(e) {
    //         // Error Handling
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
    //
    //     }
    //
    //
    // });
    //
    //
    // // *** DELETE
    // router.delete(`/:promocode_id`, async(req, res, next) => {
    //
    //     // Valido el body si llega con el ID
    //     if (!req.params.promocode_id) {
    //         return next (new Error("ID is missing!"));
    //     }
    //
    //     const deletedCompetitor = await PromocodeModel.findOne({
    //         attributes: {},
    //         where: {
    //             promocode_id: req.params.promocode_id,
    //             [sequelize.Op.not] : [{promocode_status: "X"}]
    //         }
    //     });
    //
    //     // console.log("deletedCompetitor==>", deletedCompetitor);
    //
    //     if (!deletedCompetitor) return next(new Error("Invalid ID or Deleted"));
    //
    //     try {
    //
    //         // // Actualizo estado con X
    //         // const [numberOfAffectedRows, affectedRows] = await PromocodeModel.update({
    //         //     promocode_status: "X",
    //         // },{
    //         //     where: {
    //         //         promocode_id: req.params.promocode_id,
    //         //         [sequelize.Op.not] : [{promocode_status: "X"}]
    //         //     },
    //         //     returning: true,
    //         //     // plain: true,
    //         // });
    //         // // Devuelvo media product eliminado
    //         // if (affectedRows==0) return next(new Error("Invalid User ID or Deleted"));
    //
    //         // Borrado fisico
    //         await deletedCompetitor.destroy();
    //
    //         // return res.end();
    //         return res.json(true);
    //
    //     } catch(e) {
    //         // Error Handling
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
    //
    //     }
    //
    //
    // });


module.exports = router;
