'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            field: 'email',
            allowNull: false,
            unique: true,
        },
    });

    User.associate = function (models) {
        models.User.belongsTo(models.Employee);
    };

    return User;
};