"use client";
import { LoginUser } from "@/api/auth";
import { useGetFromStore } from "@/hooks/useGetFromStore";
import { cn } from "@/lib/utils";
import { LoginValidation } from "@/lib/validation/auth";
import useAuthStore from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import FormError from "../forms/FormError";
import FormInput from "../forms/FormInput";
import { Icons } from "../icons";
import { Button, buttonVariants } from "../ui/button";
import { Form, FormField } from "../ui/form";

type Inputs = z.infer<typeof LoginValidation>;

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const updateUser = useAuthStore((state) => state.updateUser);
  const isLoggedIn = useGetFromStore(useAuthStore, (state) => state.isLoggedIn);

  const form = useForm<Inputs>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginValidation>) {
    setIsLoading(true);
    try {
      const { data } = await LoginUser(values);
      const response = data.split(";") as string;

      if (response[0] === "Success") {
        const userId = response[2];
        updateUser({ id: userId }, true);
      }
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

  if (isLoggedIn) {
    redirect("/dashboard");
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative m-auto w-full max-w-md rounded-xl border  bg-white px-6 py-12 shadow-lg dark:border-black dark:bg-zinc-800 dark:text-white"
        >
          <div>
            <h3 className="mb-6 text-center text-xl font-semibold sm:text-2xl ">
              Welcome to TradeDons
            </h3>

            {/* <Button
              variant="outline"
              className="mb-4 w-full items-center gap-3"
            >
              <Image
                src="/assets/logos/google.png"
                width={24}
                height={24}
                alt="google logo"
              />
              <span>Continue with Google</span>
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
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormInput
                field={field}
                label="Password"
                placeholder=""
                type="password"
              />
            )}
          />
          <FormError error={form.formState.errors.password?.message} />
          <div className="text-end">
            <Link
              href="/reset"
              className=" mt-4 text-sm font-medium text-blue-600"
            >
              Forget Password?
            </Link>
          </div>
          <Button className="mt-4 w-full" disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            ) : (
              "Login"
            )}
          </Button>
          <Link
            href="/register"
            className={cn(
              buttonVariants({
                variant: "outline",
                className:
                  "mt-4 w-full dark:bg-zinc-900 dark:hover:bg-zinc-950",
              })
            )}
          >
            Create an account
          </Link>
        </form>
      </Form>
    </>
  );
};

export default SignIn;
