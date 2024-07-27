'use client'
import React, { useTransition, useState } from "react";
import CardWrapperComponent from "./CardWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { newPassword } from "@/actions/newPassword";
import FormErrorComponent from "../FormError";
import FormSuccessComponent from "../FormSuccess";
import { useSearchParams } from "next/navigation";

const newPasswordComponent = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: ""
    },
  });
  const handleSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  };
  return (
    <CardWrapperComponent
      headerLabel="Enter a New Password"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="******"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <FormErrorComponent message={error}/>
          <FormSuccessComponent message={success}/>
          <Button type='submit' className="w-full" disabled={isPending}>Reset Password</Button>
        </form>
      </Form>
    </CardWrapperComponent>
  );
};

export default newPasswordComponent;
