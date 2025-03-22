import c from 'config';
import {DataTypes, Model, Sequelize} from 'sequelize'
import {BaseModel, Option} from './model'

export const model = (connection) => {
	const Model = connection.define('Company', {
        ...BaseModel,
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pic_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        industry: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        size: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        website: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        about: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nib: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        npwp: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        is_verified: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        phone: {
            type: DataTypes.STRING(16),
            allowNull: true,
        },
	}, {
        tableName: "companies",
        ...Option,
        hooks: {
        },
        indexes: [
            {
                fields: [
                    'name'
                ],
            },
        ]
	});

	return Model;
};

export const associate = (mdl, models) => {
    mdl.hasMany(models.JobPosting, {
        foreignKey: "company_id",
        sourceKey: "id",
        as: "job_postings",
        constraints: false,
    })
}
