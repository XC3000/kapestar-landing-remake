"use client";
import { GenerateAndSendOTPForgotPassword } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { EmailValidation } from "@/lib/validation/auth";
import useResetStore from "@/store/reset";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import FormError from "../forms/FormError";
import FormInput from "../forms/FormInput";
import { Icons } from "../icons";
import { Form, FormField } from "../ui/form";

type Inputs = z.infer<typeof EmailValidation>;

function ResetEmail() {
  const { updateScreen, updateValues } = useResetStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<Inputs>({
    resolver: zodResolver(EmailValidation),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: Inputs) {
    setIsLoading(true);
    try {
      await GenerateAndSendOTPForgotPassword(values.email);
      updateValues({ email: values.email });
      updateScreen("verify-otp");
    } catch (error: any) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data);
        return;
      }
      toast.error("Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative m-auto w-full max-w-md rounded-xl border  bg-white px-6 py-12 shadow-lg dark:border-black dark:bg-zinc-800 dark:text-white"
        >
          <div className="mb-8 text-center text-xs font-medium text-gray-600 dark:text-white/50 sm:text-sm">
            <h3 className=" mb-2 text-xl  font-semibold text-black dark:text-white sm:text-2xl">
              Forgot password?
            </h3>
          </div>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormInput
                field={field}
                label="Email"
                type="email"
                placeholder=""
                disabled={isLoading}
              />
            )}
          />
          <FormError error={form.formState.errors.email?.message} />

          <Button className="mt-4 w-full" disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            ) : (
              "Send OTP"
            )}
          </Button>

          <Link
            href="/login"
            className="mt-4 block text-center text-xs underline"
          >
            Back to log in
          </Link>
        </form>
      </Form>
    </>
  );
}

export default ResetEmail;
