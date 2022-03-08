'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'contatos',
      [
        {
          id: 1,
          nome: 'Luis',
          usuarios_id: 1
        },
        {
          id: 2,
          nome: 'Joao',
          usuarios_id: 1
        },
        {
          id: 3,
          nome: 'Vivy',
          usuarios_id: 2
        },
        {
          id: 4,
          nome: 'Hanna',
          usuarios_id: 3
        },
        {
          id: 5,
          nome: 'Fulano',
          usuarios_id: 4
        },
        {
          id: 6 ,
          nome: 'Sicrano',
          usuarios_id: 5
        },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('contatos', null, {});
  }
};
