import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Doctor = sequelize.define('Doctor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Doctor name cannot be empty' },
    },
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Specialization cannot be empty' },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: { msg: 'Please provide a valid doctor email' },
    },
    set(val) {
      if (val) this.setDataValue('email', val.trim().toLowerCase());
    },
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'doctors',
});

export default Doctor;
