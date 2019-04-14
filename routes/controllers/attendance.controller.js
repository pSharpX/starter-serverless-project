const Joi = require("joi");
const moment = require("moment");
const validate = require("express-validation");

const attendanceService = require("../../services/attendance.service");

// const userSchema = Joi.object().keys({
//     name: Joi.string().min(2).max(50).required(),
//     country: Joi.string().valid(countryCodes).required(),
//     age: Joi.number().integer().positive().max(150).required()
// });

const intervalSchema = Joi.object().keys({
    // from: Joi.date().max('1-1-2050').iso().required(),
    from: Joi.date().max('1-1-2050').required(),
    to: Joi.date().max('1-1-2050').required(),
});

const paginationSchema = Joi.object().keys({
    page: Joi.number().integer().positive().max(150).required(),
    limit: Joi.number().integer().positive().max(100).required()
});

module.exports = {
    get: (req, res, next) => new Promise((resolve, reject) => {
        const id = parseInt(req.params[0]);
        attendanceService.get(id).then(attendance => {
            res.status(200).json({
                data: {
                    attendance
                }
            });
        }).catch(err => {
            return next(err);
        })
    }),

    getAll: (req, res, next) => new Promise((resolve, reject) => {
        const from = req.params.from;
        const to = req.params.to;
        const data = {
            from,
            to
        };
        Joi.validate(data, intervalSchema, (err, value) => {
            console.log(value);
            if (err) {
                return next(err);
            } else {
                const pagination = req.query;
                attendanceService.getAll({
                    from: moment(from, "MM-DD-YYYY").toDate(),
                    to: moment(to, "MM-DD-YYYY").toDate()
                }).then(attendances => {
                    res.status(200).json({
                        data: {
                            attendances
                        }
                    });
                }).catch(err => {
                    return next(err);
                })
            }
        });
    }),

    generateReport: (req, res, next) => new Promise((resolve, reject) => {
        const from = req.params.from;
        const to = req.params.to;
        const data = {
            from,
            to
        };
        Joi.validate(data, intervalSchema)
            .then(value => {
                console.log(value);
                return attendanceService.generateReport({
                    from: moment(from, "MM-DD-YYYY").toDate(),
                    to: moment(to, "MM-DD-YYYY").toDate()
                })
            })
            .then(response => {
                const filename = `reporte_${from}_${to}.pdf`;
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
                res.send(response);
            })
            .catch(err => {
                console.log(err);
                return next(err);
            });
    }),

    search: (req, res, next) => new Promise((resolve, reject) => {
        const params = req.query;
        attendanceService.search(params).then(attendances => {
            res.status(200).json({
                data: {
                    attendances
                }
            });
        }).catch(err => {
            return next(err);
        })
    }),

    create: (req, res, next) => new Promise((resolve, reject) => {
        const attendance = req.body;
        attendanceService.create(attendance).then(created => {
            res.status(200).json({
                data: {
                    attendance: created
                }
            });
        }).catch(err => {
            reject(err);
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }),

    update: (req, res, next) => new Promise((resolve, reject) => {
        const id = parseInt(req.params[0]);
        const attendance = req.body;
        attendanceService.update(id, attendance).then(updated => {
            res.status(200).json({
                data: {
                    updated
                }
            });
        }).catch(err => {
            return next(err);
        })
    }),
    remove: (req, res, next) => new Promise((resolve, reject) => {
        const id = parseInt(req.params[0]);
        attendanceService.delete(id).then(deleted => {
            res.status(200).json({
                data: {
                    deleted
                }
            });
        }).catch(err => {
            return next(err);
        })
    }),
    removeLast: (req, res, next) => new Promise((resolve, reject) => {
        const id = parseInt(req.params[0]);
        attendanceService.deleteLast(id).then(deleted => {
            res.status(200).json({
                data: {
                    deleted
                }
            });
        }).catch(err => {
            return next(err);
        })
    })

}