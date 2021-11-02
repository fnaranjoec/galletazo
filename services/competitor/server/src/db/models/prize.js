import {DataTypes, Model, Sequelize} from "sequelize";
import sequelize from "../connection";
import {CompetitorTriedModel} from "./competitor_tried";

// ********************************************* PRIZE **************************************
export class PrizeModel extends Model {}
PrizeModel.init(
    {
        prize_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING(36)
        },
        prize_name: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
        prize_desc: {
            allowNull: true,
            type: DataTypes.TEXT,
        },
        prize_image: {
            allowNull: false,
            type: DataTypes.STRING(500),
        },
        prize_qty: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        prize_period_type: {
            allowNull: false,
            type: DataTypes.CHAR(1),
            defaultValue: "D"
        },
        prize_period_value: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        prize_last_delivery: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        prize_created: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        prize_status: {
            allowNull: false,
            type: DataTypes.CHAR(1),
            defaultValue: "A"
        },
        prize_period_qty: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        prize_last_reset: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        // prize_period_qty_remain: {
        //     type: Sequelize.VIRTUAL,
        //     get () {
        //         return this.getDataValue('prize_period_qty') - this.getDataValue('prize_qty');
        //     }
        // },
    },
    {
        modelName: "prize",
        tableName: "prize",
        timestamps: true,
        createdAt: 'prize_created',
        updatedAt: false,
        sequelize
    }
);



// ********************************************** VIEWS **********************************



// ****************************************** RELATIONS ***********************************


// CompetitorTriedModel.belongsTo(PrizeModel,{
//     foreignKey: "prize_id",
// });

