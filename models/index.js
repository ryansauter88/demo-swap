// Import models.
const User = require('./User');
const Trade = require('./Trade');
const Item = require('./Item');

// Define associations, has many, belongs to relationships amongst models. 
User.hasMany(Trade, {
    foreignKey: 'offeredByUserId',
    onDelete: 'SET NULL',
    as: 'offers'
});

Trade.belongsTo(User, {
    foreignKey: 'offeredByUserId',
    as: 'offerUser'
});

User.hasMany(Trade, {
    foreignKey: 'requestedByUserId',
    onDelete: 'SET NULL',
    as: 'requests'
});

Trade.belongsTo(User, {
    foreignKey: 'requestedByUserId',
    as: 'requestUser'
});

Item.hasMany(Trade, {
    foreignKey: 'offeredItemId',
    onDelete: 'SET NULL'
}); 

Trade.belongsTo(Item, {
    foreignKey: 'offeredItemId',
    as: 'offeredItem'
});

Item.hasMany(Trade, {
    foreignKey: 'requestedItemId',
    onDelete: 'SET NULL'
}); 

Trade.belongsTo(Item, {
    foreignKey: 'requestedItemId',
    as: 'requestedItem'
});

module.exports = { User, Item, Trade }