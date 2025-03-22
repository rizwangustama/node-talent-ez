import c from 'config';
import {DataTypes, Model, Sequelize} from 'sequelize'
import {BaseModel, Option} from './model'

export const model = (connection) => {
	const Model = connection.define('TalentUrl', {
        ...BaseModel,
        platform: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    
        talent_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
	}, {
        tableName: "talent_urls",
        ...Option,
        hooks: {
        },
        indexes: [
        ]
	});

	return Model;
};

export const associate = (mdl, models) => {
    mdl.belongsTo(models.Talent, {
        foreignKey: "talent_id",
        sourceKey: "id",
        as: "talent",
        constraints: false,
    })
}
