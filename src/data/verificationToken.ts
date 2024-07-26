import {prisma} from '@/lib/db'
export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verficationToken = await prisma.verificationToken.findFirst({
            where: { email }
        })
        return verficationToken
    } catch (error) {
        return null;
    }
}

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const verficationToken = await prisma.verificationToken.findFirst({
            where: { token }
        })
        return verficationToken
    } catch (error) {
        return null;
    }
}

export const deleteVerificationToken = async (id: string) => {
    try {
        await prisma.verificationToken.delete({where: {id}})
    }
    catch (error) {
        return null;
    }
}