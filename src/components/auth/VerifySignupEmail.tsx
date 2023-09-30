"use client";
import {
  GenerateAndSendOTPToEmailId,
  ResendRegisterSendOTP,
  VerifyRegistrationOTP,
} from "@/api/auth";
import useTimer from "@/hooks/useTimer";
import { VerifyEmailValidation } from "@/lib/validation/auth";
import useRegisterStore from "@/store/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import FormError from "../forms/FormError";
import FormInput from "../forms/FormInput";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form";

type Inputs = z.infer<typeof VerifyEmailValidation>;

const VerifySignupEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateScreen, values } = useRegisterStore();

  const { isActive: isTimerRunning, count, reset: resetTimer } = useTimer(60);

  const form = useForm<Inputs>({
    resolver: zodResolver(VerifyEmailValidation),
    defaultValues: {
      email: values.email,
      code: "",
    },
  });

  const handleTimerResetClick = async () => {
    setIsLoading(true);
    try {
      await ResendRegisterSendOTP(values.email);
      form.setValue("code", "");
      resetTimer();
    } catch (error: any) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data);
        return;
      }
      toast.error("Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function getOtop() {
      try {
        await GenerateAndSendOTPToEmailId(values.email);
      } catch (error: any) {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data);
          return;
        }
        toast.error("Something Went Wrong");
      }
    }
    getOtop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(values: Inputs) {
    try {
      const { data } = await VerifyRegistrationOTP(values.email, values.code);
      if (data === "Email Otp is expired.") {
        toast.error("Email Otp is expired.");
        return;
      }

      updateScreen("phone");
      // form.reset();
    } catch (error: any) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data);
        return;
      }
      toast.error("Something Went Wrong");
    }
  }
  return (
    <>
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative m-auto w-full max-w-md rounded-xl border  bg-white px-6 py-12 shadow-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
          initial={{ x: 10 }}
          animate={{ x: 0 }}
          exit={{ x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="mb-8 text-center text-xl font-semibold sm:text-2xl ">
            Verify Email
          </h3>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormInput
                field={field}
                label="Email"
                placeholder=""
                type="email"
                editable
                handleEdit={() => updateScreen("email")}
                disabled
              />
            )}
          />
          <FormError error={form.formState.errors.email?.message} />
          <div className="relative z-10">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormInput
                  field={field}
                  label="Otp"
                  placeholder=""
                  type="number"
                />
              )}
            />
          </div>

          {isTimerRunning ? (
            <p className="relative -top-11 z-0 ml-auto mt-4 max-w-max text-end text-sm text-blue-600">
              {`Resend in ${count} seconds`}
            </p>
          ) : (
            <p
              onClick={handleTimerResetClick}
              className="relative -top-11 z-10 ml-auto mt-4 max-w-max cursor-pointer text-end text-sm text-blue-600"
            >
              Resend
            </p>
          )}
          <FormError error={form.formState.errors.code?.message} />

          <p className="mx-auto mt-4 block w-max rounded-full border bg-zinc-200 px-3 py-1 text-xs dark:border-zinc-600  dark:bg-zinc-400">
            Enter a 6 digit OTP sent to this email address
          </p>
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
              T&C, Privacy Policy & Tariff Rates
            </Link>
          </p>
        </motion.form>
      </Form>
    </>
  );
};

export default VerifySignupEmail;
