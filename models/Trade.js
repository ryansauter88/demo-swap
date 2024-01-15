const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Trade extends Model {}

Trade.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    offeredItemId: {
        type: DataTypes.INTEGER,
        references: { model: 'Items', key: 'id' },
        allowNull: true
    },
    offeredItemAmt: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    requestedItemId: {
        type: DataTypes.INTEGER,
        references: { model: 'Items', key: 'id' },
        allowNull: true
    },
    requestedItemAmt: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    offeredByUserId: {
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' },
        allowNull: true
    },
    requestedByUserId: {
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' },
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
        validate: {
            isIn: [['pending', 'completed', 'cancelled']]
        }
    }
}, {
    sequelize,
    modelName: 'trade',
    timestamps: true
});

module.exports = Trade;