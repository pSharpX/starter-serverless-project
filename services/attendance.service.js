const models = require("../config/sequelize");
const repository = models.Attendance;

const employeeRepository = models.Employee;
const sequelize = models.sequelize;

module.exports = {
    getAll: () => repository.findAll(),
    get: (id) => repository.findById(id),
    find: (params) => repository.findAll({where: params}),
    search: (params) => repository.findAll({where: params}),
    create: (attendance) => new Promise((resolve, reject) => {
        const employeeId = attendance.employeeId;
        sequelize.transaction((t) => {
            // chain all your queries here. make sure you return them.
            return employeeRepository
                .findById(employeeId)
                .then(employee => {
                    if (!employee || !employee.id)
                        throw new Error("employee was not found");
                    return repository
                        .create(attendance, {fields: ["action", "action_enum", "date", "time"]}, {transaction: t})
                        .then((created) => {
                            created.setEmployee(employee, {transaction: t, save: false});
                            created.save();
                            return Promise.resolve(created);
                        })
                });

        }).then((result) => {
            // Transaction has been committed
            resolve(result)
        }).catch((err) => {
            // Transaction has been rolled back
            reject(err)
        });
    }),
    update: (id, attendance) => repository.update(attendance, {where: {id}})
};
