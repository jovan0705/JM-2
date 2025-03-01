'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('education', {
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
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.ENUM(["Tk", "Sd", "Smp", "Sma", "Strata 1", "Strata 2", "Doktor", "Profesor"])
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      created_by: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      updated_by: {
        type: Sequelize.STRING(255),
        allowNull: false
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
    await queryInterface.dropTable('education');
  }
};