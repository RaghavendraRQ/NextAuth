'use server'
import * as z from 'zod'
import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/users"

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
  //TODO: Generate token
  return { success: 'Email sent' }
}