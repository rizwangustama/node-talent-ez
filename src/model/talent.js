import c from 'config';
import {DataTypes, Model, Sequelize} from 'sequelize'
import { BaseModel, Option } from './model'
import * as constants from './../constants'

export const model = (connection) => {
	const Model = connection.define('Talent', {
        ...BaseModel,
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        date_of_birth: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        information: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        resume_object_id: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        portfolio_object_id: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        seeker_status: {
            type: DataTypes.STRING(10),
            allowNull: true,
            defaultValue: constants.TALENT_SEEKER_STATUS_OPEN,
        },
        experience_level: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        current_sallary: {
            type: DataTypes.DECIMAL(16,2),
            allowNull: true,
        },
        expected_sallary: {
            type: DataTypes.DECIMAL(16,2),
            allowNull: true,
        },
        currency: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        nationalization: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        roles: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: JSON.parse("[]"),
            get() {
                // return JSON.parse(this.getDataValue('roles') ? this.getDataValue('requirements') : "[]");
                return this.getDataValue('roles') || [];
            },
            set: function(v) {
                this.setDataValue('roles', v);
            }
        },
        skills: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: JSON.parse("[]"),
            get() {
                // return JSON.parse(this.getDataValue('skills') ? this.getDataValue('requirements') : "[]");
                return this.getDataValue('skills') || [];
            },
            set: function(v) {
                this.setDataValue('skills', v);
            }
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        recruiter_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

	}, {
        tableName: "talents",
        ...Option,
        hooks: {
        },
        indexes: [
        ]
	});

	return Model;
};

export const associate = (mdl, models) => {
    mdl.hasMany(models.TalentAchievement, {
        foreignKey: "talent_id",
        sourceKey: "id",
        as: "talent_achievements",
        constraints: false,
    })
    mdl.hasMany(models.TalentApply, {
        foreignKey: "talent_id",
        sourceKey: "id",
        as: "talent_applies",
        constraints: false,
    })
    mdl.hasMany(models.TalentExperience, {
        foreignKey: "talent_id",
        sourceKey: "id",
        as: "talent_experiences",
        constraints: false,
    })
    mdl.hasMany(models.TalentPool, {
        foreignKey: "talent_id",
        sourceKey: "id",
        as: "talent_pools",
        constraints: false,
    })
    mdl.hasMany(models.TalentUrl, {
        foreignKey: "talent_id",
        sourceKey: "id",
        as: "talent_urls",
        constraints: false,
    })
    mdl.belongsTo(models.User, {
        foreignKey: "user_id",
        sourceKey: "id",
        as: "user",
        constraints: false,
    })
    mdl.belongsTo(models.Recruiter, {
        foreignKey: "recruiter_id",
        sourceKey: "id",
        as: "recruiter",
        constraints: false,
    })
    mdl.belongsTo(models.Obj, {
        foreignKey: "profile_object_id",
        sourceKey: "value",
        as: "profile",
        constraints: false,
    })
}
