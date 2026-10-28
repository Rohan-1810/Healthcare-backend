import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/authRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import mappingRoutes from './routes/mappingRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

// Enable case-insensitive and slash-agnostic routing
app.set('case sensitive routing', false);
app.set('strict routing', false);

// Security Headers
app.use(helmet());

// CORS Configuration
app.use(cors());

// Body Parsers
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting for Authentication endpoints (prevent brute-force attacks)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.',
    errors: [],
  },
});

// Root & Health check endpoints
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Healthcare Management REST API is running',
    version: '1.0.0',
    documentation: '/api/docs',
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/mappings', mappingRoutes);

// Catch-all 404 handler for unknown routes
app.use(notFoundHandler);

// Centralized error handling middleware
app.use(errorHandler);

export default app;
