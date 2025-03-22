import c from 'config';
import {DataTypes, Model, Sequelize} from 'sequelize'
import { BaseModel, Option } from './model'
import * as constants from './../constants'

export const model = (connection) => {
	const Model = connection.define('TalentApply', {
        ...BaseModel,
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: constants.TALENT_APPL_STATUS_APPLIED,
        },
        talent_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        job_posting_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        resume_object_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
	}, {
        tableName: "talent_applies",
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
    mdl.belongsTo(models.JobPosting, {
        foreignKey: "job_posting_id",
        sourceKey: "id",
        as: "job_posting",
        constraints: false,
    })
}
