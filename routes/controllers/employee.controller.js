const joi = require("joi");
const validate = require("express-validation");

const employeeService = require("../../services/employee.service.js");

module.exports = {
    get: (req, res, next) => {
    },

    getAll: (req, res, next) => {
        return new Promise((resolve, reject) => {
            employeeService.getAll(req).then(employees => {
                res.status(200).json({
                    data: {
                        employees
                    }
                });
            }).catch(err => {
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

