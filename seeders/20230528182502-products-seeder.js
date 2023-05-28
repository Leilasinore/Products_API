"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", [
      {
        name: "mac book",
        quantity: 2,
        price: 1230,
        availability: true,
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      {
        name: "Iphone",
        quantity: 3,
        price: 1260,
        availability: true,
        createdAt: new Date(),
        updatedAt: new Date() 
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Products',null,{});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
