const bcrypt =  require('bcryptjs');
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('users', [{
        name: 'Administrador',
        email: 'admin@gympoint.com',
        password_hash: bcrypt.hashSync('36639821', 8),
        created_at: new Date(),
        updated_at: new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('users', null, {});
    
  }
};
