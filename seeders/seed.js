const sequelize = require('../config/connection');
const { Item, User, Trade } = require("../models")

const users = [
    { fullName: 'John Doe', email: 'john@example.com', password: 'password123', steamId: 'JohnD123', createdAt: new Date(), updatedAt: new Date() },
    { fullName: 'Your Mom', email: 'bomb@yourmom.com', password: 'password123', steamId: 'gottemGGs', createdAt: new Date(), updatedAt: new Date() }
];

const items = [
    { name: 'Item 1', type: 'Type A', rarity: 'Common', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Item 2', type: 'Type B', rarity: 'Rare', createdAt: new Date(), updatedAt: new Date() },
];

const trades = [
    { 
        offeredItemId: 1, 
        offeredItemAmt: 1,
        requestedItemId: 2,
        requestedItemAmt: 1, 
        offeredByUserId: 1, 
        requestedByUserId: 2, 
        status: 'pending', 
        createdAt: new Date(), 
        updatedAt: new Date() 
    },
];

const seedDatabase = async () => {
    await sequelize.sync({ force: true })

    await User.bulkCreate(users, {
        individualHooks: true,
        returning: true
    })

    await Item.bulkCreate(items, {
        individualHooks: true,
        returning: true
    })

    await Trade.bulkCreate(trades, {
        individualHooks: true,
        returning: true
    })

    process.exit()
}

seedDatabase()
// module.exports = {
//     up: async (queryInterface, Sequelize) => {
//         await queryInterface.bulkInsert('Users', users, {});
//     },

//     down: async (queryInterface, Sequelize) => {
//         await queryInterface.bulkDelete('Users', null, {});
//     }
// };