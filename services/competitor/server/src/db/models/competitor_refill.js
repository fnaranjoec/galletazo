import {DataTypes, Model, Sequelize} from "sequelize";
import sequelize from "../connection";
import {CompetitorTriedModel} from "../models/competitor_tried";

// ********************************************* COMPETITOR **************************************
// export class CompetitorRefillModel extends Model {}
// CompetitorRefillModel.init(
//     {
//         competitor_refill_id: {
//             allowNull: false,
//             primaryKey: true,
//             type: DataTypes.STRING(36)
//         },
//         competitor_id: {
//             allowNull: false,
//             type: DataTypes.STRING(36)
//         },
//         competitor_refill_phone: {
//             allowNull: false,
//             type: DataTypes.STRING(20),
//         },
//         competitor_refill_company: {
//             allowNull: false,
//             type: DataTypes.STRING(100),
//         },
//         competitor_refill_value: {
//             allowNull: true,
//             type: DataTypes.INTEGER,
//         },
//         competitor_refill_status: {
//             allowNull: false,
//             type: DataTypes.CHAR(1),
//             defaultValue: "A"
//         },
//         competitor_refill_created: {
//             allowNull: false,
//             type: DataTypes.DATE,
//         },
//     },
//     {
//         modelName: "competitor_refill",
//         tableName: "competitor_refill",
//         timestamps: true,
//         createdAt: 'competitor_refill_created',
//         updatedAt: false,
//         sequelize
//     }
// );

export class CompetitorRefillModel extends Model {}
CompetitorRefillModel.init(
    {
        competitor_refill_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING(36)
        },
        competitor_id: {
            allowNull: false,
            type: DataTypes.STRING(36)
        },
        competitor_refill_phone: {
            allowNull: false,
            type: DataTypes.STRING(20),
        },
        competitor_refill_company: {
            allowNull: false,
            type: DataTypes.STRING(100),
        },
        competitor_refill_value: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
        competitor_refill_status: {
            allowNull: false,
            type: DataTypes.CHAR(1),
            defaultValue: "A"
        },
        competitor_refill_created: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        competitor_firstname: {
            allowNull: true,
            type: DataTypes.STRING(255)
        },
        competitor_lastname: {
            allowNull: true,
            type: DataTypes.STRING(255)
        },
        competitor_email: {
            allowNull: true,
            type: DataTypes.STRING(36)
        },
        competitor_city: {
            allowNull: true,
            type: DataTypes.STRING(100)
        },
        competitor_identification: {
            allowNull: true,
            type: DataTypes.CHAR(20)
        },
    },
    {
        modelName: "vw_competitor_refill",
        tableName: "vw_competitor_refill",
        timestamps: true,
        createdAt: 'competitor_refill_created',
        updatedAt: false,
        sequelize
    }
);


// ********************************************** VIEWS **********************************



// ****************************************** RELATIONS ***********************************
