const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Trade extends Model {}

Trade.init({
    offeredItemId: {
        type: DataTypes.INTEGER,
        references: { model: 'Items', key: 'id' },
        allowNull: false
    },
    requestedItemId: {
        type: DataTypes.INTEGER,
        references: { model: 'Items', key: 'id' },
        allowNull: false
    },
    offeredByUserId: {
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' },
        allowNull: false
    },
    requestedByUserId: {
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' },
        allowNull: false
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