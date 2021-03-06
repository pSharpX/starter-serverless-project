module.exports = (sequelize, DataType) => {
    const Attendance = sequelize.define('Attendance', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        action: {
            type: DataType.STRING(25),
            field: 'action_name',
            allowNull: false,
            get() {
                const action = this.getDataValue('action');
                // 'this' allows you to access attributes of the instance
                return action.toUpperCase();
            },
        },
        action_enum: {
            type: DataType.ENUM,
            values: ['entrada', 'salida'],
            field: 'action_enum',
            allowNull: false,
            get() {
                const action_enum = this.getDataValue('action_enum');
                // 'this' allows you to access attributes of the instance
                return action_enum.toUpperCase();
            },
        },
        date: {
            type: DataType.DATE,
            field: 'attendance_date',
            defaultValue: DataType.NOW,
            allowNull: false
        },
        time: {
            type: DataType.TEXT,
            field: 'time',
            allowNull: false,
            get() {
                const time = this.getDataValue('time');
                // 'this' allows you to access attributes of the instance
                // return this.getDataValue('action_enum') + ' (' + time + ')';
                return time;
            },
        },
        employeeId: {
            type: DataType.INTEGER,
            field: 'employee_id',
            references: {
                // This is a reference to another model
                // model: Employee,
                // This is the column name of the referenced model
                key: 'employee_id'
                // This declares when to check the foreign key constraint. PostgreSQL only.
                // deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
        // Creating two objects with the same value will throw an error. The unique property can be either a
        // boolean, or a string. If you provide the same string for multiple columns, they will form a
        // composite unique key.
        // uniqueOne: { type: Sequelize.STRING,  unique: 'compositeIndex' },
        // uniqueTwo: { type: Sequelize.INTEGER, unique: 'compositeIndex' },

        // The unique property is simply a shorthand to create a unique constraint.
        // someUnique: { type: Sequelize.STRING, unique: true },
    }, {
        freezeTableName: true,
        tableName: 'attendance',
        comment: "I'm a table attendance!",
        underscored: true
        // indexes: [ { unique: true, fields: [ 'someUnique' ] } ]
    });

    Attendance.associate = function (models) {
        // User.belongsTo(UserRole, {as: 'role'}); // Adds roleId to user rather than userRoleId
        models.Attendance.belongsTo(models.Employee, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Attendance;
}


// It's exactly the same as creating the index in the model's options.
// { someUnique: { type: Sequelize.STRING } },
// { indexes: [ { unique: true, fields: [ 'someUnique' ] } ] },