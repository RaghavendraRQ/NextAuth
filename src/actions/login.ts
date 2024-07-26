"use server";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import * as z from "zod";
import { DEFAULT_REDIRECT_ROUTE } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/users";
import { sendVerificationEmail } from "@/lib/validate";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, password } = validatedFields.data;
  const user = await getUserByEmail(email);
  console.log(user);
  
  if (!user || !user.email || !user.password) {
    return { error: "Email does not exsist"}
  }
  if (!user.emailVerified) {
    const verficationToken = await generateVerificationToken(user.email);
    await sendVerificationEmail(verficationToken.email, verficationToken.token);
    return { success: 'Email sent!'}
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_REDIRECT_ROUTE,
    });
    return { success: 'Login successfull'}
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return { error: "Invalid credentials" };
        }
        default: {
          return { error: "something went wrong" };
        }
      }
    }
    throw error;
  }
};
