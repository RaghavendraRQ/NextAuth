'use server'

import { prisma } from "@/lib/db"
import { getUserByEmail } from "@/data/users"
import { getVerificationTokenByToken } from "@/data/verificationToken"

export const newVerification = async (token: string) => {
    const exsistingToken = await getVerificationTokenByToken(token);
    if(!exsistingToken) {
        return { error: 'Token does not exsist'}
    }
    const hasExpired = new Date(exsistingToken.expires) < new Date();
    if (hasExpired) {
        return { error: 'Token has expired'}
    }
    const exsitingUser = await getUserByEmail(exsistingToken.email);
    if (!exsitingUser) {
        return { error: 'email not found'};
    }
    await prisma.user.update({
        where: {id: exsitingUser.id},
        data: { emailVerified: new Date(),email: exsistingToken.email}
    });
    await prisma.verificationToken.delete({
        where: {id: exsistingToken.id}
    })
    return { success: 'Email verified'}
}