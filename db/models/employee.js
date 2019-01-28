module.exports = (sequelize, DataType) => {
    const Employee = sequelize.define('Employee', {
        id: {
            type: DataType.INTEGER,
            field: 'employee_id',
            primaryKey: true,
            autoIncrement: true
        },
        uuid: {
            type: DataType.UUID,
            defaultValue: DataType.UUIDV1,
            // primaryKey: true
        },
        // uuid: {
        //     type: DataType.UUID,
        //     defaultValue: function() {
        //         return generateMyId()
        //     },
        //     primaryKey: true
        // },
        // password_hash: DataType.STRING,
        // password: {
        //     type: DataType.VIRTUAL,
        //     set: function (val) {
        //         // Remember to set the data value, otherwise it won't be validated
        //         this.setDataValue('password', val);
        //         this.setDataValue('password_hash', this.salt + val);
        //     },
        //     validate: {
        //         isLongEnough: function (val) {
        //             if (val.length < 7) {
        //                 throw new Error("Please choose a longer password")
        //             }
        //         }
        //     }
        // },
        text: DataType.STRING,
        firstName: {
            type: DataType.STRING,
            field: 'first_name',
            allowNull: false
        },
        lastName: {
            type: DataType.STRING,
            field: 'last_name',
            allowNull: false
        },
        address: {
            type: DataType.TEXT,
            field: 'address',
            allowNull: true
        },
        email: {
            type: DataType.STRING,
            field: 'email',
            allowNull: false,
            unique: true,
            // validate: {
            //     is: ["^[a-z]+$",'i'],     // will only allow letters
            //     is: /^[a-z]+$/i,          // same as the previous example using real RegExp
            //     not: ["[a-z]",'i'],       // will not allow letters
            //     isEmail: true,            // checks for email format (foo@bar.com)
            //     isUrl: true,              // checks for url format (http://foo.com)
            //     isIP: true,               // checks for IPv4 (129.89.23.1) or IPv6 format
            //     isIPv4: true,             // checks for IPv4 (129.89.23.1)
            //     isIPv6: true,             // checks for IPv6 format
            //     isAlpha: true,            // will only allow letters
            //     isAlphanumeric: true,     // will only allow alphanumeric characters, so "_abc" will fail
            //     isNumeric: true,          // will only allow numbers
            //     isInt: true,              // checks for valid integers
            //     isFloat: true,            // checks for valid floating point numbers
            //     isDecimal: true,          // checks for any numbers
            //     isLowercase: true,        // checks for lowercase
            //     isUppercase: true,        // checks for uppercase
            //     notNull: true,            // won't allow null
            //     isNull: true,             // only allows null
            //     notEmpty: true,           // don't allow empty strings
            //     equals: 'specific value', // only allow a specific value
            //     contains: 'foo',          // force specific substrings
            //     notIn: [['foo', 'bar']],  // check the value is not one of these
            //     isIn: [['foo', 'bar']],   // check the value is one of these
            //     notContains: 'bar',       // don't allow specific substrings
            //     len: [2,10],              // only allow values with length between 2 and 10
            //     isUUID: 4,                // only allow uuids
            //     isDate: true,             // only allow date strings
            //     isAfter: "2011-11-05",    // only allow date strings after a specific date
            //     isBefore: "2011-11-05",   // only allow date strings before a specific date
            //     max: 23,                  // only allow values <= 23
            //     min: 23,                  // only allow values >= 23
            //     isCreditCard: true,       // check for valid credit card numbers
            //
            // isIn: {
            //     args: [['en', 'zh']],
            //     msg: "Must be English or Chinese"
            // }
            //     // custom validations are also possible:
            //     isEven(value) {
            //         if (parseInt(value) % 2 != 0) {
            //             throw new Error('Only even values are allowed!')
            //             // we also are in the model's context here, so this.otherField
            //             // would get the value of otherField if it existed
            //         }
            //     }
            // }
        },
        position: {
            type: DataType.STRING,
            field: 'position',
            allowNull: false
        },
        birthday: {
            type: DataType.DATE,
            field: 'birthday',
            allowNull: false
        },
        dni: {
            type: DataType.STRING(20),
            field: 'dni',
            allowNull: false,
            unique: true
        },
    }, {
        freezeTableName: true,
        tableName: 'employee',
        comment: "I'm a table employee!",
        getterMethods: {
            fullName() {
                return this.firstName + ' ' + this.lastName;
            }
        },
        setterMethods: {
            fullName(value) {
                const names = value.split(' ');
                this.setDataValue('first_name', names.slice(0, -1).join(' '));
                this.setDataValue('last_name', names.slice(-1).join(' '));
            },
        },
        // validate: {
        //     bothCoordsOrNone() {
        //         if ((this.latitude === null) !== (this.longitude === null)) {
        //             throw new Error('Require either both latitude and longitude or neither')
        //         }
        //     }
        // }
    });

    Employee.associate = function (models) {
        models.Employee.hasMany(models.Attendance);
    };

    return Employee;
}