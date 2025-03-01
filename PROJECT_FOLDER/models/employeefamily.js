'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeFamily extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EmployeeFamily.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
        as: 'family',
      });
    }
  }
  EmployeeFamily.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: DataTypes.STRING(255),
    identifier: DataTypes.STRING(255),
    job: DataTypes.STRING(255),
    place_of_birth: DataTypes.STRING(255),
    date_of_birth: DataTypes.DATE,
    religion: DataTypes.ENUM(["Islam", "Katolik", "Buda", "Protestan", "Konghucu"]),
    is_life: DataTypes.BOOLEAN,
    is_divorced: DataTypes.BOOLEAN,
    relation_status: DataTypes.ENUM(["Suami", "Istri", "Anak", "Anak Sambung"]),
    created_by: DataTypes.STRING(255),
    updated_by: DataTypes.STRING(255),
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'EmployeeFamily',
    tableName: 'employee_family',
    timestamps: false,
  });
  return EmployeeFamily;
};