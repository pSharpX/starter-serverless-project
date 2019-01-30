'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.createTable('users', { id: Sequelize.INTEGER });
        */
        return queryInterface.createTable('attendance', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            action: {
                type: Sequelize.STRING(25),
                field: 'action_name',
                allowNull: false
            },
            action_enum: {
                type: Sequelize.ENUM,
                field: 'action_enum',
                values: ['entrada', 'salida'],
                allowNull: false
            },
            date: {
                type: Sequelize.DATE,
                field: 'attendance_date',
                defaultValue: Sequelize.NOW,
                allowNull: false
            },
            time: {
                type: Sequelize.TEXT,
                field: 'time',
                allowNull: false,
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
        return queryInterface.dropTable('attendance');
    }
};
