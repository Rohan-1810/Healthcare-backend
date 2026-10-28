import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'healthcare_db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Database connected successfully (${sequelize.getDialect()}).`);
    await sequelize.sync();
    console.log('Database models synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    throw error;
  }
};

export default sequelize;
