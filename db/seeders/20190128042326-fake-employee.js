'use strict';

const uuid = require("uuid/v1");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('employee', [{
      uuid: uuid(),
      first_name: 'Eduardo',
      last_name: 'Tello',
      email: 'cerivera@rimac.com.pe',
      address: 'St. Jazmin #120',
      position: 'Software Developer',
      birthday:  new Date(1993,4,20),
      dni: '48048362'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('employee', null, {});
  }
};
