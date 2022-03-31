'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'telefones',
      [
       {
         id: 1,
         telefone: '1199999-9999',
         contatos_id: 1,
       },
       {
        id: 2,
        telefone: '1199999-9999',
        contatos_id: 1,
      },
      {
        id: 3,
        telefone: '1199999-9999',
        contatos_id: 2,
      },
      {
        id: 4,
        telefone: '1199999-9999',
        contatos_id: 2,
      }
     ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
