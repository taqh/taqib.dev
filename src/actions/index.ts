import { defineAction } from "astro:actions";
import { z } from 'astro:schema';
import nodemailer from 'nodemailer';

const user = await import.meta.env.GMAIL_USER
const pass = await import.meta.env.GMAIL_PASS

export const server = {
  contact: defineAction({
    accept: "form",
    input: z.object({
      name: z.string().min(2),
      email: z.string().email(),
      message: z.string().min(2),
    }),
    handler: async ({ name, email, message }) => {

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: user, // your Gmail address
          pass: pass, // your Gmail App Password
        },
      });

      // Configure the email details
      const mailOptions = {
        from: email,
        to: user, 
        subject: `New message from ${name}`,
        text: message,
        html: `
          <h2>New Message from Contact Form</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        return { success: true };
      } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: 'Failed to send email.' }; // Return error response
      }
    },
  }),
};
