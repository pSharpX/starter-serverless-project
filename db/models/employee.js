module.exports = (sequelize, type) => {
    return sequelize.define('employee', {
        id: {
            type: type.INTEGER,
            field: 'employee_id',
            primaryKey: true,
            autoIncrement: true
        },
        text: type.STRING,
        firstName: {
            type: type.STRING,
            field: 'first_name',
            allowNull: false
        },
        lastName: {
            type: type.STRING,
            field: 'last_name',
            allowNull: false
        },
        address: {
            type: type.TEXT,
            field: 'address',
            allowNull: true
        },
        email: {
            type: type.STRING,
            field: 'email',
            allowNull: false,
            unique: true
        },
        position: {
            type: type.STRING,
            field: 'position',
            allowNull: false
        },
        birthday: {
            type: type.DATE,
            field: 'birthday',
            allowNull: false
        },
        dni: {
            type: type.STRING(20),
            field: 'dni',
            allowNull: false,
            unique: true
        },
    }, {
        freezeTableName: true,
        tableName: 'employee',
        comment: "I'm a table employee!"
    })
}