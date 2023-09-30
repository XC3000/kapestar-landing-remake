"use client";
import { RegisterUser } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { RegisterValidation } from "@/lib/validation/auth";
import useRegisterStore from "@/store/register";
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
import { Form, FormField } from "../ui/form";

type Inputs = z.infer<typeof RegisterValidation>;

function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { updateValues, values: globalValues } = useRegisterStore();
  const form = useForm<Inputs>({
    resolver: zodResolver(RegisterValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      state: "",
      city: "",
      referral: "",
    },
  });

  const error = form.formState.errors;

  async function onSubmit(values: Inputs) {
    updateValues({
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      state: values.state,
      city: values.city,
      referral: values.referral,
    });

    try {
      setIsLoading(true);
      await RegisterUser({
        firstName: values.firstName,
        lastName: values.lastName,
        state: values.state,
        city: values.city,
        referral: values.referral,
        password: values.password,
        confirmPassword: values.confirmPassword,
        email: globalValues.email,
        phone: globalValues.phone,
      });
      toast.success("Successful Please login");
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
    <div className="px-4">
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative m-auto mt-12 w-full max-w-md rounded-xl border bg-white px-6 py-12 shadow-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
          initial={{ x: 10 }}
          animate={{ x: 0 }}
          exit={{ x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="mb-6 text-center text-xl font-semibold sm:text-2xl">
            Almost there!
          </h3>

          <div className="gap-4 sm:grid-cols-2 md:grid">
            <div>
              <FormField
                name="firstName"
                control={form.control}
                render={({ field }) => (
                  <FormInput
                    field={field}
                    label="First Name"
                    type="text"
                    placeholder=""
                  />
                )}
              />
              <FormError error={error.firstName?.message} />
            </div>
            <div>
              <FormField
                name="lastName"
                control={form.control}
                render={({ field }) => (
                  <FormInput
                    field={field}
                    label="Last Name"
                    type="text"
                    placeholder=""
                  />
                )}
              />
              <FormError error={error.lastName?.message} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormField
                name="state"
                control={form.control}
                render={({ field }) => (
                  <FormInput
                    field={field}
                    label="State"
                    type="text"
                    placeholder=""
                  />
                )}
              />
              <FormError error={error.state?.message} />
            </div>
            <div>
              <FormField
                name="city"
                control={form.control}
                render={({ field }) => (
                  <FormInput
                    field={field}
                    label="City"
                    type="text"
                    placeholder=""
                  />
                )}
              />
              <FormError error={error.city?.message} />
            </div>
          </div>
          <div className="grid-cols-2 gap-4 md:grid">
            <div>
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormInput
                    field={field}
                    label="Password"
                    type="password"
                    placeholder=""
                  />
                )}
              />
              <FormError error={error.password?.message} />
            </div>
            <div>
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormInput
                    field={field}
                    label="Confirm password"
                    type="password"
                    placeholder=""
                  />
                )}
              />
              <FormError error={error.confirmPassword?.message} />
            </div>
          </div>

          <FormField
            name="referral"
            control={form.control}
            render={({ field }) => (
              <FormInput
                field={field}
                label="Referral (optional)"
                type="text"
                placeholder=""
              />
            )}
          />
          <FormError error={error.referral?.message} />

          <Button className="mt-4 w-full" disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            ) : (
              "Submit"
            )}
          </Button>
        </motion.form>
      </Form>
    </div>
  );
}

export default Register;
