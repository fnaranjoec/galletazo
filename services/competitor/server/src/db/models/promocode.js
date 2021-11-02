import {DataTypes, Model, Sequelize} from "sequelize";
import sequelize from "../connection";
import {CompetitorTriedModel} from "../models/competitor_tried";

// ********************************************* PROMOCODE **************************************
export class PromocodeModel extends Model {}
PromocodeModel.init(
    {
        promocode_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING(36)
        },
        promocode_code: {
            allowNull: false,
            type: DataTypes.STRING(100),
        },
        promocode_created: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        promocode_status: {
            allowNull: false,
            type: DataTypes.CHAR(1),
            defaultValue: "A"
        },
        promocode_used_at: {
            allowNull: true,
            type: DataTypes.DATE,
        },
    },
    {
        modelName: "promocode",
        tableName: "promocode",
        timestamps: true,
        createdAt: 'promocode_created',
        updatedAt: false,
        sequelize
    }
);



// ********************************************** VIEWS **********************************



// ****************************************** RELATIONS ***********************************


