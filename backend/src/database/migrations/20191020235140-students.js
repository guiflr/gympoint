'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('students', 'updated_at',{
          type: Sequelize.DATE,
          allowNull: false,
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('students', 'updated_at');
  }
};
