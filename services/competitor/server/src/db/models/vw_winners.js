import {DataTypes, Model, Sequelize} from "sequelize";
import sequelize from "../connection";
import {CompetitorTriedModel} from "../models/competitor_tried";

// ********************************************* VW-WINNERS **************************************
export class VwWinnersModel extends Model {}
VwWinnersModel.init(
    {
        competitor_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING(36)
        },
    },
    {
        modelName: "vw_winners",
        tableName: "vw_winners",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        sequelize
    }
);


// ****************************************** RELATIONS ***********************************

