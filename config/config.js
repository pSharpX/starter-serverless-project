module.exports = {
    development: {
        use_env_variable: 'mysql://localhost:3306/db_attendance',
        database: "db_attendance",
        username: 'root',
        password: null,
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
                timestamps: true
            },
        }
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
        use_env_variable: 'DATABASE_URL'
    }
};