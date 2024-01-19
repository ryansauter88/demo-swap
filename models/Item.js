const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Creates the item model by extending sequelize's model class.
class Item extends Model { }

// Initializes the item model with its properties and data types.
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
    },
    filename: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'item',
    timestamps: true
});

module.exports = Item;