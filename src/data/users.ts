import { prisma } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
    try {
        return await prisma.user.findUnique({ where: { email } });
    } catch (error) {
        // console.log(error)
        return null
    }
}

export const getUserById = async (id: string) => {
    return await prisma.user.findUnique({ where: { id } });
}