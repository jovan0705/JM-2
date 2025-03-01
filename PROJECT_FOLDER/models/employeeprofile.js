'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EmployeeProfile.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
        as: 'employee',
      });
    }
  }
  EmployeeProfile.init({
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
    place_of_birth: DataTypes.STRING,
    date_of_birth:  DataTypes.DATE,
    gender: DataTypes.ENUM(["Laki-Laki", "Perempuan"]),
    is_married: DataTypes.BOOLEAN,
    prof_pict: DataTypes.STRING(255),
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
    modelName: 'EmployeeProfile',
    tableName: 'employee_profile',
    timestamps: false,
  });
  return EmployeeProfile;
};