import GitHub from "next-auth/providers/github"
import Google from 'next-auth/providers/google'
import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "./schemas"
import { getUserByEmail } from "./data/users"
import bcrypt from 'bcryptjs'
import { User } from "@prisma/client"
 
export default { providers: [
    GitHub,
    Google,
    Credentials({
        async authorize(credentials) {
            const validatedFields = LoginSchema.safeParse(credentials)
            if(validatedFields.success) {
                const { email, password} = validatedFields.data
                const user = await getUserByEmail(email) as User;
                if (!user || !user.password) return null
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) return user
            }
            return null;
            
        }
    })
] } satisfies NextAuthConfig