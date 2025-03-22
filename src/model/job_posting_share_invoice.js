import c from 'config';
import {DataTypes, Model, Sequelize} from 'sequelize'
import {BaseModel, Option} from './model'

export const model = (connection) => {
	const Model = connection.define('JobPostingShareInvoice', {
        ...BaseModel,
        amount: {
            type: DataTypes.DECIMAL(16,2),
            allowNull: false,
        },
        currency: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
       
        job_posting_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        job_posting_share_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        invoice_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        recruiter_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
	}, {
        tableName: "job_posting_share_invoices",
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
    mdl.belongsTo(models.JobPostingShare, {
        foreignKey: "jop_posting_share_id",
        sourceKey: "id",
        as: "job_posting_share",
        constraints: false,
    })
    mdl.belongsTo(models.Recruiter, {
        foreignKey: "recruiter_id",
        sourceKey: "id",
        as: "recruiter",
        constraints: false,
    })
    mdl.belongsTo(models.Invoice, {
        foreignKey: "invoice_id",
        sourceKey: "id",
        as: "invoice",
        constraints: false,
    })
}
