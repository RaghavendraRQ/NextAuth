"use server";
import * as z from "zod";
import { SettingsSchema } from "@/schemas";
import { auth } from "@/auth";
import { getUserById } from "@/data/users";
import { prisma } from "@/lib/db";

export const Settings = async (values: z.infer<typeof SettingsSchema>) => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return { error: "Unauthorized" };
  }
  const dbUser = await getUserById(user.id!);
  if (!dbUser) {
    return { error: "User not found" };
  }
  await prisma.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  });
  return { success: "Settings updated" };
};
