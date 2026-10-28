import { Patient, PatientDoctor } from '../models/index.js';

export const createPatient = async (req, res, next) => {
  try {
    const { name, age, dateOfBirth, gender, contact, address } = req.body;

    const patient = await Patient.create({
      name: name.trim(),
      age: age !== undefined ? age : null,
      dateOfBirth: dateOfBirth || null,
      gender: gender ? gender.trim() : null,
      contact: contact ? contact.trim() : null,
      address: address ? address.trim() : null,
      userId: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: 'Patient created successfully',
      data: patient,
    });
  } catch (error) {
    next(error);
  }
};

export const getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      success: true,
      message: 'Patients retrieved successfully',
      data: patients,
    });
  } catch (error) {
    next(error);
  }
};

export const getPatientById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const patient = await Patient.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found or not accessible',
        errors: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Patient retrieved successfully',
      data: patient,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePatient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, age, dateOfBirth, gender, contact, address } = req.body;

    const patient = await Patient.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found or not accessible',
        errors: [],
      });
    }

    if (name !== undefined) patient.name = name.trim();
    if (age !== undefined) patient.age = age;
    if (dateOfBirth !== undefined) patient.dateOfBirth = dateOfBirth;
    if (gender !== undefined) patient.gender = gender ? gender.trim() : null;
    if (contact !== undefined) patient.contact = contact ? contact.trim() : null;
    if (address !== undefined) patient.address = address ? address.trim() : null;

    await patient.save();

    return res.status(200).json({
      success: true,
      message: 'Patient updated successfully',
      data: patient,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePatient = async (req, res, next) => {
  try {
    const { id } = req.params;

    const patient = await Patient.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found or not accessible',
        errors: [],
      });
    }

    // Clean up related doctor mappings consistently
    await PatientDoctor.destroy({
      where: { patientId: patient.id },
    });

    await patient.destroy();

    return res.status(200).json({
      success: true,
      message: 'Patient deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
