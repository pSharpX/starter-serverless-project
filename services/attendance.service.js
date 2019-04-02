const models = require("../config/sequelize");
const repository = models.Attendance;

const employeeRepository = models.Employee;
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;
const Op = Sequelize.Op;

module.exports = {
    getAll: () => repository.findAll(),
    get: (id) => repository.findById(id),
    find: (params) => repository.findAll({
        where: params
    }),
    search: (params) => repository.findAll({
        where: params
    }),
    create: (attendance) => new Promise((resolve, reject) => {
        console.log(attendance);
        const employeeId = attendance.employeeId;
        attendance.action_enum = attendance.action;
        sequelize.transaction((t) => {
            // chain all your queries here. make sure you return them.
            return employeeRepository
                .findById(employeeId)
                .then(employee => {
                    if (!employee || !employee.id)
                        throw new Error("employee was not found");
                    return repository
                        .create(attendance, {
                            fields: ["action", "action_enum", "date", "time"]
                        }, {
                            transaction: t
                        })
                        .then((created) => {
                            created.setEmployee(employee, {
                                transaction: t,
                                save: false
                            });
                            created.save();
                            console.log(created);
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
    update: (id, attendance) => repository.update(attendance, {
        where: {
            id
        }
    }),
    delete: (id) => repository.destroy({
        where: {
            id
        }
    }),
    deleteLast: () => new Promise((resolve, reject) => {
        // repository.max("date", {
        //     where: {
        //         date: {
        //             [Op.lte]: new Date()
        //         }
        //     }
        // })
        repository.findOne({
            attributes: [
                sequelize.fn('max', sequelize.col('attendance_date')),
                "id"
            ],
            where: {
                date: {
                    [Op.lte]: new Date()
                }
            }
        }).then((max) => {
            console.log(max);
            return Promise.resolve(max);
            // return repository.destroy({
            //     where: {
            //         id: max.id
            //     }
            // })
        }).then(deleted => {
            resolve(deleted);
        }).catch(err => {
            reject(err)
        });
    }),
};