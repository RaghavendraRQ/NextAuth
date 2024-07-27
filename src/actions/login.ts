"use server";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import * as z from "zod";
import { DEFAULT_REDIRECT_ROUTE } from "@/routes";
import { AuthError } from "next-auth";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { getUserByEmail } from "@/data/users";
import { sendTwoFactorEmail, sendVerificationEmail } from "@/lib/validate";
import {
  deleteTwoFactorToken,
  getTwoFactorTokenByEmail,
} from "@/data/twoFactor";
import {
  createTwoFactorConfirmation,
  deleteTwoFactorConfirmation,
  getTwoFactorConfirmationByUserId,
} from "@/data/twoFactorConfirmation";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, password, code } = validatedFields.data;
  const user = await getUserByEmail(email);
  // console.log(user);

  if (!user || !user.email || !user.password) {
    return { error: "Email does not exsist" };
  }
  if (!user.emailVerified) {
    const verficationToken = await generateVerificationToken(user.email);
    await sendVerificationEmail(verficationToken.email, verficationToken.token);
    return { success: "Email sent!" };
  }
  if (user.isTwoFactorEnabled && user.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(user.email);      
      if (!twoFactorToken) {
        return { error: "2FA token not found" };
      }
      if (twoFactorToken.token !== code) {
        return { error: "Invalid 2FA token" };
      }
      if (twoFactorToken.expires < new Date()) {
        return { error: "2FA token expired" };
      }
      await deleteTwoFactorToken(twoFactorToken.id);
      const exsistingConfirmation = await getTwoFactorConfirmationByUserId(
        user.id
      );
      if (exsistingConfirmation) {
        await deleteTwoFactorConfirmation(exsistingConfirmation.id);
      }
      await createTwoFactorConfirmation(user.id);
    } else {
      const twoFactorToken = await generateTwoFactorToken(user.email);
      await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_REDIRECT_ROUTE,
    });
    return { success: "Login successfull" };
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
