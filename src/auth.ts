import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

import { getUserById } from "./data/users";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface session {
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/auth-error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const exsistingUser = await getUserById(user.id!);
      if (!exsistingUser || !exsistingUser.emailVerified) {
        return false;
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role as UserRole; // TODO: fix the typescript error
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const exsistingUser = await getUserById(token.sub);
      if (!exsistingUser) return token;
      token.role = exsistingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
