import { prisma } from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await prisma.twoFactorConifimation.findUnique(
      {
        where: { userId },
      }
    );
    return twoFactorConfirmation;
  } catch (error) {
    return null;
  }
};

export const deleteTwoFactorConfirmation = async (id: string) => {
  await prisma.twoFactorConifimation.delete({ where: { id } });
}

export const createTwoFactorConfirmation = async (userId: string) => {
  return await prisma.twoFactorConifimation.create({
    data: {
      userId,
    },
  });
}