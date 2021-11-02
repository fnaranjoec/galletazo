import {DataTypes, Model, Sequelize} from "sequelize";
import sequelize from "../connection";

import {CompetitorModel} from "../models/competitor";
import {PrizeModel} from "../models/prize";
import {PromocodeModel} from "../models/promocode";

// ********************************************* COMPETITOR-TRIED **************************************
export class CompetitorTriedViewModel extends Model {}
CompetitorTriedViewModel.init(
    {
        competitor_tried_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        competitor_tried_at: {
            allowNull: false,
            type: DataTypes.DATE
        },
        promocode_code: {
            allowNull: false,
            type: DataTypes.STRING(100)
        },
        competitor_firstname: {
            allowNull: false,
            type: DataTypes.STRING(255)
        },
        competitor_lastname: {
            allowNull: false,
            type: DataTypes.STRING(255)
        },
        competitor_email: {
            allowNull: false,
            type: DataTypes.STRING(255)
        },
        competitor_phone: {
            allowNull: true,
            type: DataTypes.STRING(20)
        },
        prize_name: {
            allowNull: false,
            type: DataTypes.STRING(255)
        }
    },
    {
        modelName: "vw_trieds",
        tableName: "vw_trieds",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        sequelize
    }
);


// ********************************************** VIEWS **********************************



// ****************************************** RELATIONS ***********************************

// CompetitorModel.hasMany(CompetitorTriedModel, {as:'competitor_tried', foreignKey:'competitor_id'});
// PrizeModel.hasMany(CompetitorTriedModel, {as:'competitor_tried', foreignKey:'prize_id'});
// PromocodeModel.hasMany(CompetitorTriedModel, {as:'competitor_tried', foreignKey:'promocode_id'});
