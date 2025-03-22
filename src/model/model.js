import {DataTypes} from 'sequelize'

export default {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    created_by_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    updated_by_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    delete_by_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}

export const Option = {
    underscored: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    timestamp: true
}