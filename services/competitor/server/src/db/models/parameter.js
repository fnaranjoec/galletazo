import {DataTypes, Model, Sequelize} from "sequelize";
import sequelize from "../connection";

// ********************************************* PARAMETER **************************************
export class ParameterModel extends Model {}
ParameterModel.init(
    {
        parameter_id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        parameter_name: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING(100)
        },
        parameter_desc: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        parameter_text: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        parameter_value: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        parameter_created: {
            allowNull: false,
            type: DataTypes.DATE,
        }
    },
    {
        modelName: "parameter",
        tableName: "parameter",
        timestamps: true,
        createdAt: 'parameter_created',
        updatedAt: false,
        sequelize
    }
);


// ********************************************** VIEWS **********************************


// ****************************************** RELATIONS ***********************************
