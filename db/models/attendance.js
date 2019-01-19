module.exports = (sequelize, type) => {
    return sequelize.define('attendance', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        action: {
            type: type.STRING(25),
            field: 'action_name',
            allowNull: false
        },
        action_enum: {
            type: type.ENUM,
            values: ['entrada', 'salida'],
            field: 'action_enum',
            allowNull: false
        },
        date: {
            type: type.DATE,
            field: 'attendance_date',
            defaultValue: type.NOW,
            allowNull: false
        },
        time: {
            type: type.TEXT,
            field: 'time',
            allowNull: false
        },
        employeeId: {
            type: type.INTEGER,
            field: 'employee_id',
            references: {
                // This is a reference to another model
                model: Employee,
                // This is the column name of the referenced model
                key: 'employeeId'
                // This declares when to check the foreign key constraint. PostgreSQL only.
                // deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        }
    }, {
        freezeTableName: true,
        tableName: 'attendance',
        comment: "I'm a table attendance!"
    })
}
//
// employeeId: 0,
//     action: faker.random.arrayElement(actions),
//     date,
//     time: moment(date).format('HH:mm:ss'),