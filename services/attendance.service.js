const _ = require("lodash");
const models = require("../config/sequelize");
const {
    generatePdf
} = require("../helpers/pdf.helper");
const reportHelper = require("../helpers/report.helper");
const repository = models.Attendance;

const employeeRepository = models.Employee;
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;
const Op = Sequelize.Op;

module.exports = {
    getAll: ({
        employeeId,
        from,
        to
    }) => new Promise((resolve, reject) => {
        const params = {};
        let $where = {};
        if (employeeId) {
            $where = params.where || {};
            $where.employeeId = employeeId;
        }
        if (from && to) {
            $where = params.where || {};
            $where.date = {
                [Op.between]: [from, to]
            };
        }
        params.where = $where;
        repository.findAll(params)
            .then(res => resolve(res))
            .catch(err => reject(err));
    }),
    getAllByInterval: ({
        from,
        to
    }) => new Promise((resolve, reject) => {
        repository.findAll({
                where: {
                    date: {
                        [Op.between]: [from, to]
                    }
                }
            })
            .then(res => resolve(res))
            .catch(err => reject(err));
    }),
    generateReport: ({
        employeeId,
        from,
        to
    }) => new Promise((resolve, reject) => {
        const params = {};
        if (employeeId) {
            params.where = params.where || {};
            params.where.employeeId = employeeId;
        }
        if (from && to) {
            params.where = params.where || {};
            params.where.date = {
                [Op.between]: [from, to]
            };
        }
        params.include = [{
            model: employeeRepository
        }];
        repository.findAll(params)
            .then(attendances => {
                console.log(attendances);
                const docDefinition = {
                    pageOrientation: 'landscape',
                    pageSize: 'A4',
                    content: [{
                            style: "title",
                            text: 'KURMI COLOR SAC',
                            alignment: 'center',
                        },
                        {
                            alignment: 'justify',
                            columns: [
                                reportHelper.getReportSection(),
                                reportHelper.getReportSection()
                            ]
                        }
                    ],
                    styles: {
                        title: {
                            bold: true,
                            fillColor: '#eeeeee',
                            margin: [5, 5]
                        },
                        tableHeader: {
                            alignment: 'center',
                            fillColor: '#eeeeee',
                            padding: [2, 0, 2, 0]
                        },
                        columnContent: {
                            margin: [2, 0, 2, 0]
                        },
                        tableContent: {
                            fontSize: 8,
                            color: 'black',
                            margin: [0, 5, 0, 10]
                        },
                        signatureSection: {
                            alignment: 'center',
                            fontSize: 8,
                            color: 'black',
                            margin: [0, 50, 0, 5]
                        },
                    }
                };

                generatePdf(docDefinition, (response) => {
                    resolve(response);
                }, reject);
            })
            .catch(err => reject(err));

    }),
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
        repository.findOne({
            order: [
                ['date', 'DESC'],
            ],
            where: {
                date: {
                    [Op.lte]: new Date()
                }
            }
        }).then((max) => repository.destroy({
            where: {
                id: max.id
            }
        })).then(deleted => {
            resolve(deleted);
        }).catch(err => {
            reject(err)
        });
    }),
};