import {DataTypes, Model, Sequelize} from "sequelize";
import sequelize from "./connection";

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
//
//
// // ********************************************* COUNTRY **************************************
// export class CountryModel extends Model {}
// CountryModel.init(
//     {
//         country_id: {
//             allowNull: false,
//             primaryKey: true,
//             type: DataTypes.STRING(36)
//         },
//         country_name: {
//             allowNull: false,
//             unique: true,
//             type: DataTypes.STRING(100)
//         },
//         country_created: {
//             allowNull: false,
//             type: DataTypes.DATE,
//         }
//     },
//     {
//         modelName: "country",
//         tableName: "country",
//         timestamps: true,
//         createdAt: 'country_created',
//         updatedAt: false,
//         sequelize
//     }
// );
//
// // ********************************************* SOCIAL **************************************
// export class SocialModel extends Model {}
// SocialModel.init(
//     {
//         social_id: {
//             allowNull: false,
//             primaryKey: true,
//             type: DataTypes.STRING(36)
//         },
//         social_name: {
//             allowNull: false,
//             unique: true,
//             type: DataTypes.STRING(100)
//         },
//         social_created: {
//             allowNull: false,
//             type: DataTypes.DATE,
//         }
//     },
//     {
//         modelName: "social",
//         tableName: "social",
//         timestamps: true,
//         createdAt: 'social_created',
//         updatedAt: false,
//         sequelize
//     }
// );
//
//
//
// // ********************************************* ROL **************************************
// export class RolModel extends Model {}
// RolModel.init(
//     {
//         rol_id: {
//             allowNull: false,
//             primaryKey: true,
//             type: DataTypes.STRING(36)
//         },
//         rol_name: {
//             allowNull: false,
//             unique: true,
//             type: DataTypes.STRING(100)
//         },
//         rol_created: {
//             allowNull: false,
//             type: DataTypes.DATE,
//         }
//     },
//     {
//         modelName: "rol",
//         tableName: "rol",
//         timestamps: true,
//         createdAt: 'rol_created',
//         updatedAt: false,
//         sequelize
//     }
// );
//
//
//
// // ********************************************* PERSON **************************************
// export class PersonModel extends Model {}
// PersonModel.init(
//     {
//         person_id: {
//             allowNull: false,
//             primaryKey: true,
//             type: DataTypes.STRING(36),
//         },
//         country_id: {
//             allowNull: false,
//             type: DataTypes.STRING(36),
//             onUpdate: "CASCADE",
//             references: {
//                 key:"country_id",
//                 model: "country",
//                 as: "country_id",
//             }
//         },
//         person_fname: {
//             allowNull: false,
//             type: DataTypes.STRING(100)
//         },
//         person_lname: {
//             allowNull: false,
//             type: DataTypes.STRING(100)
//         },
//         person_occupation: {
//             allowNull: false,
//             type: DataTypes.STRING(100)
//         },
//         person_bio: {
//             allowNull: false,
//             type: DataTypes.TEXT
//         },
//         person_city: {
//             allowNull: true,
//             type: DataTypes.STRING(100)
//         },
//         person_dob: {
//             allowNull: true,
//             type: DataTypes.DATE
//         },
//         person_company: {
//             allowNull: true,
//             type: DataTypes.STRING(100)
//         },
//         person_website: {
//             allowNull: true,
//             type: DataTypes.STRING(500)
//         },
//         person_status: {
//             allowNull: false,
//             type: DataTypes.CHAR(1),
//             defaultValue: "A"
//         },
//         person_created: {
//             allowNull: false,
//             type: DataTypes.DATE,
//         },
//         person_updated: {
//             allowNull: true,
//             type: DataTypes.DATE,
//         }
//     },
//     {
//         modelName: "person",
//         tableName: "person",
//         timestamps: true,
//         createdAt: 'person_created',
//         updatedAt: 'person_updated',
//         sequelize
//     }
// );
//
// // ********************************************* PERSON_SOCIAL **************************************
// export class PersonSocialModel extends Model {}
// PersonSocialModel.init(
//     {
//         person_social_id: {
//             allowNull: false,
//             primaryKey: true,
//             type: DataTypes.STRING(36),
//         },
//         social_id: {
//             allowNull: false,
//             type: DataTypes.STRING(36),
//             onUpdate: "CASCADE",
//             references: {
//                 key:"social_id",
//                 model: "social",
//                 as: "social_id",
//             }
//         },
//         person_id: {
//             allowNull: false,
//             type: DataTypes.STRING(36),
//             onUpdate: "CASCADE",
//             references: {
//                 key:"person_id",
//                 model: "person",
//                 as: "person_id",
//             }
//         },
//         person_social_link: {
//             allowNull: false,
//             type: DataTypes.STRING(500)
//         },
//         person_social_status: {
//             allowNull: false,
//             type: DataTypes.CHAR(1),
//             defaultValue: "A"
//         },
//         person_social_created: {
//             allowNull: false,
//             type: DataTypes.DATE,
//         },
//         person_social_updated: {
//             allowNull: true,
//             type: DataTypes.DATE,
//         }
//     },
//     {
//         modelName: "person_social",
//         tableName: "person_social",
//         timestamps: true,
//         createdAt: 'person_social_created',
//         updatedAt: 'person_social_updated',
//         sequelize
//     }
// );
//
//

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

