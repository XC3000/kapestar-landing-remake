"use client";
import { ResetPassword } from "@/api/auth";
import { CreatePasswordValidation } from "@/lib/validation/auth";
import useResetStore from "@/store/reset";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import FormError from "../forms/FormError";
import FormInput from "../forms/FormInput";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form";

type Inputs = z.infer<typeof CreatePasswordValidation>;

const CreatePassword = () => {
  const { values: globalValues } = useResetStore();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<Inputs>({
    resolver: zodResolver(CreatePasswordValidation),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: Inputs) {
    setIsLoading(true);
    try {
      await ResetPassword({ email: globalValues.email, ...values });
      toast.success("Password has been reset successfully");
      router.push("/login");
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
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative m-auto w-full max-w-md origin-left rounded-xl border  bg-white px-6 py-12 shadow-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
          initial={{ x: 10 }}
          animate={{ x: 0 }}
          exit={{ x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="mb-8 text-center text-xl font-semibold sm:text-2xl ">
            Create New Password
          </h3>
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormInput
                field={field}
                label="Enter Password"
                placeholder=""
                type="password"
              />
            )}
          />
          <FormError error={form.formState.errors.password?.message} />
          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormInput
                field={field}
                label="Confirm Password"
                placeholder=""
                type="password"
              />
            )}
          />
          <FormError error={form.formState.errors.confirmPassword?.message} />
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

export default CreatePassword;
