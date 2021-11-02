import {DataTypes, Model, Sequelize} from "sequelize";
import sequelize from "../connection";
import {CompetitorTriedModel} from "../models/competitor_tried";

// ********************************************* COMPETITOR **************************************
export class CompetitorModel extends Model {}
CompetitorModel.init(
    {
        competitor_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING(36)
        },
        competitor_firstname: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
        competitor_lastname: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
        competitor_email: {
            allowNull: true,
            type: DataTypes.STRING(255),
        },
        competitor_phone: {
            allowNull: true,
            type: DataTypes.STRING(20),
        },
        competitor_identification: {
            allowNull: true,
            type: DataTypes.CHAR(20),
        },
        competitor_dob: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        competitor_city: {
            allowNull: true,
            type: DataTypes.STRING(100),
        },
        competitor_external_id: {
            allowNull: false,
            type: DataTypes.STRING(36)
        },
        competitor_created: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        competitor_status: {
            allowNull: false,
            type: DataTypes.CHAR(1),
            defaultValue: "A"
        },
    },
    {
        modelName: "competitor",
        tableName: "competitor",
        timestamps: true,
        createdAt: 'competitor_created',
        updatedAt: false,
        sequelize
    }
);



// ********************************************** VIEWS **********************************



// ****************************************** RELATIONS ***********************************

CompetitorModel.hasMany(CompetitorTriedModel,{
    foreignKey: "competitor_id",
});

CompetitorTriedModel.belongsTo(CompetitorModel,{
    foreignKey: "competitor_id",
});

