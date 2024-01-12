const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Item extends Model { }

Item.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    type: { 
        type: DataTypes.STRING 
    },
    rarity: { 
        type: DataTypes.STRING 
    }
    // IMG FILENAME GOES HERE
}, {
    sequelize,
    modelName: 'item',
    timestamps: true
});

module.exports = Item;