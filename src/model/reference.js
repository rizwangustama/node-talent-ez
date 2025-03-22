import c from 'config';
import {DataTypes, Model, Sequelize} from 'sequelize'
import {BaseModel, Option} from './model'

export const model = (connection) => {
	const Model = connection.define('Reference', {
        ...BaseModel,
        value: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
	}, {
        tableName: "references",
        ...Option,
        hooks: {
        },
        indexes: [
            {
                fields: [
                    'value','type'
                ],
            },
        ]
	});

	return Model;
};

export const associate = (mdl, models) => {
}
