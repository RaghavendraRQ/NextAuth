import NextAuth, { type DefaultSession } from "next-auth"
import { UserRole } from "@prisma/client"

export type ExtendedUser = DefaultSession['user'] & {
    role: UserRole
}

declare module "next-auth" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface session {
    user: ExtendedUser
  }
}