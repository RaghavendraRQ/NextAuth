'use server'

import { auth } from "@/auth"
import { UserRole } from "@prisma/client"

export const Admin = async() => {
    const session = await auth()
    const role = session?.user.role
    if (role === UserRole.Admin) {
        return { message: "You are an Admin", status: 200, ok: true }
    }
    return { message: "You are not an Admin", status: 403, ok: false }
}