import c from 'config';
import {DataTypes, Model, Sequelize} from 'sequelize'
import {BaseModel, Option} from './model'

export const model = (connection) => {
    const Model = connection.define('Obj', {
        ...BaseModel,
        platform: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: "base64"
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mime_type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        size: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        value: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: "objects",
        ...Option,
        hooks: {
        },
        indexes: []
    });

    return Model;
};

export const associate = (mdl, models) => {
    mdl.hasMany(models.Recruiter, {
        foreignKey: "identity_object_id",
        sourceKey: "value",
        as: "recruiter_identities",
        constraints: false,
    })
    mdl.hasMany(models.User, {
        foreignKey: "profile_object_id",
        sourceKey: "value",
        as: "user_profiles",
        constraints: false,
    })
    mdl.hasMany(models.Talent, {
        foreignKey: "profile_object_id",
        sourceKey: "value",
        as: "talent_profiles",
        constraints: false,
    })
    mdl.hasMany(models.TalentAchievement, {
        foreignKey: "object_id",
        sourceKey: "value",
        as: "talent_achievements",
        constraints: false,
    })
}
