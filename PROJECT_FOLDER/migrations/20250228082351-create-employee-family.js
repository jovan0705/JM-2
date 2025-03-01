'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employee_family', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(255)
      },
      identifier: {
        type: Sequelize.STRING(255)
      },
      job: {
        type: Sequelize.STRING(255)
      },
      place_of_birth: {
        type: Sequelize.STRING(255)
      },
      date_of_birth: {
        type: Sequelize.DATE
      },
      religion: {
        type: Sequelize.ENUM(["Islam", "Katolik", "Buda", "Protestan", "Konghucu"])
      },
      is_life: {
        type: Sequelize.BOOLEAN
      },
      is_divorced: {
        type: Sequelize.BOOLEAN
      },
      relation_status: {
        type: Sequelize.ENUM(["Suami", "Istri", "Anak", "Anak Sambung"])
      },
      created_by: {
        type: Sequelize.STRING(255)
      },
      updated_by: {
        type: Sequelize.STRING(255)
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employee_family');
  }
};