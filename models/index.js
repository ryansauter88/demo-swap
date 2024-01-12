const User = require('./User');
const Trade = require('./Trade');
const Item = require('./Item');

User.hasMany(Trade, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Trade.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Trade, {
    foreignKey: 'recipient_id',
    onDelete: 'CASCADE'
});

Trade.belongsTo(User, {
    foreignKey: 'recipient_id'
});

Item.hasMany(Trade, {
    foreignKey: 'offer_item',
    onDelete: 'CASCADE'
}); 

Trade.belongsTo(Item, {
    foreignKey: 'exchange_item'
});

Item.hasMany(Trade, {
    foreignKey: 'exchange_item',
    onDelete: 'CASCADE'
}); 

Trade.belongsTo(Item, {
    foreignKey: 'exchange_item'
});

module.exports = { User }