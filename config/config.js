module.exports = {
    development: {
        use_env_variable: 'mysql://root@127.0.0.1:3306/db_attendance',
        database: "db_attendance",
        username: 'root',
        password: null,
        timezone: '+05:00',
        config: {
            host: 'localhost',
            dialect: 'mysql',
            operatorsAliases: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            define: {
                underscored: false,
                freezeTableName: false,
                charset: 'utf8',
                dialectOptions: {
                    collate: 'utf8_general_ci'
                },
                timestamps: false
            },
            timezone: '+05:00',
            dialectOptions: {
                useUTC: false, //for reading from database
                dateStrings: true,
                typeCast: function (field, next) { // for reading from database
                    if (field.type === 'DATETIME') {
                        // return field.string()
                        return new Date(field.string() + 'Z');
                    }
                    return next()
                },
            },
        },
        dialectOptions: {
            useUTC: false, //for reading from database
            dateStrings: true,
            typeCast: function (field, next) { // for reading from database
                if (field.type === 'DATETIME') {
                    return field.string()
                }
                return next()
            },
        },
    },
    aws: {
        dialect: "sqlite",
        storage: "./db.development.sqlite",
        // SQLite only
        // storage: 'path/to/database.sqlite'
    },
    test: {
        dialect: "sqlite",
        storage: ":memory:"
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        dialect: 'mysql',
        use_env_variable: 'DATABASE_URL',
        timezone: 'America/Lima'
    }
};