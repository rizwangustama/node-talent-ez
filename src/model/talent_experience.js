import c from 'config';
import {DataTypes, Model, Sequelize} from 'sequelize'
import {BaseModel, Option} from './model'

export const model = (connection) => {
	const Model = connection.define('TalentExperience', {
        ...BaseModel,
        company: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company_industry: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    
        talent_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
	}, {
        tableName: "talent_experiences",
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
