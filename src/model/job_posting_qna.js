import c from 'config';
import {DataTypes, Model, Sequelize} from 'sequelize'
import {BaseModel, Option} from './model'

export const model = (connection) => {
	const Model = connection.define('JobPostingQNA', {
        ...BaseModel,
        question: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        answer: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_mandatory: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },

        job_posting_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
	}, {
        tableName: "job_posting_qnas",
        ...Option,
        hooks: {
        },
        indexes: [
        ]
	});

	return Model;
};

export const associate = (mdl, models) => {
    mdl.belongsTo(models.JobPosting, {
        foreignKey: "jop_posting_id",
        sourceKey: "id",
        as: "job_posting",
        constraints: false,
    })
}
