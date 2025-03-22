import c from 'config';
import {DataTypes, Model, Sequelize} from 'sequelize'
import {BaseModel, Option} from './model'

export const model = (connection) => {
	const Model = connection.define('TalentAchievement', {
        ...BaseModel,
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        issuer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    
        object_id: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        link: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
      
        talent_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
	}, {
        tableName: "talent_achievements",
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
    mdl.belongsTo(models.Obj, {
        foreignKey: "object_id",
        sourceKey: "value",
        as: "object",
        constraints: false,
    })
}
