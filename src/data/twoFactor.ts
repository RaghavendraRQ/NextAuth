import { prisma } from "@/lib/db";

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findFirst({
      where: { email },
    });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findFirst({
      where: { token },
    });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};

export const deleteTwoFactorToken = async (id: string) => {
  await prisma.twoFactorToken.delete({ where: { id } });
};

export const createTwoFactorToken = async (
  email: string,
  token: string,
  expires: Date
) => {
  return await prisma.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
};
