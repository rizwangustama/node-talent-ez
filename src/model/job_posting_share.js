import c from 'config';
import {DataTypes, Model, Sequelize} from 'sequelize'
import {BaseModel, Option} from './model'

export const model = (connection) => {
	const Model = connection.define('JobPostingQNA', {
        ...BaseModel,
        price_talent: {
            type: DataTypes.DECIMAL(16,2),
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
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        billable_period: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        billable_period_type: {
            type: DataTypes.STRING,
            allowNull: true,
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
        indexes: []
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
    mdl.hasMany(models.JobPostingShareInvoice, {
        foreignKey: "jop_posting_share_id",
        sourceKey: "id",
        as: "job_posting_share_invoice",
        constraints: false,
    })
}
