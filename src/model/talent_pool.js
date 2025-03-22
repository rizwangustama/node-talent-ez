import c from 'config';
import {DataTypes, Model, Sequelize} from 'sequelize'
import {BaseModel, Option} from './model'

export const model = (connection) => {
	const Model = connection.define('TalentPool', {
        ...BaseModel,
        status: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        
        talent_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        recruiter_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        job_posting_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
	}, {
        tableName: "talent_pools",
        ...Option,
        hooks: {
        },
        indexes: [
            {
                fields: [
                    "talent_id", "recruiter_id","job_posting_id"
                ],
            },
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
    mdl.belongsTo(models.Recruiter, {
        foreignKey: "recruiter_id",
        sourceKey: "id",
        as: "recruiter",
        constraints: false,
    })
    mdl.belongsTo(models.JobPosting, {
        foreignKey: "job_posting_id",
        sourceKey: "id",
        as: "job_posting",
        constraints: false,
    })
}
