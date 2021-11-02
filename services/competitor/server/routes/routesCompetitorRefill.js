import express from 'express';
var router = express.Router();

import {ParameterModel} from "#root/db/models/parameter";
import {CompetitorRefillModel} from "#root/db/models/competitor_refill";

import * as sequelize from "sequelize";
import sequelizedb from "../src/db/connectiondb";
import {SequelizeDatabaseError, Sequelize, DataTypes, Model, QueryTypes  } from "sequelize";

import accessEnv from "#root/helpers/accessEnv";
import generateUUID from "#root/helpers/generateUUID";
import getWhere from "#root/helpers/getWhere";
import isEmpty from "lodash/isEmpty";

// import hashPassword from "#root/helpers/hashPassword";
// import path from "path";
// import axios from"axios";

const ENDPOINT_URI = accessEnv("ENDPOINT_URI");

const CircularJSON = require('circular-json');

    // ---------------------------------------------------- COMPETITOR-REFILL --------------------------------------------------------------

    // *** FETCH ALL
    router.post( `/all` , async (req, res, next) => {
        const filter = await getWhere({filter: req.body.args.filter, status: "competitor_refill_status"});

        try {
            const competitorsRefill = await CompetitorRefillModel.findAndCountAll({
                order: [['competitor_refill_created','asc']],
                attributes: {},
                where: filter
            });
            return res.json(competitorsRefill);
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
            const competitorsRefill = await CompetitorRefillModel.findAndCountAll();
            return res.json(competitorsRefill);
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
    router.get( `/:competitor_refill_id` , async (req, res, next) => {

        try {
            var competitor = await CompetitorRefillModel.findOne({
                attributes: {},
                where: {
                    competitor_refill_id: req.params.competitor_refill_id,
                    [sequelize.Op.not] : [{competitor_refill_status: "X"}]
                }
            });

            return res.json(competitor);
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



    // *** CREATE
    router.post(`/`, async(req, res, next) => {
        // console.log("req.body.args-->", req.body.args);
        if (!req.body.args.competitor_id|| !req.body.args.competitor_refill_phone ||
            !req.body.args.competitor_refill_company || !req.body.args.competitor_refill_value
        ) {
            return next (new Error("Data are incomplete!"));
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

            newJSON['competitor_refill_id']=generateUUID();
            if (req.body.args.competitor_id) newJSON['competitor_id'] = req.body.args.competitor_id;
            if (req.body.args.competitor_refill_phone) newJSON['competitor_refill_phone'] = req.body.args.competitor_refill_phone;
            if (req.body.args.competitor_refill_company) newJSON['competitor_refill_company'] = req.body.args.competitor_refill_company;
            if (req.body.args.competitor_refill_value) newJSON['competitor_refill_value'] = req.body.args.competitor_refill_value;

            // console.log("newJSON=>", newJSON);
            if (isEmpty(newJSON)) {
                return next (new Error("Nothing to create !"));
            }

            const newCompetitorRefill = await CompetitorRefillModel.create(newJSON);
            // console.log("newCompetitorRefill=>", newCompetitorRefill);
            return res.json({newCompetitorRefill}) ;

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


    // *** UPDATE
    router.put(`/:competitor_refill_id`, async(req, res, next) => {

        // console.log("req.body.args==>", req.body.args);

        // Valido el body si llega con el ID
        if (!req.params.competitor_refill_id) {
            return next (new Error("ID is missing!"));
        }

        // Armo el JSON de Actualizacion solo con los campos que vienen
        var updateJSON = {};
        if (req.body.args.competitor_refill_phone) updateJSON['competitor_refill_phone'] = req.body.args.competitor_refill_phone;
        if (req.body.args.competitor_refill_company) updateJSON['competitor_refill_company'] = req.body.args.competitor_refill_company;
        if (req.body.args.competitor_refill_value) updateJSON['competitor_refill_value'] = req.body.args.competitor_refill_value;

        if (isEmpty(updateJSON)) {
            return next (new Error("Nothing to update !"));
        }

        try {

            const [numberOfAffectedRows, affectedRows] = await CompetitorRefillModel.update(updateJSON,
                {
                    where: {
                        competitor_refill_id: req.params.competitor_refill_id,
                        [sequelize.Op.not] : [{competitor_refill_status: "X"}]
                    },
                    returning: true,
                });

            // Devuelvo row actualizado
            const updatedCompetitorRefill = await CompetitorRefillModel.findOne({
                attributes: {},
                where: {
                    competitor_refill_id: req.params.competitor_refill_id,
                    [sequelize.Op.not] : [{competitor_refill_status: "X"}]
                }
            });

            if (!updatedCompetitorRefill) return next(new Error("Invalid ID or Deleted"));
            return res.json(updatedCompetitorRefill);


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


    // *** DELETE
    router.delete(`/:competitor_refill_id`, async(req, res, next) => {

        // Valido el body si llega con el ID
        if (!req.params.competitor_refill_id) {
            return next (new Error("ID is missing!"));
        }

        const deletedCompetitorRefill = await CompetitorRefillModel.findOne({
            attributes: {},
            where: {
                competitor_refill_id: req.params.competitor_refill_id,
                [sequelize.Op.not] : [{competitor_refill_status: "X"}]
            }
        });

        // console.log("deletedCompetitorRefill==>", deletedCompetitorRefill);

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
            await deletedCompetitorRefill.destroy();

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
