"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.AUTH_PASS,
  },
});

export async function sendEmail(data) {
  try {
    const emailText = `${data.email ? `Email: ${data.email}` : 'No email provided'}`;
    const phoneText = `${data.phone ? `Phone: ${data.phone}` : 'No phone provided'}`;
    const messageText = `${data.message ? `Message: \n${data.message}` : 'No message provided'}`;
    const mailOptions = {
      from: process.env.EMAIL_SENDER,
      to: process.env.EMAIL_RECEIVER,
      subject: data.name ? `New form message from ${data.name}` : `New form message`,
      // text: `${`Contact form: ${data.emailOrPhone}`}\n\n${data.topic ? `Topic: ${data.topic}` : "No topic"}\n\n${data.message ? `Message: \n${data.message}` : "No message"}`,
      text: `${emailText}\n\n${phoneText}\n\n${messageText}`,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
}