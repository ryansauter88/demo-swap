'use strict';

const items = [
    { name: 'Item 1', type: 'Type A', rarity: 'Common', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Item 2', type: 'Type B', rarity: 'Rare', createdAt: new Date(), updatedAt: new Date() },
];

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Items', items, {});
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Items', null, {});
    }
};