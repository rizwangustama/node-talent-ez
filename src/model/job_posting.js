import c from 'config';
import {DataTypes, Model, Sequelize} from 'sequelize'
import {BaseModel, Option} from './model'

export const model = (connection) => {
	const Model = connection.define('JobPosting', {
        ...BaseModel,
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contract_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        employement_status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        placement_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        requirements: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: JSON.parse("[]"),
            get() {
                // return JSON.parse(this.getDataValue('requirements') ? this.getDataValue('requirements') : "[]");
                return this.getDataValue('requirements') || [];
            },
            set: function(v) {
                this.setDataValue('requirements', v);
            }
        },
        skills: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: JSON.parse("[]"),
            get() {
                // return JSON.parse(this.getDataValue('skills') ? this.getDataValue('skills') : "[]");
                return this.getDataValue('skills') || [];
            },
            set: function(v) {
                this.setDataValue('skills', v);
            }
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        languages: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: JSON.parse("[]"),
            get() {
                // return JSON.parse(this.getDataValue('languages') ? this.getDataValue('languages') : "[]");
                return this.getDataValue('languages') || [];
            },
            set: function(v) {
                this.setDataValue('languages', v);  
            }
        },
        benefits: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: JSON.parse("[]"),
            get() {
                // return JSON.parse(this.getDataValue('benefits') ? this.getDataValue('benefits') : "[]");
                return this.getDataValue('benefits') || [];
            },
            set: function(v) {
                this.setDataValue('benefits', v);  
            }
        },
        is_negotiable: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
        expired_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        sallary_start: {
            type: DataTypes.DECIMAL(16,2),
            allowNull: true,
        },
        sallary_end: {
            type: DataTypes.DECIMAL(16,2),
            allowNull: true,
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "IDR"
        },
        is_collaborate: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
        tags: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: JSON.parse("[]"),
            get() {
                // return JSON.parse(this.getDataValue('tags') ? this.getDataValue('tags') : "[]");
                return this.getDataValue('tags') || [];
            },
            set: function(v) {
                this.setDataValue('tags', v);  
            }
        },
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
	}, {
        tableName: "job_postings",
        ...Option,
        hooks: {
        },
        indexes: [
            {
                fields: [
                    "name","company_id"
                ],
            },
        ]
	});

	return Model;
};

export const associate = (mdl, models) => {
    mdl.belongsTo(models.Company, {
        foreignKey: "company_id",
        sourceKey: "id",
        as: "company",
        constraints: false,
    })
    mdl.hasMany(models.JobPostingShare, {
        foreignKey: "job_posting_id",
        sourceKey: "id",
        as: "job_posting_share",
        constraints: false,
    })
}
