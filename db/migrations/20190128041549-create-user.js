'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.createTable('users', { id: Sequelize.INTEGER });
        */
        return queryInterface.createTable('user', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: Sequelize.STRING,
            email: {
                type: Sequelize.STRING,
                field: 'email',
                allowNull: false,
                unique: true,
            },
            employeeId: {
                type: Sequelize.INTEGER,
                field: 'employee_id',
                references: {
                    // This is a reference to another model
                    model: 'employee',
                    // This is the column name of the referenced model
                    key: 'employee_id'
                    // This declares when to check the foreign key constraint. PostgreSQL only.
                    // deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
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
        return queryInterface.dropTable('user');
    }
};
