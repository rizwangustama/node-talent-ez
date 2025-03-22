import c from 'config';
import {DataTypes, Model, Sequelize} from 'sequelize'
import {BaseModel, Option} from './model'

export const model = (connection) => {
	const Model = connection.define('User', {
        ...BaseModel,
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        profile_project_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        google_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        linkedin_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
	}, {
        tableName: "users",
        ...Option,
        hooks: {
        },
        indexes: [
            {
                fields: [
                    'email'
                ],
            },
        ]
	});

	return Model;
};

export const associate = (mdl, models) => {
    mdl.belongsTo(models.Role, {
        foreignKey: "role_id",
        sourceKey: "id",
        as: "role",
        constraints: false,
    })
    mdl.belongsTo(models.Obj, {
        foreignKey: "profile_object_id",
        sourceKey: "value",
        as: "profile",
        constraints: false,
    })
}
