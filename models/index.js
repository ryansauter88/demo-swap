const User = require('./User');
const Trade = require('./Trade');
const Item = require('./Item');

User.hasMany(Trade, {
    foreignKey: 'offeredByUserId',
    onDelete: 'SET NULL'
});

Trade.belongsTo(User, {
    foreignKey: 'offeredByUserId',
});

User.hasMany(Trade, {
    foreignKey: 'requestedByUserId',
    onDelete: 'SET NULL'
});

Trade.belongsTo(User, {
    foreignKey: 'requestedByUserId'
});

Item.hasMany(Trade, {
    foreignKey: 'offeredItemId',
    onDelete: 'SET NULL'
}); 

Trade.belongsTo(Item, {
    foreignKey: 'offeredItemId'
});

Item.hasMany(Trade, {
    foreignKey: 'requestedItemId',
    onDelete: 'SET NULL'
}); 

Trade.belongsTo(Item, {
    foreignKey: 'requestedItemId'
});

module.exports = { User, Item, Trade }