import sequelize from '../config/database.js';
import User from './User.js';
import Patient from './Patient.js';
import Doctor from './Doctor.js';
import PatientDoctor from './PatientDoctor.js';

// User <-> Patient (1 : M)
User.hasMany(Patient, {
  foreignKey: 'userId',
  as: 'patients',
  onDelete: 'CASCADE',
});
Patient.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

// Patient <-> PatientDoctor (1 : M)
Patient.hasMany(PatientDoctor, {
  foreignKey: 'patientId',
  as: 'patientDoctors',
  onDelete: 'CASCADE',
});
PatientDoctor.belongsTo(Patient, {
  foreignKey: 'patientId',
  as: 'patient',
});

// Doctor <-> PatientDoctor (1 : M)
Doctor.hasMany(PatientDoctor, {
  foreignKey: 'doctorId',
  as: 'patientDoctors',
  onDelete: 'CASCADE',
});
PatientDoctor.belongsTo(Doctor, {
  foreignKey: 'doctorId',
  as: 'doctor',
});

// Patient <-> Doctor (M : M through PatientDoctor)
Patient.belongsToMany(Doctor, {
  through: PatientDoctor,
  foreignKey: 'patientId',
  otherKey: 'doctorId',
  as: 'doctors',
});
Doctor.belongsToMany(Patient, {
  through: PatientDoctor,
  foreignKey: 'doctorId',
  otherKey: 'patientId',
  as: 'patients',
});

export {
  sequelize,
  User,
  Patient,
  Doctor,
  PatientDoctor,
};
