import express from 'express';
var router = express.Router();

import {ParameterModel} from "#root/db/models/parameter";
import {CompetitorModel} from "#root/db/models/competitor";
import {CompetitorTriedModel} from "#root/db/models/competitor_tried";
import {PrizeModel} from "#root/db/models/prize";
import {PromocodeModel} from "#root/db/models/promocode";
import {VwWinnersModel} from "#root/db/models/vw_winners";
import {CompetitorTriedViewModel} from '#root/db/models/competitor_tried_view';

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

    // ---------------------------------------------------- COMPETITOR --------------------------------------------------------------

    // *** FETCH ALL
    router.post( `/all` , async (req, res, next) => {
        const filter = await getWhere({filter: req.body.args.filter, status: "competitor_status"});

        try {
            const competitors = await CompetitorModel.findAndCountAll({
                order: [['competitor_lastname','asc'], ['competitor_firstname','asc']],
                attributes: {},
                where: filter
            });
            return res.json(competitors);
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
            const competitors = await CompetitorModel.findAndCountAll();
            return res.json(competitors);
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
    router.get( `/:competitor_id` , async (req, res, next) => {

        try {
            var competitor = await CompetitorModel.findOne({
                attributes: {},
                where: {
                    competitor_id: req.params.competitor_id,
                    [sequelize.Op.not] : [{competitor_status: "X"}]
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


    // FETCH BY EXTERNAL ID
    router.get( `/external/:competitor_external_id` , async (req, res, next) => {
        // console.log(`req.params-->${JSON.stringify(req.params)}`);

        try {
            var competitor = await CompetitorModel.findOne({
                attributes: {},
                where: {
                    competitor_external_id: req.params.competitor_external_id,
                    // [sequelize.Op.not] : [{competitor_status: "X"}]
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
        if (!req.body.args.competitor_firstname|| !req.body.args.competitor_lastname ||
            !req.body.args.competitor_external_id
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
            //         competitor_external_id: req.body.args.competitor_external_id,
            //         // [sequelize.Op.not] : [{competitor_status: "X"}]
            //     }
            // });
            //
            // if (oldCompetitor) {
            //     return res.json({oldCompetitor}) ;
            // };

            var newJSON = {};
            
            console.log(`args-->${JSON.stringify(req.body.args)}`);

            newJSON['competitor_id']=generateUUID();
            if (req.body.args.competitor_firstname) newJSON['competitor_firstname'] = req.body.args.competitor_firstname;
            if (req.body.args.competitor_lastname) newJSON['competitor_lastname'] = req.body.args.competitor_lastname;
            if (req.body.args.competitor_email) newJSON['competitor_email'] = req.body.args.competitor_email;
            if (req.body.args.competitor_identification) newJSON['competitor_identification'] = req.body.args.competitor_identification;
            if (req.body.args.competitor_phone) newJSON['competitor_phone'] = req.body.args.competitor_phone;
            if (req.body.args.competitor_dob) newJSON['competitor_dob'] = req.body.args.competitor_dob;
            if (req.body.args.competitor_city) newJSON['competitor_city'] = req.body.args.competitor_city;
            if (req.body.args.competitor_external_id) newJSON['competitor_external_id'] = req.body.args.competitor_external_id;

            // console.log("newJSON=>", newJSON);
            if (isEmpty(newJSON)) {
                return next (new Error("Nothing to create !"));
            }

            const newCompetitor = await CompetitorModel.create(newJSON);
            // console.log("newCompetitor=>", newCompetitor);
            return res.json({newCompetitor}) ;

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
    router.put(`/:competitor_external_id`, async(req, res, next) => {

        // console.log("req.body.args==>", req.body.args);

        // Valido el body si llega con el ID
        if (!req.params.competitor_external_id) {
            return next (new Error("ID is missing!"));
        }

        // Armo el JSON de Actualizacion solo con los campos que vienen
        var updateJSON = {};
        if (req.body.args.competitor_firstname) updateJSON['competitor_firstname'] = req.body.args.competitor_firstname;
        if (req.body.args.competitor_lastname) updateJSON['competitor_lastname'] = req.body.args.competitor_lastname;
        if (req.body.args.competitor_email) updateJSON['competitor_email'] = req.body.args.competitor_email;
        if (req.body.args.competitor_phone) updateJSON['competitor_phone'] = req.body.args.competitor_phone;
        if (req.body.args.competitor_identification) updateJSON['competitor_identification'] = req.body.args.competitor_identification;
        if (req.body.args.competitor_dob) updateJSON['competitor_dob'] = req.body.args.competitor_dob;
        if (req.body.args.competitor_city) updateJSON['competitor_city'] = req.body.args.competitor_city;
        if (req.body.args.competitor_external_id) updateJSON['competitor_external_id'] = req.body.args.competitor_external_id;

        if (isEmpty(updateJSON)) {
            return next (new Error("Nothing to update !"));
        }


        try {

            const [numberOfAffectedRows, affectedRows] = await CompetitorModel.update(updateJSON,
                {
                    where: {
                        competitor_external_id: req.params.competitor_external_id,
                        [sequelize.Op.not] : [{competitor_status: "X"}]
                    },
                    returning: true,
                });

            // Devuelvo row actualizado
            const updatedCompetitor = await CompetitorModel.findOne({
                attributes: {},
                where: {
                    competitor_external_id: req.params.competitor_external_id,
                    [sequelize.Op.not] : [{competitor_status: "X"}]
                }
            });

            if (!updatedCompetitor) return next(new Error("Invalid ID or Deleted"));
            return res.json(updatedCompetitor);


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
    router.delete(`/:competitor_id`, async(req, res, next) => {

        // Valido el body si llega con el ID
        if (!req.params.competitor_id) {
            return next (new Error("ID is missing!"));
        }

        const deletedCompetitor = await CompetitorModel.findOne({
            attributes: {},
            where: {
                competitor_id: req.params.competitor_id,
                [sequelize.Op.not] : [{competitor_status: "X"}]
            }
        });

        // console.log("deletedCompetitor==>", deletedCompetitor);

        if (!deletedCompetitor) return next(new Error("Invalid ID or Deleted"));

        try {

            // // Actualizo estado con X
            // const [numberOfAffectedRows, affectedRows] = await CompetitorModel.update({
            //     competitor_status: "X",
            // },{
            //     where: {
            //         competitor_id: req.params.competitor_id,
            //         [sequelize.Op.not] : [{competitor_status: "X"}]
            //     },
            //     returning: true,
            //     // plain: true,
            // });
            // // Devuelvo media product eliminado
            // if (affectedRows==0) return next(new Error("Invalid User ID or Deleted"));

            // Borrado fisico
            await deletedCompetitor.destroy();

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
    


// ---------------------------------------------------- COMPETITOR-TRIED --------------------------------------------------------------

// FETCH COMPETITOR-TRIED
router.get( `/tried/v1/:competitor_external_id/:promocode_code` , async (req, res, next) => {

    
    // ---------------------------------------- FUNCIONES ------------------------------
    async function getStartCampaignDate(parameter_name='START_CAMPAIGN'){
    
        try{
            // Inicio de campaña en parameters
            return (await ParameterModel.findOne({
                raw: true,
                attributes: {},
                where: {
                    parameter_name:  { [sequelize.Op.eq]: parameter_name},
                }
            })).parameter_text || "";
        }
        catch(err){
            return next(new Error(`Error al obtener valor de parametro '${parameter_name}' : ${err.message}`))
        }
    }
    
    async function getIdPrizeDefault(parameter_name='DEFAULT_PRIZE'){
    
        try{
            // ID Premio Default en parameters
            return (await ParameterModel.findOne({
                raw: true,
                attributes: {},
                where: {
                    parameter_name:  { [sequelize.Op.eq]: parameter_name},
                }
            })).parameter_text || "";
        }
        catch(err){
            return next(new Error(`Error al obtener valor de parametro '${parameter_name}' : ${err.message}`))
        }
    }
    
    async function getPrizeDefault(idPremioDefault){
    
        try{
            // Premio Defaul desde modelo
            return await PrizeModel.findOne({
                raw: true,
                attributes: {},
                where: {
                    prize_id:  { [sequelize.Op.eq]: idPremioDefault},
                }
            });
        }
        catch(err){
            return next(new Error(`Error al obtener prize default '${idPremioDefault}' : ${err.message}`))
        }
    }
    
    async function isValidCompetitor(competitor_external_id){
        
        try{
            // Verifico si el jugador es valido
           return await CompetitorModel.findOne({
                attributes: {},
                where: {
                    competitor_external_id: competitor_external_id,
                    [sequelize.Op.not] : [{competitor_status: "X"}]
                }
            });
        }
        catch(err){
            return next(new Error(`Error al verificar competidor:${err.message}`))
        }
    }
    
    async function isValidPromocode(promocode_code){
        
        try{
            // Verifico si el codigo es valido
           return await PromocodeModel.findOne({
                raw: true,
                attributes: {},
                where: {
                    [sequelize.Op.and]: {
                        promocode_code: {[sequelize.Op.eq]: promocode_code},
                        promocode_status: {[sequelize.Op.notIn]: ["X"]}
                    }
                }
            });
        }
        catch(err){
            return next(new Error(`Error al verificar promocode:${err.message}`))
        }
    }
    
    async function markPromocodeAsUsed(promocode_code){
        
        try{
            // Marco codigo como usado
            var updateJSON = {};
            updateJSON['promocode_status'] = 'X';
            updateJSON['promocode_used_at'] = new Date();
            const [numberOfAffectedRows2, affectedRows2] = await PromocodeModel.update(updateJSON,
                {
                    where: {
                        promocode_code:  { [sequelize.Op.eq]: promocode_code},
                    },
                    returning: true,
                });
        }
        catch(err){
            return next(new Error(`Error al marcar promocode '${promocode_code}' como usado: ${err.message}`))
        }
    }
    
    async function isWinnerBefore(competitor_id){
        
        try{
            // Verifico si ya gano antes
            return await VwWinnersModel.findOne({
                attributes: {},
                where: {
                    competitor_id: competitor_id,
                }
            });

        }
        catch(err){
            return next(new Error(`Error al verificar si competidor '${competitor_id}' gano antes: ${err.message}`))
        }
    }
    
    async function hasInventory(parameter_name='DAYRI_PRIZE'){
        
        try{
            // Verifico si hay inventario de premios diarios
           return (await ParameterModel.findOne({
                raw: true,
                attributes: {},
                where: {
                    parameter_name:  { [sequelize.Op.eq]: parameter_name},
                }
            })).parameter_value || 0;
        }
        catch(err){
            return next(new Error(`Error al obtener valor de parametro '${parameter_name}' : ${err.message}`))
        }
    }
    
    async function getLimitProbability(parameter_name='LIMIT_PROBABILITY'){
        
        try{
            // Premio Defaul desde modelo
            return (await ParameterModel.findOne({
                raw: true,
                attributes: {},
                where: {
                    parameter_name:  { [sequelize.Op.eq]: parameter_name},
                }
            })).parameter_value || 50;
        }
        catch(err){
            return next(new Error(`Error al obtener valor de parametro '${parameter_name}' : ${err.message}`))
        }
    }
    
    async function updateInvetory(inventarioPremios, parameter_name='DAYRI_PRIZE'){
        
        try{
            // Rebajo inventario diario
            inventarioPremios = inventarioPremios-1;
            const [numberOfAffectedRows, affectedRows] = await ParameterModel.update({
                    parameter_value: inventarioPremios
                },
                {
                    where: {
                        parameter_name:  { [sequelize.Op.eq]: parameter_name},
                    },
                    returning: true,
                });
    
            return {
                error: false,
                message: `Actualizacion de parametro '${parameter_name}' OK`,
            };
            
        }
        catch(err){
            // return next(new Error(`Error al actualizar parametro '${parameter_name}' como usado: ${err.message}`));
            return {
                error: true,
                message: `Error al actualizar parametro '${parameter_name}' como usado: ${err.message}`,
            };
        }
    }
    
    
    // ---------------------------------------- PROCESOS --------------------------------
    
    // Objeto Premio
    var prize={};

    // Verifico parametros
    var idPremioDefault = await getIdPrizeDefault();
    if (!idPremioDefault) return next(new Error("Parametro DEFAULT_PRIZE no existe !"));

    var prizeDefault= await getPrizeDefault(idPremioDefault);
    if (!prizeDefault) return next(new Error("Premio default no existe !"));

    // Verifico competidor
    var competitor = await isValidCompetitor(req.params.competitor_external_id);
    if (!competitor) return next(new Error("Competidor no existe !"));
    
    // Verifico promocode
    var promocode = await isValidPromocode(req.params.promocode_code);
    if (!promocode) return next(new Error("Codigo no existe o ya fue usado !"));

    // Marco promocode como usado
    await markPromocodeAsUsed(req.params.promocode_code);

    // Verifico si gano antes
    var winner = await isWinnerBefore(competitor.competitor_id);
    if (!isEmpty(winner) || winner!=null){
        return res.json({
            gano: false,
            premio: prize
        })
    }
    
    // Verifico si hay cantidad premios disponibles
    var inventarioPremios = await hasInventory();
    if (inventarioPremios<=0) {
        return res.json({
            gano: false,
            premio: prize
        });
    }
    
    // Obtengo limite de probabilidad
    var limitProbability = await getLimitProbability();
    if (!limitProbability) return next(new Error("Parametro LIMIT_PROBABILITY no existe !"));

    // Obtengo numero aleatorio
    var triedNumber = parseInt(Math.random()*100) ;

    // Obtengo estado de comparacion (Gano o perdio)
    console.log(`Tirada: ${triedNumber}, Probabiliad: ${limitProbability}`);
    var triedStatus= triedNumber>limitProbability;
    
    // To save later on competitor_tried table
    var competitorTriedJSON={
        promocode_id: promocode.promocode_id,
        competitor_id: competitor.competitor_id
    };

    // ----------------------------------------------------------------------- GANO
    if (triedStatus) {
    
        // Rebajo inventario diario
        var isUpdated= await updateInvetory(inventarioPremios);
        if (isUpdated.error){
            return next(new Error(`${isUpdated.message}`));
        }

        // Agrego id premio al json de competitorTried
        competitorTriedJSON['prize_id']=prizeDefault.prize_id;
        
        // Grabo el competitors_tried
        var newCompetitorTried = await CompetitorTriedModel.create(competitorTriedJSON);
        if (!newCompetitorTried) return next(new Error("Error al grabar nuevo Competitor Tried !"));
        
        //retorno con datos del premio
        return res.json({
            gano: true,
            premio: {
                id: prizeDefault.prize_id,
                name: prizeDefault.prize_name,
                desc: prizeDefault.prize_desc,
                image: prizeDefault.prize_image
            }
        });
        
    }
    // -------------------------------------------------------------------------- PERDIO
    else {
    
        // Grabo el competitors_tried sin premio
        var newCompetitorTried = await CompetitorTriedModel.create(competitorTriedJSON);
        if (!newCompetitorTried) return next(new Error("Error al grabar nuevo Competitor Tried !"));
    
        // Retorno con datos del premio
        return res.json({
            gano: false,
            premio: {}
        });
    }
    
});


// FETCH COMPETITOR-TRIED *** WORKING NOW ***
router.get( `/tried/v2/:competitor_external_id/:promocode_code` , async (req, res, next) => {

    
    // ---------------------------------------- FUNCIONES ------------------------------
    async function getStartCampaignDate(parameter_name='START_CAMPAIGN'){
    
        try{
            // Inicio de campaña en parameters
            return (await ParameterModel.findOne({
                raw: true,
                attributes: {},
                where: {
                    parameter_name:  { [sequelize.Op.eq]: parameter_name},
                }
            })).parameter_text || "";
        }
        catch(err){
            return next(new Error(`Error al obtener valor de parametro '${parameter_name}' : ${err.message}`))
        }
    }
    
    async function isValidCompetitor(competitor_external_id){
        
        try{
            // Verifico si el jugador es valido
           return await CompetitorModel.findOne({
                attributes: {},
                where: {
                    competitor_external_id: competitor_external_id,
                    [sequelize.Op.not] : [{competitor_status: "X"}]
                }
            });
        }
        catch(err){
            return next(new Error(`Error al verificar competidor:${err.message}`))
        }
    }
    
    async function isValidPromocode(promocode_code){
        
        try{
            // Verifico si el codigo es valido
           return await PromocodeModel.findOne({
                raw: true,
                attributes: {},
                where: {
                    [sequelize.Op.and]: {
                        promocode_code: {[sequelize.Op.eq]: promocode_code},
                        promocode_status: {[sequelize.Op.notIn]: ["X"]}
                    }
                }
            });
        }
        catch(err){
            return next(new Error(`Error al verificar promocode:${err.message}`))
        }
    }
    
    async function markPromocodeAsUsed(promocode_code){
        
        try{
            // Marco codigo como usado
            var updateJSON = {};
            updateJSON['promocode_status'] = 'X';
            updateJSON['promocode_used_at'] = new Date();
            const [numberOfAffectedRows2, affectedRows2] = await PromocodeModel.update(updateJSON,
                {
                    where: {
                        promocode_code:  { [sequelize.Op.eq]: promocode_code},
                    },
                    returning: true,
                });
        }
        catch(err){
            return next(new Error(`Error al marcar promocode '${promocode_code}' como usado: ${err.message}`))
        }
    }
    
    async function isWinnerBefore(competitor_id){
        
        try{
            // Verifico si ya gano antes
            return await VwWinnersModel.findOne({
                attributes: {},
                where: {
                    competitor_id: competitor_id,
                }
            });

        }
        catch(err){
            return next(new Error(`Error al verificar si competidor '${competitor_id}' gano antes: ${err.message}`))
        }
    }
    
    async function getLimitProbability(parameter_name='LIMIT_PROBABILITY'){
        
        try{
            // Premio Defaul desde modelo
            return (await ParameterModel.findOne({
                raw: true,
                attributes: {},
                where: {
                    parameter_name:  { [sequelize.Op.eq]: parameter_name},
                }
            })).parameter_value || 50;
        }
        catch(err){
            return next(new Error(`Error al obtener valor de parametro '${parameter_name}' : ${err.message}`))
        }
    }
    
    async function getLimitToFrequent(parameter_name='FREQUENT_COMPETITOR_COUNT'){
        
        try{
            // Premio Defaul desde modelo
            return (await ParameterModel.findOne({
                raw: true,
                attributes: {},
                where: {
                    parameter_name:  { [sequelize.Op.eq]: parameter_name},
                }
            })).parameter_value || 10;
        }
        catch(err){
            return next(new Error(`Error al obtener valor de parametro '${parameter_name}' : ${err.message}`))
        }
    }
    
    async function getLimitFrequentProbability(parameter_name='FREQUENT_COMPETITOR_PROBABILITY'){
        
        try{
            // Premio Defaul desde modelo
            return (await ParameterModel.findOne({
                raw: true,
                attributes: {},
                where: {
                    parameter_name:  { [sequelize.Op.eq]: parameter_name},
                }
            })).parameter_value || 50;
        }
        catch(err){
            return next(new Error(`Error al obtener valor de parametro '${parameter_name}' : ${err.message}`))
        }
    }
    
    async function availableQtyPrizes(){
        try {
            // Obtener premios con cantidades disponibles
                        // prize_period_qty_remain:  { [sequelize.Op.gt]: 0 },
            return  (await PrizeModel.findAndCountAll({
                raw: true,
                attributes: {},
                where: {
                    [sequelize.Op.and]: {
                        prize_qty:  { [sequelize.Op.lt]: Sequelize.col('prize_period_qty') },
                        prize_status:  { [sequelize.Op.notIn]: ['X'] },
                    }
                }
            })).rows
        }
        catch(err){
            return next(new Error(`Error al obtener premios con cantidades disponibles : ${err.message}`))
        }
    }
    
    async function getRangePeriod(periodType, periodValue, lastReset) {
        try {
            var start, end;
    
            start = new Date();
            start.setTime(lastReset);
            start.setHours(0,0,0,0);
    
            switch (periodType) {
                case 'D':
                    end = new Date();
                    end.setTime(lastReset);
                    end.setHours(23,59,59,999);
                    
                    if (periodValue>1) {
                        //-1 include start date as part of days
                        end.setDate(end.getDate()+(periodValue-1));
                    }
                    return [start, end];
                    break;
                    
                case 'W':
                    end = new Date();
                    end.setTime(lastReset);
                    end.setDate(end.getDate()+6);
                    end.setHours(23,59,59,999);
    
                    if (periodValue>1) {
                        //*6 include start date as part of week
                        end.setDate(end.getDate()+((periodValue-1)*6)+(periodValue-1));
                    }
                    return [start, end];
                    break;
                case 'M':
                    end = new Date();
                    end.setTime(lastReset);
                    end.setDate(end.getDate()+30);
                    end.setHours(23,59,59,999);
    
                    if (periodValue>1) {
                        //*30 include start date as part of month
                        end.setDate(end.getDate()+((periodValue-1)*30)+(periodValue-1));
                    }
                    return [start, end];
                    break;
                case 'Y':
                    end = new Date();
                    end.setTime(lastReset);
                    end.setDate(end.getDate()+365);
                    end.setHours(23,59,59,999);
    
                    if (periodValue>1) {
                        //*365 include start date as part of month
                        end.setDate(end.getDate()+((periodValue-1)*365)+(periodValue-1));
                    }
                    return [start, end];
                    break;
                default:
                
            }
        }
        catch(err){
            console.log(`No se pudo obtener el rango del periodo ${periodType} con el valor ${periodValue}`);
        }
        
    
    }
    
    async function isValidTimePrizeRequest(periodType, periodValue, lastDelivery, currDate) {
        try {
            var timeDiff;

            // Si lastDelivery es null
            lastDelivery = (lastDelivery || new Date(-8640000000000000));
            
            // Comparo la diferencia entre el momento actual y el ultimo delivery
            // y si se puede o no dar premio
            switch (periodType) {
                case 'H':
                    timeDiff=  Number(((((currDate.getTime() - lastDelivery.getTime()) / 1000)/60)/60).toFixed(2))  ;
                    break;
                    
                 case 'D':
                     timeDiff=  Number((((((currDate.getTime() - lastDelivery.getTime()) / 1000)/60)/60)/24).toFixed(2))  ;
                     break;
                
                default:
                
            }
            // console.log(`timeDiff-->${timeDiff}`);
            return {
                error: false,
                message: ((timeDiff || 0)>periodValue)
            }
            
            
        }
        catch(err){
            console.log(`No se pudo obtener valides del periodo ${periodType} con el valor ${periodValue}, error: ${err.message}`);
            return {
                error: true,
                message: `No se pudo obtener valides del periodo ${periodType} con el valor ${periodValue}`
            }
        }
        
    
    }
    
    async function availableTimePrizes(array) {
    
        var newArray=[];
        var i = 0, len = array.length;
        const currDate= new Date();
        
        while (i < len) {
            // console.log(array[i].prize_name);
            // // Obtengo rangos de periodicidad
            // const [startRange, endRange] =
            // await getRangePeriod(array[i].prize_period_type, array[i].prize_period_value, array[i].prize_last_reset);
            // // console.log(`Period type ${array[i].prize_period_type} has range : ${startRange} - ${endRange}`);
            //
            // // Verifico si esta en el rango del periodo y hay cantidad disponible lo agrego al nuevo array
            // var _now=new Date();
            // if(
            //     (startRange<=_now) &&
            //     (_now<=endRange) &&
            //     ((array[i].prize_period_qty - array[i].prize_qty)>0 ) )
            // {
            //     newArray.push(array[i]);
            // }

            // Verifico si cumple con periodicidad de entrega de premios
            var isValidPrizeRequest= await isValidTimePrizeRequest(
                array[i].prize_period_type,
                array[i].prize_period_value,
                array[i].prize_last_delivery,
                currDate);
            // console.log(`isValidPrizeRequest-->${JSON.stringify(isValidPrizeRequest)}`);
            
            if (
                isValidPrizeRequest.message
                && ((array[i].prize_period_qty - array[i].prize_qty)>0 )
            )
            {
                newArray.push(array[i]);
            }
            // else {
            //     return next(new Error(`${isValidTimePrizeRequest.message}`));
            // }
            
            i++
        }
        
        return newArray
    }
    
    async function updatePrizeQty(id){
        
        try{
            // Aumento cantidad de premio entregado y tiempo de entrega
            var lastDelivery= new Date();
            const [numberOfAffectedRows3, affectedRows3] = await PrizeModel.update({
                    prize_qty: Sequelize.literal('prize_qty + 1'),
                    prize_last_delivery: lastDelivery
                },
                {
                    where: {
                        prize_id:  { [sequelize.Op.eq]: id},
                    },
                    returning: true,
                });
    
            return {
                error: false,
                message: `Actualizacion de cantidad entregada de premio OK`,
            };
            
        }
        catch(err){
            // return next(new Error(`Error al actualizar cantidad entregada de premio '${id}' : ${err.message}`));
            return {
                error: true,
                message: `Error al actualizar cantidad entregada de premio '${id}' : ${err.message}`,
            };
            
        }
    }

    async function getTriedsCompetitor(id){
        try{
            // Verifico si el jugador es frecuente
            return (await sequelizedb.query(
                'SELECT competitor_id, count(competitor_tried_id) as competitor_count FROM competitor_tried WHERE competitor_id = $competitor_id GROUP BY competitor_id ',
                {
                    bind: {competitor_id: id},
                    type: QueryTypes.SELECT,
                    raw: true
                }
            ))[0]['competitor_count'] || 0;
        }
        catch(err){
            return next(new Error(`Error al obtener frecuencia del competidor:${err.message}`))
        }
        
    }
    
    // ---------------------------------------- PROCESOS --------------------------------
    
    // Objeto Premio
    var prize={};

    // Verifico competidor
    var competitor = await isValidCompetitor(req.params.competitor_external_id);
    if (!competitor) return next(new Error("Competidor no existe !"));

    // Verifico promocode
    var promocode = await isValidPromocode(req.params.promocode_code);
    // console.log(`promocode-->${JSON.stringify(promocode)}`);
    if (!promocode) return next(new Error("Código no existe o ya fue usado !"));
    
    // Marco Promocode como usado
    await markPromocodeAsUsed(req.params.promocode_code);
    
    // To save later on competitor_tried table
    var competitorTriedJSON={
        promocode_id: promocode.promocode_id,
        competitor_id: competitor.competitor_id
    };

    var newCompetitorTried;
    
    // Verifico cantidad de premios disponibles
    const prizeQtyArray= await availableQtyPrizes();
    if (!prizeQtyArray || prizeQtyArray.length==0){
        newCompetitorTried = await CompetitorTriedModel.create(competitorTriedJSON);
        return res.json({
            gano: false,
            premio: prize
        })
    }
    
    // Verifico la disponibilidad de cada premio segun su periodo de entrega
    const availableArrayPrize = await availableTimePrizes(prizeQtyArray);
    // console.log(`availableArrayPrize-->${JSON.stringify(availableArrayPrize)}`);
    console.log(`availableArrayPrize.length-->${availableArrayPrize.length}`);
    if (!availableArrayPrize || availableArrayPrize.length==0){
        newCompetitorTried = await CompetitorTriedModel.create(competitorTriedJSON);
        return res.json({
            gano: false,
            competidor: competitor.competitor_id,
            premio: prize
        })
    }

    // Obtengo limite de probabilidad
    var limitProbability = await getLimitProbability();
    if (!limitProbability) return next(new Error("Parametro LIMIT_PROBABILITY no existe !"));
    
    // comparo frecuencia para ver si cambia la probabilidad
    var triedsCompetitor = await getTriedsCompetitor(competitor.competitor_id);
    var limitToFrequent = await getLimitToFrequent();
    if (!limitToFrequent) return next(new Error("Parametro FREQUENT_COMPETITOR_COUNT no existe !"));
    console.log(`triedsCompetitor=${triedsCompetitor}, limitToFrequent=${limitToFrequent}`);
    
    // Si las jugadas son mayores al parametro se lo considera COMPETIDOR FRECUENTE
    if (limitToFrequent>0 && triedsCompetitor>limitToFrequent){
        var frequentLimitProbability = await getLimitFrequentProbability();
        if (!limitToFrequent) return next(new Error("Parametro FREQUENT_COMPETITOR_PROBABILITY no existe !"));
        limitProbability=frequentLimitProbability;
    } else {
        // Verifico si gano antes
        var winner = await isWinnerBefore(competitor.competitor_id);
        if (!isEmpty(winner) || winner!=null){
            // Tambien debo grabar la tirada
            newCompetitorTried = await CompetitorTriedModel.create(competitorTriedJSON);
            if (!newCompetitorTried) return next(new Error("Error al grabar nuevo Competitor Tried !"));
            
            return res.json({
                gano: false,
                competidor: competitor.competitor_id,
                premio: prize
            })
        }
    }
    // console.log(`limitProbability-->${limitProbability}`);
    
    // Obtengo numero aleatorio
    var triedNumber = parseInt(Math.random()*100) ;

    // Obtengo estado de comparacion (Gano o perdio)
    console.log(`Tirada: ${triedNumber}, Probabilidad: ${limitProbability}`);
    var triedStatus= triedNumber>limitProbability;


    // Proceso segun estado de comparacion
    // --------------------------------------------------------------- GANO
    if (triedStatus) {
    
        //Busco premio aleatoriamente en array de premios disponibles
        var indexPrize = ((Math.floor(
            Math.random() * ((availableArrayPrize.length+1) - 1) + 1
        ))-1);

        // Actualizo QTY en tabla de premios
        var isUpdated= await updatePrizeQty(availableArrayPrize[indexPrize].prize_id);
        if (isUpdated.error) {
            return next(new Error(`${isUpdated.message}`));
        }
        
        // Agrego id de premio al json de competitorTried
        competitorTriedJSON['prize_id']=availableArrayPrize[indexPrize].prize_id;

        // Grabo el competitors_tried
        // console.log(`competitorTriedJSON--${JSON.stringify(competitorTriedJSON)}`)
        newCompetitorTried = await CompetitorTriedModel.create(competitorTriedJSON);
        if (!newCompetitorTried) return next(new Error("Error al grabar nuevo Competitor Tried !"));

        //retorno con datos del premio
        return res.json({
            gano: true,
            competidor: competitor.competitor_id,
            premio: {
                id: availableArrayPrize[indexPrize].prize_id,
                name: availableArrayPrize[indexPrize].prize_name,
                desc: availableArrayPrize[indexPrize].prize_desc,
                image: availableArrayPrize[indexPrize].prize_image
            }
        });
        
    }
    // --------------------------------------------------------------- PERDIO
    else {
        // Grabo el competitors_tried sin premio
        // console.log(`competitorTriedJSON--${JSON.stringify(competitorTriedJSON)}`)
        newCompetitorTried = await CompetitorTriedModel.create(competitorTriedJSON);
        if (!newCompetitorTried) return next(new Error("Error al grabar nuevo Competitor Tried !"));
        
        // Retorno con datos del premio
        return res.json({
            gano: false,
            competidor: competitor.competitor_id,
            premio: {}
        });
    }
    
});

// --------------------------------------------------------- VIEWS --------------------------------------------------------------------
// *** FETCH ALL COMPETITOR-TRIED-VIEW-COUNT
router.get( `/tried/view/count` , async (req, res, next) => {
    
    try {
        const competitors_tried = await CompetitorTriedViewModel.findAndCountAll();
        return res.json(competitors_tried);
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

// *** FETCH ALL COMPETITOR-TRIED-VIEW
router.post( `/tried/view` , async (req, res, next) => {
    console.log(`req.body.args-->${JSON.stringify(req.body.args)}`);
    // var filter={};
    // if ('filter' in req.body.args) {
    //     console.log('encontro filter');
    //     filter = await getWhere({filter: req.body.args.filter, status: ""});
    // }
    const filter = (('filter' in req.body.args) ? await getWhere({filter: req.body.args.filter, status: ""}) : {});

    try {
        const competitors_tried = await CompetitorTriedViewModel.findAndCountAll({
            order: [['competitor_tried_at','asc']],
            attributes: {},
            where: filter
        });
        return res.json(competitors_tried);
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

module.exports = router;
