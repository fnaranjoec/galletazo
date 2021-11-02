import express from 'express';
var router = express.Router();

import {
    ParameterModel,
    UserReferencialModel,
} from "#root/db/models";

import * as sequelize from "sequelize";

import accessEnv from "#root/helpers/accessEnv";
import generateUUID from "#root/helpers/generateUUID";
import hashPassword from "#root/helpers/hashPassword";
import getWhere from "#root/helpers/getWhere";
import isEmpty from "lodash/isEmpty";
import path from "path";

const ENDPOINT_URI = accessEnv("ENDPOINT_URI");


    // ---------------------------------------------------- PARAMETER --------------------------------------------------------------

    // *** FETCH ALL PARAMETER
    router.post( `/all` , async (req, res, next) => {

        const filter = await getWhere({filter: req.body.args.filter, status: ""});

        try {
            const users = await ParameterModel.findAndCountAll({
                order: [['parameter_created','desc']],
                attributes: {},
                where: filter
            });
            return res.json(users);
        }
        catch (e){
            // console.log("e==>",e);
            // return next(e);
            if (e.errors===undefined) {
                return next(new Error(e.parent.code))
                // return next(new Error(e.parent.sqlMessage))
            } else {
                return next(new Error(e.errors[0].message))
            }

        }

    });


    // *** COUNT PARAMETER
    router.get( `/count` , async (req, res, next) => {

        try {
            const parameteres = await ParameterModel.findAndCountAll();
            return res.json(parameteres);
        }
        catch (e){
            // return next(e);
            // console.log("e==>", e);
            if (e.errors===undefined) {
                return next(new Error(e.parent.code))
                // return next(new Error(e.parent.sqlMessage))
            } else {
                return next(new Error(e.errors[0].message))
            }

        }

    });


    // *** FETCH PARAMETER BY ID
    router.get( `/:parameter_name` , async (req, res, next) => {

        try {
            var parameter = await ParameterModel.findOne({
                attributes: {},
                where: {
                    parameter_id: req.params.parameter_name,
                    // [sequelize.Op.not] : [{parameter_status: "X"}]
                }
            });

            return res.json(parameter);
        }
        catch (e){
            // return next(e);
            // console.log("e==>", e);
            if (e.errors===undefined) {
                return next(new Error(e.parent.code))
                // return next(new Error(e.parent.sqlMessage))
            } else {
                return next(new Error(e.errors[0].message))
            }

        }

    });


    // // *** POST PARAMETER
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
    router.put(`/:parameter_name`, async(req, res, next) => {

        // Valido el body si llega con el ID
        if (!req.params.parameter_name) {
            return next (new Error("Parameter NAME is missing!"));
        }

        // Armo el JSON de Actualizacion solo con los campos que vienen
        var updateJSON = {};
        if (req.body.args.parameter_name) updateJSON['parameter_name'] = req.body.args.parameter_name;
        if (req.body.args.parameter_desc) updateJSON['parameter_desc'] = req.body.args.parameter_desc;
        if (req.body.args.parameter_text) updateJSON['parameter_text'] = req.body.args.parameter_text;
        if (req.body.args.parameter_value) updateJSON['parameter_value'] = req.body.args.parameter_value;

        if (isEmpty(updateJSON)) {
            return next (new Error("Nothing to update !"));
        }


        try {

            const [numberOfAffectedRows, affectedRows] = await ParameterModel.update(updateJSON,
                {
                    where: {
                        parameter_name: req.params.parameter_name,
                        // [sequelize.Op.not] : [{parameter_status: "X"}]
                    },
                    returning: true,
                });

            // Devuelvo media product actualizado
            const updatedParameter = await ParameterModel.findOne({
                attributes: {},
                where: {
                    parameter_name: req.params.parameter_name,
                    // [sequelize.Op.not] : [{parameter_status: "X"}]
                }
            });

            if (!updatedParameter) return next(new Error("Invalid Parameter NAME or Deleted"));
            return res.json(updatedParameter);


        } catch(e) {
            // return next(e);
            // console.log("e==>",e);
            if (e.errors===undefined) {
                return next(new Error(e.parent.code))
                // return next(new Error(e.parent.sqlMessage))
            } else {
                return next(new Error(e.errors[0].message))
            }

        }


    });


    // // *** DELETE PARAMETER
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
