import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/verify-email?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "sai783191@gmail.com",
    subject: "Reg: Verification of your accoung",
    html: `<p>CLick on the link to verify your email <strong><a href=${confirmLink}>Click here</a></strong></p>`,
  });
};
