const sequelize = require('../config/connection');
const { Item, User, Trade } = require("../models")

const users = [
    { fullName: 'John Doe', email: 'john@example.com', password: 'password123', steamId: 'JohnD123', createdAt: new Date(), updatedAt: new Date() },
    { fullName: 'Your Mom', email: 'bomb@yourmom.com', password: 'password123', steamId: 'gottemGGs', createdAt: new Date(), updatedAt: new Date() }
];

const items = [
    { name: 'Ushanka', type: 'Hat', rarity: 'Common', filename:'/assets/ushanka.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Bazaar Bargain', type: 'Weapon', rarity: 'Rare', filename:'/assets/bazaarbargain.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Prince Tavishs Crown', type: 'Hat', rarity: 'Rare', filename:'/assets/princetavishcrown.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Syringe Gun', type: 'Weapon', rarity: 'Common', filename:'/assets/syringegun.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Pyrogoggles', type: 'Hat', rarity: 'Common', filename:'/assets/pyrogoggles.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Knife', type: 'Weapon', rarity: 'Rare', filename:'/assets/butterflyknife.png', createdAt: new Date(), updatedAt: new Date() },
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
