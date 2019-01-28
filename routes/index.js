const models = require('../config/sequelize');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Employee.findAll().then(function(employees) {
    res.render('index', {
      title: 'Sequelize: Express Example',
      users: employees
    });
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
