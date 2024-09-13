// models/User.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as needed

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    otp: {
        type: DataTypes.STRING, // Store OTP temporarily
        allowNull: true,
    },
    resetToken: {
        type: DataTypes.STRING, // For password reset
        allowNull: true,
    },
    resetTokenExpiry: {
        type: DataTypes.DATE, // Expiry time for the reset token
        allowNull: true,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Email verification status
    },
    referralCode: {
        type: DataTypes.STRING, // Optional referral code for users
        allowNull: true,
    },
    points: {
        type: DataTypes.INTEGER,
        defaultValue: 0, // Points for referral or other activities
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Export the User model
module.exports = User;
