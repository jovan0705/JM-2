'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.hasMany(models.EmployeeProfile, {
        foreignKey: 'employee_id',
        as: "profile"
      })
      Employee.hasMany(models.Education, {
        foreignKey: 'employee_id',
        as: "education"
      })
      Employee.hasMany(models.EmployeeFamily, {
        foreignKey: 'employee_id',
        as: "family"
      })
    }
  }
  Employee.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nik: DataTypes.STRING,
    name: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
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
    modelName: 'Employee',
    tableName: 'employee',
    timestamps: false,
  });
  return Employee;
};