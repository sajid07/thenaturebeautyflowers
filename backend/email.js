// email.js

// Import nodemailer
const nodemailer = require("nodemailer");
const email_from = process.env.REACT_APP_EMAIL;
const password = process.env.REACT_APP_PASSWORD;

// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email_from, // Your email address
    pass: password, // Your email password
  },
});

// Send email with reset token and link
const sendResetEmail = async (email, resetToken) => {
  console.log("emailto", email);
  console.log("token", resetToken);
  try {
    // Define the reset password URL (replace with your actual URL)
    const resetPasswordUrl = `${process.env.REACT_APP_FRONTBASE_URI}/reset-password-form?token=${resetToken}`;

    // Define email options
    const mailOptions = {
      from: email_from, // Sender email address
      to: email, // Recipient email address
      subject: "Password Reset Request", // Email subject
      // HTML body with reset password link
      html: `
        <p>You've requested a password reset.</p>
        <p>Please click the following link to reset your password:</p>
        <a href="${resetPasswordUrl}">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

module.exports = sendResetEmail;
