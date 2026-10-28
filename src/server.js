import dotenv from 'dotenv';
import app from './app.js';
import { connectDB, default as sequelize } from './config/database.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`===============================================`);
      console.log(` Healthcare Backend Server is running on port ${PORT}`);
      console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(` Health check: http://localhost:${PORT}/health`);
      console.log(`===============================================`);
    });

    // Graceful shutdown
    const handleShutdown = async (signal) => {
      console.log(`\nReceived ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        try {
          await sequelize.close();
          console.log('Database connection closed.');
          process.exit(0);
        } catch (err) {
          console.error('Error closing database connection:', err);
          process.exit(1);
        }
      });
    };

    process.on('SIGINT', () => handleShutdown('SIGINT'));
    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  } catch (error) {
    console.error('Failed to start server due to database connection error:', error.message);
    process.exit(1);
  }
};

startServer();
