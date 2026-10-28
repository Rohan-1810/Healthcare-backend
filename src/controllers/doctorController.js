import { Doctor, PatientDoctor } from '../models/index.js';

export const createDoctor = async (req, res, next) => {
  try {
    const { name, specialization, contact, email, address } = req.body;

    const doctor = await Doctor.create({
      name: name.trim(),
      specialization: specialization.trim(),
      contact: contact ? contact.trim() : null,
      email: email ? email.trim().toLowerCase() : null,
      address: address ? address.trim() : null,
    });

    return res.status(201).json({
      success: true,
      message: 'Doctor created successfully',
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};

export const getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.findAll({
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      success: true,
      message: 'Doctors retrieved successfully',
      data: doctors,
    });
  } catch (error) {
    next(error);
  }
};

export const getDoctorById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const doctor = await Doctor.findByPk(id);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
        errors: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Doctor retrieved successfully',
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, specialization, contact, email, address } = req.body;

    const doctor = await Doctor.findByPk(id);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
        errors: [],
      });
    }

    if (name !== undefined) doctor.name = name.trim();
    if (specialization !== undefined) doctor.specialization = specialization.trim();
    if (contact !== undefined) doctor.contact = contact ? contact.trim() : null;
    if (email !== undefined) doctor.email = email ? email.trim().toLowerCase() : null;
    if (address !== undefined) doctor.address = address ? address.trim() : null;

    await doctor.save();

    return res.status(200).json({
      success: true,
      message: 'Doctor updated successfully',
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const doctor = await Doctor.findByPk(id);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
        errors: [],
      });
    }

    // Clean up associated mappings consistently
    await PatientDoctor.destroy({
      where: { doctorId: doctor.id },
    });

    await doctor.destroy();

    return res.status(200).json({
      success: true,
      message: 'Doctor deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
