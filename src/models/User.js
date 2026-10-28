import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Name cannot be empty' },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: 'unique_user_email',
      msg: 'Email address already exists',
    },
    validate: {
      isEmail: { msg: 'Please provide a valid email address' },
    },
    set(val) {
      if (val) this.setDataValue('email', val.trim().toLowerCase());
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'users',
});

// Remove sensitive password hash from JSON responses
User.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.password;
  return values;
};

export default User;
