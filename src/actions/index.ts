import { defineAction } from "astro:actions";
import { z } from 'astro:schema';
import { Resend } from 'resend';

const pass = await import.meta.env.RESEND_API_KEY
const resend = new Resend(pass);

export const server = {
  contact: defineAction({
    accept: "form",
    input: z.object({
      name: z.string().min(2),
      email: z.string().email(),
      message: z.string().min(2),
    }),
    handler: async ({ name, email, message }) => {

      // Configure the email details
      const mailOptions = {
        from: `Website <${name}@hello.taqib.dev>`,
        to: 'hello@taqib.dev', 
        subject: `New message from site visitor: ${name}`,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p>${message}</p>
        `,
      };

      try {
        await resend.emails.send(mailOptions);
        return { success: true };
      } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: 'Failed to send email.' }; // Return error response
      }
    },
  }),
};
