export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
    errors: [],
  });
};

export const errorHandler = (err, req, res, next) => {
  // Handle syntax error for malformed JSON body
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Malformed JSON payload in request body',
      errors: [{ message: err.message }],
    });
  }

  // Handle Sequelize validation errors
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  // Handle Sequelize unique constraint errors
  if (err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(409).json({
      success: false,
      message: 'Resource conflict or duplicate entry',
      errors,
    });
  }

  // Handle Sequelize foreign key constraint errors
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      success: false,
      message: 'Referenced foreign key entity does not exist',
      errors: [],
    });
  }

  // Custom status code or default to 500
  const statusCode = err.statusCode || err.status || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  // Log error
  console.error(`[Error] ${err.name || 'Server Error'}:`, err.message);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
    errors: !isProduction && err.errors ? err.errors : [],
  });
};

export default errorHandler;
