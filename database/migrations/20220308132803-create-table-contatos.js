'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'contatos',
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        nome: { type: Sequelize.DataTypes.STRING(45), allowNull: false },
        usuarios_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: {tableName: 'usuarios'},
            key: 'id'
          }
        }
      })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('contatos');
  }
};