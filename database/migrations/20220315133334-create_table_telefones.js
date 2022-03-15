'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'telefones',
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        telefone: {type: Sequelize.DataTypes.STRING(45), allowNull: false},
        contatos_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName:'contatos'
            },
            key:'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    return  queryInterface.dropTable('telefones');
  }
};