// // ********************************************* USER ROL **************************************
// export class UserRolModel extends Model {}
// UserRolModel.init(
//     {
//         user_rol_id: {
//             allowNull: false,
//             primaryKey: true,
//             type: DataTypes.STRING(36)
//         },
//         rol_id: {
//             allowNull: false,
//             type: DataTypes.STRING(36),
//             onUpdate: "CASCADE",
//             references: {
//                 key: "rol_id",
//                 model: "rol",
//                 as: "rol_id",
//             }
//         },
//         user_id: {
//             allowNull: false,
//             type: DataTypes.STRING(36),
//             onUpdate: "CASCADE",
//             references: {
//                 key: "user_id",
//                 model: "competitor",
//                 as: "user_id",
//             }
//         },
//         user_rol_status: {
//             allowNull: false,
//             type: DataTypes.CHAR(1),
//             defaultValue: "A"
//         },
//     },
//     {
//         modelName: "user_rol",
//         tableName: "user_rol",
//         timestamps: true,
//         createdAt: 'user_rol_created',
//         updatedAt: false,
//         sequelize
//     }
// );
//
//
// // ********************************************* SESSION **************************************
// export class UserSessionModel extends Model {}
// UserSessionModel.init(
//     {
//         session_id: {
//             allowNull: false,
//             primaryKey: true,
//             type: DataTypes.STRING(36),
//         },
//         user_id: {
//             allowNull: false,
//             type: DataTypes.STRING(36),
//         },
//         session_access_token: {
//             allowNull: false,
//             type: DataTypes.TEXT
//         },
//         session_refresh_token: {
//             allowNull: false,
//             type: DataTypes.TEXT
//         },
//         session_status: {
//             allowNull: false,
//             type: DataTypes.CHAR(1),
//             defaultValue: "A"
//         },
//         session_created: {
//             allowNull: false,
//             type: DataTypes.DATE,
//         },
//
//     },
//     {
//         modelName: "session",
//         tableName: "session",
//         timestamps: true,
//         createdAt: 'session_created',
//         updatedAt: false,
//         sequelize
//     }
// );
//
//
//
// // ********************************************* CUSTOMER **************************************
// export class CustomerModel extends Model {}
// CustomerModel.init(
//     {
//         customer_id: {
//             allowNull: false,
//             primaryKey: true,
//             type: DataTypes.STRING(36)
//         },
//         user_rol_id: {
//             allowNull: false,
//             type: DataTypes.STRING(36),
//             onUpdate: "CASCADE",
//             references: {
//                 key:"user_rol_id",
//                 model: "user_rol",
//                 as: "user_rol_id",
//             }
//         },
//         customer_status: {
//             allowNull: false,
//             type: DataTypes.CHAR(1),
//             defaultValue: "A"
//         },
//         customer_created: {
//             allowNull: false,
//             type: "TIMESTAMP",
//             defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
//         },
//         customer_updated: {
//             allowNull: false,
//             type: DataTypes.DATE,
//         }
//     },
//     {
//         modelName: "customer",
//         tableName: "customer",
//         timestamps: true,
//         createdAt: 'customer_created',
//         updatedAt: 'customer_updated',
//         sequelize
//     }
// );
//
//
//
//
// // ********************************************* OPERATOR **************************************
// export class OperatorModel extends Model {}
// OperatorModel.init(
//     {
//         operator_id: {
//             allowNull: false,
//             primaryKey: true,
//             type: DataTypes.STRING(36)
//         },
//         user_rol_id: {
//             allowNull: false,
//             type: DataTypes.STRING(36),
//             onUpdate: "CASCADE",
//             references: {
//                 key:"user_rol_id",
//                 model: "user_rol",
//                 as: "user_rol_id",
//             }
//         },
//         operator_status: {
//             allowNull: false,
//             type: DataTypes.CHAR(1),
//             defaultValue: "A"
//         },
//         operator_created: {
//             allowNull: false,
//             type: DataTypes.DATE,
//         }
//     },
//     {
//         modelName: "operator",
//         tableName: "operator",
//         timestamps: true,
//         createdAt: 'operator_created',
//         updatedAt: false,
//         sequelize
//     }
// );
//
//
//
//
// // ********************************************* CUSTOMER BY USER **************************************
// export class CustomerByUserViewModel extends Model {}
// CustomerByUserViewModel.init(
//     {
//         user_id: {
//             allowNull: false,
//             primaryKey: true,
//             type: DataTypes.STRING(36)
//         },
//         customer_id: {
//            allowNull: false,
//            type: DataTypes.STRING(36)
//         },
//         customer_status: {
//             allowNull: false,
//             type: DataTypes.CHAR(1),
//             defaultValue: "A"
//         },
//         customer_created: {
//             allowNull: false,
//             type: DataTypes.DATE,
//         },
//         user_name: {
//             allowNull: false,
//             type: DataTypes.STRING(100),
//         },
//         user_display_name: {
//             allowNull: false,
//             type: DataTypes.STRING(100),
//         },
//         user_email: {
//             allowNull: false,
//             type: DataTypes.STRING(100),
//         },
//         person_id: {
//             allowNull: false,
//             type: DataTypes.STRING(36)
//         },
//     },
//     {
//         modelName: "vw_customer_by_user",
//         tableName: "vw_customer_by_user",
//         timestamps: true,
//         createdAt: 'customer_created',
//         updatedAt: false,
//         sequelize
//     }
// );
//


