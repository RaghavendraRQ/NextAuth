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
import { ResetSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { reset } from "@/actions/reset";
import FormErrorComponent from "../FormError";
import FormSuccessComponent from "../FormSuccess";

const ResetComponent = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: ""
    },
  });
  const handleSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      reset(values).then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  };
  return (
    <CardWrapperComponent
      headerLabel="Reset Password"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="rq@gmail.com"
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

export default ResetComponent;
