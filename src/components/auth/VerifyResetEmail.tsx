"use client";
import {
  GenerateAndSendOTPForgotPassword,
  OTPVerificationForgotPassword,
} from "@/api/auth";
import useTimer from "@/hooks/useTimer";
import { VerifyEmailValidation } from "@/lib/validation/auth";
import useResetStore from "@/store/reset";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import FormError from "../forms/FormError";
import FormInput from "../forms/FormInput";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form";

type Inputs = z.infer<typeof VerifyEmailValidation>;

const VerifyResetEmail = () => {
  const { updateScreen, values: globalValues } = useResetStore();
  const [isLoading, setIsLoading] = useState(false);

  const { isActive: isTimerRunning, count, reset: resetTimer } = useTimer(60);

  const getOtp = useCallback(async (callback?: () => void) => {
    try {
      await GenerateAndSendOTPForgotPassword(globalValues.email);
      if (callback) {
        form.setValue("code", "");
        callback();
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data);
        return;
      }
      toast.error("Something Went Wrong");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<Inputs>({
    resolver: zodResolver(VerifyEmailValidation),
    defaultValues: {
      email: globalValues.email,
      code: "",
    },
  });

  async function onSubmit(values: Inputs) {
    setIsLoading(true);
    try {
      await OTPVerificationForgotPassword(values);
      updateScreen("create-password");
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

  const handleTimerResetClick = async () => {
    getOtp(resetTimer);
  };

  return (
    <>
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative m-auto w-full max-w-md origin-right rounded-xl border  bg-white px-6 py-12 shadow-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
          initial={{ x: 10 }}
          animate={{ x: 0 }}
          exit={{ x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="mb-8 text-center text-xl font-semibold sm:text-2xl ">
            Verify OTP
          </h3>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormInput
                field={field}
                label="Email Address"
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
                  label="Enter OTP"
                  placeholder=""
                  type="number"
                />
              )}
            />
          </div>

          {isTimerRunning ? (
            <p className="relative -top-11  ml-auto mt-4 max-w-max  text-sm text-blue-600">
              {`Resend in ${count} seconds`}
            </p>
          ) : (
            <p
              onClick={handleTimerResetClick}
              className="relative -top-11 z-10 ml-auto mt-4 max-w-max  cursor-pointer  text-sm text-blue-600"
            >
              Resend
            </p>
          )}
          <FormError error={form.formState.errors.code?.message} />

          <p className="mx-auto mt-4 block w-max rounded-full border bg-zinc-200 px-3 py-1 text-xs dark:border-zinc-600  dark:bg-zinc-400">
            Enter a 6 digit OTP sent to this email address
          </p>
          <Button type="submit" className="mt-4 w-full" disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            ) : (
              "Continue"
            )}
          </Button>
        </motion.form>
      </Form>
    </>
  );
};

export default VerifyResetEmail;
