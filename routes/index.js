const models = require('../config/sequelize');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/prueba', function(req, res, next) {
  models.Employee.findAll().then(function(employees) {
    res.json(employees);
  }).catch(err => {
    console.log(err);
  });
});

module.exports = router;
