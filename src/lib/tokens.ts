import {
  deleteVerificationToken,
  getVerificationTokenByEmail,
} from "@/data/verificationToken";
import { prisma } from "./db";
import { v4 as uuidv4 } from "uuid";
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
