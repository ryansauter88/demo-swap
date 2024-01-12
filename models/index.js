const User = require('./User');
const Trade = require('./Trade');
const Item = require('./Item');

User.hasMany(Trade, {
    foreignKey: 'offeredByUserId',
    onDelete: 'CASCADE'
});

Trade.belongsTo(User, {
    foreignKey: 'offeredByUserId'
});

User.hasMany(Trade, {
    foreignKey: 'requestedByUserId',
    onDelete: 'CASCADE'
});

Trade.belongsTo(User, {
    foreignKey: 'requestedByUserId'
});

Item.hasMany(Trade, {
    foreignKey: 'offeredItemId',
    onDelete: 'CASCADE'
}); 

Trade.belongsTo(Item, {
    foreignKey: 'offeredItemId'
});

Item.hasMany(Trade, {
    foreignKey: 'requestedItemId',
    onDelete: 'CASCADE'
}); 

Trade.belongsTo(Item, {
    foreignKey: 'requestedItemId'
});

module.exports = { User, Item, Trade }