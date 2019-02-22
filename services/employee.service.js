const models = require("../config/sequelize");
const repository = models.Employee;

module.exports = {
    getAll: () => repository.findAll(),
    get: (id) => repository.findById(id),
    getByUuid: (uuid) => repository.findByUuid(uuid),
    find: (params) => repository.findAll({where: params}),
    search: (params) => repository.findAll({where: params}),
    create: (employee) => repository.create(employee, {fields: ["uuid", "firstName", "lastName", "address", "email", "position", "birthday", "dni"]}),
    update: (id, employee) => repository.update(employee, { where: { id }})
};
