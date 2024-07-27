"use client";
import React, { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CardWrapperComponent from "@/components/auth/CardWrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormErrorComponent from "../FormError";
import FormSuccessComponent from "../FormSuccess";
import Link from "next/link";

const LoginFormComponent = () => {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use" : ''

  const [twoFactor, setTwoFactor] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        if (data.error) {
          form.reset();
          setError(data?.error);
        }
        if (data.success) {
          form.reset();
          setSuccess(data.success);
        }
        if (data.twoFactor) {
          setTwoFactor(true);
        }
      }).catch(() => {
        setError('Something went wrong');
      });
    });
  };
  //   console.log(form);

  return (
    <CardWrapperComponent
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/signup"
      showSocail
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className=" space-y-6">
          <div className="space-y-4">
            {twoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>2FA Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="123456"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!twoFactor && (
              <>
              <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="rq@gmail.com"
                      type="email"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="......"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <Button size='sm' variant='link' asChild className="px-0 font-normal">
                    <Link href="/reset-password">Forgot Password?</Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
              </>
            )}
          </div>
          <FormErrorComponent message={error || urlError} />
          <FormSuccessComponent message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            {twoFactor ? "Verify" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapperComponent>
  );
};

export default LoginFormComponent;
