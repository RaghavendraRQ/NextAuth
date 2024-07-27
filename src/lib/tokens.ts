import { prisma } from "./db";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

import {
  deleteVerificationToken,
  getVerificationTokenByEmail,
} from "@/data/verificationToken";
import {
  deletePasswordReserToken,
  getPasswordResetTokenByEmail,
} from "@/data/resetToken";
import {
  createTwoFactorToken,
  deleteTwoFactorToken,
  getTwoFactorTokenByEmail,
} from "@/data/twoFactor";

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 100);
  const exsistingToken = await getPasswordResetTokenByEmail(email);
  if (exsistingToken) await deletePasswordReserToken(exsistingToken.id);
  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      token,
      email,
      expires,
    },
  });
  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const exsistingToken = await getVerificationTokenByEmail(email);
  if (exsistingToken) await deleteVerificationToken(exsistingToken.id);
  const verficationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verficationToken;
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 999_999).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // TODO: change the time sooner
  const exsistingToken = await getTwoFactorTokenByEmail(email);
  if (exsistingToken) await deleteTwoFactorToken(exsistingToken.id);
  const twoFactorToken = await createTwoFactorToken(email, token, expires);
  return twoFactorToken;
};
