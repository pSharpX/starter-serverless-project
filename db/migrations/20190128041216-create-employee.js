'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.createTable('users', { id: Sequelize.INTEGER });
        */
        return queryInterface.createTable('employee', {
            id: {
                type: Sequelize.INTEGER,
                field: 'employee_id',
                primaryKey: true,
                autoIncrement: true
            },
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
                // primaryKey: true
            },
            firstName: {
                type: Sequelize.STRING,
                field: 'first_name',
                allowNull: false
            },
            lastName: {
                type: Sequelize.STRING,
                field: 'last_name',
                allowNull: false
            },
            address: {
                type: Sequelize.TEXT,
                field: 'address',
                allowNull: true
            },
            email: {
                type: Sequelize.STRING,
                field: 'email',
                allowNull: false,
                unique: true,
            },
            position: {
                type: Sequelize.STRING,
                field: 'position',
                allowNull: false
            },
            birthday: {
                type: Sequelize.DATE,
                field: 'birthday',
                allowNull: false
            },
            dni: {
                type: Sequelize.STRING(20),
                field: 'dni',
                allowNull: false,
                unique: true
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
        return queryInterface.dropTable('employee');
    }
};
