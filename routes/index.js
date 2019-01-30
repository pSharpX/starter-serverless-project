const models = require('../config/sequelize');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Employee.findAll().then(function(employees) {
    console.log(employees);
    // res.render('index', {
    //   title: 'Sequelize: Express Example'
    // });
    res.send(employees);
  }).catch(err => {
    console.log(err);
  });
  res.send('data');
  // res.render('index', { title: 'Express' });
});

module.exports = router;
