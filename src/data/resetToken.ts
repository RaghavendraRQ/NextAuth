import { prisma } from "@/lib/db";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: { token: token },
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const deletePasswordReserToken = async (id: string) => {
    try {
        await prisma.passwordResetToken.delete({
            where: {id}
        })
    }
    catch(error) {
        return null
    }
}