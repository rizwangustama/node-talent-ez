import c from 'config';
import {DataTypes, Model, Sequelize} from 'sequelize'
import {BaseModel, Option} from './model'

export const model = (connection) => {
	const Model = connection.define('Recruiter', {
        ...BaseModel,
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expired_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        npwp: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        identity_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        identity_object_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        bank_account_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bank_account_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bank_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
	}, {
        tableName: "recruiters",
        ...Option,
        hooks: {
        },
        indexes: [
            {
                fields: [
                    'user_id','identity_number'
                ],
            },
        ]
	});

	return Model;
};

export const associate = (mdl, models) => {
    mdl.belongsTo(models.User, {
        foreignKey: "user_id",
        sourceKey: "id",
        as: "user",
        constraints: false,
    })
    mdl.hasMany(models.JobPostingShareInvoice, {
        foreignKey: "recruiter_id",
        sourceKey: "id",
        as: "job_posting_shares",
        constraints: false,
    })
    mdl.belongsTo(models.Obj, {
        foreignKey: "identity_object_id",
        sourceKey: "value",
        as: "identity",
        constraints: false,
    })
}
