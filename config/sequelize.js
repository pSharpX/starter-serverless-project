'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// const env = 'test';
const config = require('./config.js')[env];
const db = {};

// const root = path.normalize(`${__dirname}${path.sep}..`);
const models_dirname = path.resolve(__dirname, "../db/models");

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(config.use_env_variable, config.config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(models_dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = sequelize['import'](path.join(models_dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
