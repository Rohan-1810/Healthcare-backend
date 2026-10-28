import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Patient name cannot be empty' },
    },
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      isInt: { msg: 'Age must be an integer' },
      min: { args: [0], msg: 'Age cannot be negative' },
      max: { args: [150], msg: 'Age must be realistic' },
    },
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    validate: {
      isDate: { msg: 'Date of birth must be a valid date (YYYY-MM-DD)' },
    },
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'patients',
});

export default Patient;
