import {DataTypes, Model, Sequelize} from "sequelize";
import sequelize from "#root/db/connection";

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

//
// // ********************************************* MESSAGE **************************************
// export class MessageModel extends Model {}
// MessageModel.init(
//     {
//         message_id: {
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true,
//             type: DataTypes.INTEGER
//         },
//         message_code: {
//             allowNull: false,
//             type: DataTypes.CHAR(20)
//         },
//         message_title: {
//             allowNull: false,
//             type: DataTypes.STRING(255)
//         },
//         message_text: {
//             allowNull: false,
//             type: DataTypes.TEXT
//         },
//         message_severity: {
//             allowNull: false,
//             type: DataTypes.INTEGER
//         },
//         message_created: {
//             allowNull: false,
//             type: DataTypes.DATE,
//         }
//     },
//     {
//         modelName: "message",
//         tableName: "message",
//         createdAt: 'message_created',
//         updatedAt: false,
//         sequelize
//     }
// );



// ********************************************* USER **************************************
export class UserModel extends Model {}
UserModel.init(
    {
        user_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING(36)
        },
        user_origin: {
            allowNull: true,
            type: DataTypes.STRING(36),
            onUpdate: "CASCADE",
            references: {
                key:"user_origin",
                model: "user",
                as: "user_id",
            }
        },
        user_name: {
            allowNull: true,
            type: DataTypes.STRING(255),
        },
        user_email: {
            allowNull: false,
            type: DataTypes.STRING(500),
        },
        user_entry_pos: {
            allowNull: false,
            type: DataTypes.BIGINT,
            autoIncrement: true,
        },
        user_status: {
            allowNull: false,
            type: DataTypes.CHAR(1),
            defaultValue: "A"
        },
        user_created: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        user_lat: {
            allowNull: true,
            type: DataTypes.FLOAT,
        },
        user_lon: {
            allowNull: true,
            type: DataTypes.FLOAT,
        },
        user_browser: {
            allowNull: true,
            type: DataTypes.CHAR(50),
        },
        user_ip: {
            allowNull: true,
            type: DataTypes.CHAR(20),
        },
        user_os: {
            allowNull: true,
            type: DataTypes.CHAR(20),
        },
        user_country: {
            allowNull: true,
            type: DataTypes.CHAR(50),
        },
        user_lang: {
            allowNull: true,
            type: DataTypes.CHAR(20),
        },
        user_shorturl: {
            allowNull: true,
            type: DataTypes.STRING(500),
        },
    },
    {
        modelName: "user",
        tableName: "user",
        timestamps: true,
        createdAt: 'user_created',
        updatedAt: false,
        sequelize
    }
);



// ********************************************* USER_REFERENCIAL **************************************
export class UserReferencialModel extends Model {}
UserReferencialModel.init(
    {
        user_referencial_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING(36)
        },
        user_id: {
            allowNull: false,
            type: DataTypes.STRING(36),
            onUpdate: "CASCADE",
            references: {
                key:"user_id",
                model: "user",
                as: "user_id",
            }
        },
        user_id_new: {
            allowNull: false,
            type: DataTypes.STRING(36),
        },
        user_referencial_created: {
            allowNull: false,
            type: DataTypes.DATE,
        },
    },
    {
        modelName: "user_referencial",
        tableName: "user_referencial",
        timestamps: true,
        createdAt: 'user_referencial_created',
        updatedAt: false,
        sequelize
    }
);



// --- USERS RANK ---
export class UserRankModel extends Model {}
UserRankModel.init(
    {
        user_rank: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        user_email: {
            allowNull: false,
            type: DataTypes.STRING(500),
        },
        user_shorturl: {
            allowNull: true,
            type: DataTypes.STRING(500),
        },
        user_id: {
            allowNull: false,
            type: DataTypes.STRING(36),
        },
        user_entry_pos: {
            allowNull: false,
            type: DataTypes.BIGINT,
        },
        user_qty_referencial: {

            allowNull: false,
            type: DataTypes.BIGINT,
        },
    },
    {
        sequelize,
        modelName: "user_rank",
        tableName: "user_rank",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }


);


// ****************************************** RELATIONS ***********************************


UserModel.hasMany(UserReferencialModel,{
    foreignKey: "user_id",
});

UserReferencialModel.belongsTo(UserModel,{
    foreignKey: "user_id",
});

UserModel.hasMany(UserModel,{
    foreignKey: "user_origin",
});

UserModel.belongsTo(UserModel,{
    foreignKey: "user_origin",
});






