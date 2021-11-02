import {DataTypes, Model, Sequelize} from "sequelize";
import sequelize from "../connection";

import {CompetitorModel} from "../models/competitor";
import {PrizeModel} from "../models/prize";
import {PromocodeModel} from "../models/promocode";

// ********************************************* COMPETITOR-TRIED **************************************
export class CompetitorTriedModel extends Model {}
CompetitorTriedModel.init(
    {
        competitor_tried_id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement:true,
            type: DataTypes.BIGINT
        },
        promocode_id: {
            allowNull: false,
            type: DataTypes.STRING(36),
            onUpdate: "CASCADE",
            references: {
                key:"promocode_id",
                model: "promocode",
                as: "promocode_id",
            }
        },
        competitor_id: {
            allowNull: false,
            type: DataTypes.STRING(36),
            onUpdate: "CASCADE",
            references: {
                key:"competitor_id",
                model: "competitor",
                as: "competitor_id",
            }
        },
        prize_id: {
            allowNull: true,
            type: DataTypes.STRING(36),
            onUpdate: "CASCADE",
            references: {
                key:"prize_id",
                model: "prize",
                as: "prize_id",
            }
        },
        competitor_tried_at: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        competitor_tried_status: {
            allowNull: true,
            type: DataTypes.CHAR(1),
            defaultValue: "A"
        },
    },
    {
        modelName: "competitor_tried",
        tableName: "competitor_tried",
        timestamps: true,
        createdAt: 'competitor_tried_at',
        updatedAt: false,
        sequelize
    }
);


// ********************************************** VIEWS **********************************



// ****************************************** RELATIONS ***********************************

// CompetitorModel.hasMany(CompetitorTriedModel, {as:'competitor_tried', foreignKey:'competitor_id'});
// PrizeModel.hasMany(CompetitorTriedModel, {as:'competitor_tried', foreignKey:'prize_id'});
// PromocodeModel.hasMany(CompetitorTriedModel, {as:'competitor_tried', foreignKey:'promocode_id'});
