const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Item extends Model { }

Item.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    type: { type: DataTypes.STRING },
    rarity: { type: DataTypes.STRING }

}, {
    sequelize,
    modelName: 'item',
    timestamps: true
});

module.exports = Item;