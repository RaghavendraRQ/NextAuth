'use server'
import { signOut } from '@/auth'

export const logout = async () => {
    // TODO: server side stuff
    await signOut()
}