'use server'
import * as z from 'zod'
import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/users"
import { generatePasswordResetToken } from '@/lib/tokens'
import { sendPasswordResetEmail } from '@/lib/validate'

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedData = ResetSchema.safeParse(values);
    if (!validatedData.success) {
        return { error: 'Invalid Email'}
    }
    const { email } = validatedData.data
  const user = await getUserByEmail(email)
  if (!user) {
    return { error: 'Email not found' }
  }
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)
  return { success: 'Email sent' }
}