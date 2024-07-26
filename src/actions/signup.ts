"use server";
import * as z from "zod";
import { SignupSchema } from "@/schemas";
import { prisma } from "@/lib/db";
import bcyrpt from "bcryptjs";
import { getUserByEmail } from "@/data/users";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/validate";

export const signup = async (values: z.infer<typeof SignupSchema>) => {
  const validatedFields = SignupSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { name, email, password } = validatedFields.data;
  const user = await getUserByEmail(email);
  if (user) {
    return { error: "User already exists" };
  }
  const hashedPassword = await bcyrpt.hash(password, 10);
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  const verificationToken = await generateVerificationToken(email);
  console.log(verificationToken);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);
  return { success: "Email sent" };
};
