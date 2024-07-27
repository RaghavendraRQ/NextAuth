"use server";

import { getPasswordResetTokenByToken } from "@/data/resetToken";
import { getUserByEmail, updatePasswordById } from "@/data/users";
import bcrypt from "bcryptjs";
import { NewPasswordSchema } from "@/schemas";
import { z } from "zod";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  if (!token) {
    return { error: "missing token" };
  }
  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!!" };
  }
  const { password } = validatedFields.data;
  const exsistingToken = await getPasswordResetTokenByToken(token);
  if (!exsistingToken) {
    return { error: "Invalid Token" };
  }
  const hasExpired = new Date() > new Date(exsistingToken.expires);
  if (hasExpired) {
    return { error: "Token has been expired" };
  }
  const user = await getUserByEmail(exsistingToken.email);
  if (!user) {
    return { error: "email does not exsist" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await updatePasswordById(user.id, hashedPassword);
  return { success: "password has been reset" };
};
