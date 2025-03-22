import c from 'config';
import {DataTypes, Model, Sequelize} from 'sequelize'
import {BaseModel, Option} from './model'

export const model = (connection) => {
	const Model = connection.define('Role', {
        ...BaseModel,
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
	}, {
        tableName: "roles",
        ...Option,
        hooks: {
        },
        indexes: [
            {
                fields: [
                    'code','name'
                ],
            },
        ]
	});

	return Model;
};

export const associate = (mdl, models) => {
    mdl.hasMany(models.User, {
        foreignKey: "role_id",
        sourceKey: "id",
        as: "users",
        constraints: false,
    })
}
