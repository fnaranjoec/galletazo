import {DataTypes, Model, Sequelize} from "sequelize";
import sequelize from "../connection";

// ********************************************* MESSAGE **************************************
export class MessageModel extends Model {}
MessageModel.init(
    {
        message_id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        message_code: {
            allowNull: false,
            type: DataTypes.CHAR(20)
        },
        message_title: {
            allowNull: false,
            type: DataTypes.STRING(255)
        },
        message_text: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        message_severity: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        message_created: {
            allowNull: false,
            type: DataTypes.DATE,
        }
    },
    {
        modelName: "message",
        tableName: "message",
        createdAt: 'message_created',
        updatedAt: false,
        sequelize
    }
);



// ********************************************** VIEWS **********************************



// ****************************************** RELATIONS ***********************************

