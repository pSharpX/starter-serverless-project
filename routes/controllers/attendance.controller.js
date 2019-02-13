const joi = require("joi");
const validate = require("express-validation");

const attendanceService = require("../../services/attendance.service");

module.exports = {
    get: (req, res, next) => {
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
                console.log("employee-service: getAll method");
                console.log(err);
                return next(err);
            })
        })
    },

    create: (req, res, next) => {
    },

    update: (req, res, next) => {
    },
    remove: (req, res, next) => {
    }

}

