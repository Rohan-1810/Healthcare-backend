import { Patient, Doctor, PatientDoctor } from '../models/index.js';

export const assignDoctorToPatient = async (req, res, next) => {
  try {
    const patientId = req.body.patient_id || req.body.patientId;
    const doctorId = req.body.doctor_id || req.body.doctorId;

    // Verify patient exists and belongs to the authenticated user
    const patient = await Patient.findOne({
      where: {
        id: patientId,
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

    // Verify doctor exists
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
        errors: [],
      });
    }

    // Prevent duplicate assignment
    const existingMapping = await PatientDoctor.findOne({
      where: {
        patientId,
        doctorId,
      },
    });

    if (existingMapping) {
      return res.status(409).json({
        success: false,
        message: 'Doctor is already assigned to this patient',
        errors: [],
      });
    }

    const mapping = await PatientDoctor.create({
      patientId,
      doctorId,
    });

    return res.status(201).json({
      success: true,
      message: 'Doctor assigned to patient successfully',
      data: {
        id: mapping.id,
        patientId: mapping.patientId,
        doctorId: mapping.doctorId,
        createdAt: mapping.createdAt,
        patient: {
          id: patient.id,
          name: patient.name,
        },
        doctor: {
          id: doctor.id,
          name: doctor.name,
          specialization: doctor.specialization,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMappings = async (req, res, next) => {
  try {
    const mappings = await PatientDoctor.findAll({
      include: [
        {
          model: Patient,
          as: 'patient',
          where: { userId: req.user.id },
          attributes: ['id', 'name', 'gender', 'contact'],
        },
        {
          model: Doctor,
          as: 'doctor',
          attributes: ['id', 'name', 'specialization', 'email', 'contact'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      success: true,
      message: 'Mappings retrieved successfully',
      data: mappings,
    });
  } catch (error) {
    next(error);
  }
};

export const getDoctorsByPatientId = async (req, res, next) => {
  try {
    const { patient_id } = req.params;

    // Verify patient belongs to the user
    const patient = await Patient.findOne({
      where: {
        id: patient_id,
        userId: req.user.id,
      },
      include: [
        {
          model: Doctor,
          as: 'doctors',
          through: { attributes: ['id', 'createdAt'] },
        },
      ],
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
      message: 'Assigned doctors retrieved successfully',
      data: {
        patient: {
          id: patient.id,
          name: patient.name,
        },
        doctors: patient.doctors || [],
      },
    });
  } catch (error) {
    next(error);
  }
};

export const removeMapping = async (req, res, next) => {
  try {
    const { id } = req.params;

    const mapping = await PatientDoctor.findByPk(id, {
      include: [
        {
          model: Patient,
          as: 'patient',
          attributes: ['id', 'userId'],
        },
      ],
    });

    if (!mapping || !mapping.patient || mapping.patient.userId !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: 'Mapping not found or not accessible',
        errors: [],
      });
    }

    await mapping.destroy();

    return res.status(200).json({
      success: true,
      message: 'Doctor assignment removed successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
