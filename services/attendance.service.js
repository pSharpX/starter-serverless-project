const models = require("../config/sequelize");

module.exports = {
    getAll: (params) => models.Attendance.findAll()
};
