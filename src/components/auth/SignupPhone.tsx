"use client";
import { IsPhoneNumberExist } from "@/api/auth";
import { PhoneValidation } from "@/lib/validation/auth";
import useRegisterStore from "@/store/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import FormError from "../forms/FormError";
import FormInput from "../forms/FormInput";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form";

type Inputs = z.infer<typeof PhoneValidation>;

const SignupPhone = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateScreen, values, updateValues } = useRegisterStore();

  const form = useForm<Inputs>({
    resolver: zodResolver(PhoneValidation),
    defaultValues: {
      phone: values.phone,
    },
  });

  async function onSubmit(values: Inputs) {
    setIsLoading(true);
    try {
      await IsPhoneNumberExist(values.phone);
      updateValues({ phone: values.phone });
      updateScreen("verify-phone");
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
          className="relative m-auto w-full max-w-md rounded-xl border  bg-white px-6 py-12 shadow-lg dark:border-black dark:bg-zinc-800 dark:text-white"
          initial={{ x: 10 }}
          animate={{ x: 0 }}
          exit={{ x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="mb-8 text-center text-xl font-semibold sm:text-2xl ">
            Enter Phone
          </h3>

          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormInput
                field={field}
                label="Phone Number"
                placeholder=""
                type="number"
              />
            )}
          />
          <FormError error={form.formState.errors.phone?.message} />
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
        </motion.form>
      </Form>
    </>
  );
};

export default SignupPhone;
