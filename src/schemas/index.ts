import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Invalid email'
    }),
    password: z.string().min(1, {
        message: 'Password is required'
    })
})

export const ResetSchema = z.object({
    email: z.string().email({
        message: 'Invalid email'
    })
})

export const SignupSchema = z.object({
    email: z.string().email({
        message: 'Invalid Email'
    }),
    password: z.string().min(6, {
        message: 'Minimum 6 characters required'
    }),
    name: z.string().min(1, {
        message: 'Name required'
    })
})