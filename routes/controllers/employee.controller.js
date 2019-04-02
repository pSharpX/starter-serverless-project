const joi = require("joi");
const validate = require("express-validation");

const employeeService = require("../../services/employee.service.js");

module.exports = {
    get: (req, res, next) => {
        return new Promise((resolve, reject) => {
            const id = parseInt(req.params[0]);
            employeeService.get(id).then(employee => {
                res.status(200).json({
                    data: {
                        employee
                    }
                });
            }).catch(err => {
                return next(err);
            })
        })
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
    search: (req, res, next) => {
        return new Promise((resolve, reject) => {
            const params = req.query;
            employeeService.search(params).then(employees => {
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
    getByUuid: (req, res, next) => {
        return new Promise((resolve, reject) => {
            const uuid = req.params[0];
            employeeService.getByUuid(uuid).then(employee => {
                res.status(200).json({
                    data: {
                        employee
                    }
                });
            }).catch(err => {
                return next(err);
            })
        })
    },

    create: (req, res, next) => {
        return new Promise((resolve, reject) => {
            const employee = req.body;
            employeeService.create(employee).then(created => {
                res.status(200).json({
                    data: {
                        created
                    }
                });
            }).catch(err => {
                return next(err);
            })
        })
    },

    update: (req, res, next) => {
        return new Promise((resolve, reject) => {
            const id = parseInt(req.params[0]);
            const employee = req.body;
            employeeService.update(id, employee).then(updated => {
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