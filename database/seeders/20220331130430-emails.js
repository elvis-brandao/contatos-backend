'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'emails',
      [
       {
         id: 1,
         email: 'teste1@teste.com',
         contatos_id: 1,
       },
       {
        id: 2,
        email: 'teste2@teste.com',
        contatos_id: 1,
      },
      {
        id: 3,
        email: 'teste3@teste.com',
        contatos_id: 2,
      },
      {
        id: 4,
        email: 'teste4@teste.com',
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
