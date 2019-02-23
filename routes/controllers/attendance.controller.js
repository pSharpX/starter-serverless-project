const joi = require("joi");
const validate = require("express-validation");

const attendanceService = require("../../services/attendance.service");

module.exports = {
    get: (req, res, next) => {
        return new Promise((resolve, reject) => {
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
        })
    },

    getAll: (req, res, next) => {
        return new Promise((resolve, reject) => {
            attendanceService.getAll(req).then(attendances => {
                res.status(200).json({
                    data: {
                        attendances
                    }
                });
            }).catch(err => {
                return next(err);
            })
        })
    },

    search: (req, res, next) => {
        return new Promise((resolve, reject) => {
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
        })
    },

    create: (req, res, next) => {
        return new Promise((resolve, reject) => {
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
        })
    },

    update: (req, res, next) => {
        return new Promise((resolve, reject) => {
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
        })
    },
    remove: (req, res, next) => {
    }

}

