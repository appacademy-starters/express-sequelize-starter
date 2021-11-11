'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('Users', [
        {
          email: 'yeet@gmail.com',
          hashedPassword: 'bestpasswordNA',
          username: 'isoadj',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'justinrusso@gmail.com',
          hashedPassword: 'regex is op',
          username: 'firstnecron',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    
      
      return queryInterface.bulkDelete('Users', null, {});
    
  }
};
