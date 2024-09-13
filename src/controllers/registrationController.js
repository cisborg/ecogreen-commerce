const nodemailer = require('nodemailer');
const twilio = require('twilio');

// Configure Twilio
const twilioClient = twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

// Send OTP via SMS
const sendOtp = async (phoneNumber, otp) => {
    await twilioClient.messages.create({
        body: `Your OTP is: ${otp}`,
        from: 'YOUR_TWILIO_PHONE_NUMBER',
        to: phoneNumber
    });
};

// Send Email Verification
const sendEmailVerification = async (email, otp) => {
    await transporter.sendMail({
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Verify Your Email',
        text: `Your verification code is: ${otp}`
    });
};
