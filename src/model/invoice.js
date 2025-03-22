import c from 'config';
import {DataTypes, Model, Sequelize} from 'sequelize'
import {BaseModel, Option} from './model'

export const model = (connection) => {
	const Model = connection.define('Invoice', {
        ...BaseModel,
        gross_amount: {
            type: DataTypes.DECIMAL(16,2),
            allowNull: false,
        },
        net_amount: {
            type: DataTypes.DECIMAL(16,2),
            allowNull: false,
        },
        currency: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        
        recruiter_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
	}, {
        tableName: "invoices",
        ...Option,
        hooks: {
        },
        indexes: [
        ]
	});

	return Model;
};

export const associate = (mdl, models) => {
    mdl.hasMany(models.InvoiceCharge, {
        foreignKey: "invoice_id",
        sourceKey: "id",
        as: "invoice_charges",
        constraints: false,
    })
    mdl.belongsTo(models.Recruiter, {
        foreignKey: "recruiter_id",
        sourceKey: "id",
        as: "recruiter",
        constraints: false,
    })
}