// // ********************************************** VIEWS **********************************
// // --- USERS RANK ---
// export class UserRankModel extends Model {}
// UserRankModel.init(
//     {
//         user_rank: {
//             allowNull: false,
//             primaryKey: true,
//             type: DataTypes.INTEGER,
//         },
//         user_email: {
//             allowNull: false,
//             type: DataTypes.STRING(500),
//         },
//         user_entry_pos: {
//             allowNull: false,
//             type: DataTypes.BIGINT,
//         },
//         user_qty_referencial: {
//             allowNull: false,
//             type: DataTypes.BIGINT,
//         },
//     },
//     {
//         sequelize,
//         modelName: "vwuserrank",
//         tableName: "vwuserrank",
//         timestamps: false,
//         createdAt: false,
//         updatedAt: false,
//         underscored : false,
//     }
//
//
// );




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

// CountryModel.hasMany(PersonModel, {
//     foreignKey: "country_id"
// });
//
// PersonModel.belongsTo(CountryModel,{
//     foreignKey: "country_id"
// });
//
// SocialModel.hasMany(PersonSocialModel,{
//     foreignKey: "social_id"
// });
//
// PersonSocialModel.belongsTo(SocialModel, {
//     foreignKey: "social_id"
// });
//
// PersonModel.hasMany(PersonSocialModel, {
//    foreignKey: "person_id"
// });
//
// PersonSocialModel.belongsTo(PersonModel, {
//     foreignKey: "person_id"
// });
//
// PersonModel.hasOne(UserModel, {
//     foreignKey: "person_id"
// });
//
// UserModel.belongsTo(PersonModel, {
//     foreignKey: "person_id"
// });
//
//
// RolModel.hasMany(UserRolModel, {
//    foreignKey: "rol_id"
// });
//
// UserRolModel.belongsTo(RolModel, {
//     foreignKey: "rol_id"
// });
//
// UserModel.hasMany(UserRolModel, {
//     foreignKey: "user_id"
// });
//
// UserRolModel.belongsTo(UserModel, {
//     foreignKey: "user_id"
// });
//
