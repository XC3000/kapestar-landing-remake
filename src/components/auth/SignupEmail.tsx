"use client";
import { IsEmailAlreadyExist } from "@/api/auth";
import { EmailValidation } from "@/lib/validation/auth";
import useRegisterStore from "@/store/register";
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
import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form";

type Inputs = z.infer<typeof EmailValidation>;

const SignupEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateScreen, values, updateValues } = useRegisterStore();

  const form = useForm<Inputs>({
    resolver: zodResolver(EmailValidation),
    defaultValues: {
      email: values.email,
    },
  });

  async function onSubmit(values: Inputs) {
    setIsLoading(true);
    try {
      await IsEmailAlreadyExist(values.email);
      updateValues({ email: values.email });
      updateScreen("verify-email");
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
          className="relative m-auto w-full max-w-md rounded-xl border bg-white px-6 py-12 shadow-lg dark:border-black dark:bg-zinc-800 dark:text-white"
        >
          <div className="mb-6">
            <h3 className="mb-6 text-center text-xl font-semibold sm:text-2xl ">
              Welcome to TradeDons
            </h3>

            {/*   <Button variant="outline" className="w-full items-center gap-3">
              <Image
                src="/assets/logos/google.png"
                width={24}
                height={24}
                alt="google logo"
              />
              <span className="mt-1 block">Continue with Google</span>
            </Button> */}
          </div>

          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormInput
                field={field}
                label="Email"
                placeholder=""
                type="email"
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
              "Continue"
            )}
          </Button>
          <p className="mt-3 text-center text-xs text-zinc-400">
            By proceeding, I agree to
            <Link className="underline" href="/">
              T&C ,Privacy Policy & Tariff Rates
            </Link>
          </p>
        </form>
      </Form>
    </>
  );
};

export default SignupEmail;
