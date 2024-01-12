'use strict';
// Strict mode to catch errors and global objects.

// Object exporter for sequelize CLI to execute migration. Up async defines what happens when the migration is executed. 
// Up async defines changes like creating tables, adding columns, and modifying table structures. 
// await uses the queryInterface to create the Users table. Await ensures the entered fields are completed before moving on (id, integer, pk fields).

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            fullName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            steamId: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
};

// Down method defines how to revert actions performed in the up method asynchronously. 
// It is the opposite of the up method, and rolls the database back to its previous state.