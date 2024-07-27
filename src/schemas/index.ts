import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string().min(6, '2FA code should be 6 digits').max(6, '2FA code should be 6 digits')),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export const SignupSchema = z.object({
  email: z.string().email({
    message: "Invalid Email",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name required",
  }),
});
