import c from 'config';
import {DataTypes, Model, Sequelize} from 'sequelize'
import {BaseModel, Option} from './model'

export const model = (connection) => {
	const Model = connection.define('InvoiceCharge', {
        ...BaseModel,
        amount: {
            type: DataTypes.DECIMAL(16,2),
            allowNull: false,
        },
        value: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        currency: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        
        invoice_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
	}, {
        tableName: "invoice_charges",
        ...Option,
        hooks: {
        },
        indexes: [
        ]
	});

	return Model;
};

export const associate = (mdl, models) => {
    mdl.belongsTo(models.Invoice, {
        foreignKey: "invoice_id",
        sourceKey: "id",
        as: "invoice",
        constraints: false,
    })
}
