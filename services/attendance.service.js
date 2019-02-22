const models = require("../config/sequelize");
const repository = models.Attendance;

module.exports = {
    getAll: () => repository.findAll(),
    get: (id) => repository.findById(id),
    find: (params) => repository.findAll({where: params}),
    search: (params) => repository.findAll({where: params}),
    create: (attendance) => repository.create(attendance, {fields: ["action", "action_enum", "date", "time", "employeeId"]}),
    update: (id, attendance) => repository.update(attendance, { where: { id }})
};
