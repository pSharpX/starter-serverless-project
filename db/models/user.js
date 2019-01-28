'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: DataTypes.STRING
    });

    User.associate = function (models) {
        models.User.belongsTo(models.Employee);
    };

    return User;
};