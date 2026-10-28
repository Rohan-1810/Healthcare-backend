import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const PatientDoctor = sequelize.define('PatientDoctor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'patients',
      key: 'id',
    },
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'doctors',
      key: 'id',
    },
  },
}, {
  timestamps: true,
  tableName: 'patient_doctors',
  indexes: [
    {
      unique: true,
      fields: ['patientId', 'doctorId'],
      name: 'unique_patient_doctor_mapping',
    },
  ],
});

export default PatientDoctor;
