'use strict';

const trades = [
    { offeredItemId: 1, requestedItemId: 2, offeredByUserId: 1, requestedByUserId: 2, status: 'pending', createdAt: new Date(), updatedAt: new Date() },
];

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Trades', trades, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Trades', null, {});
    }
};
