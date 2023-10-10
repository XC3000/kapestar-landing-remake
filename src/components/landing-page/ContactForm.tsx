"use client";
import { Button } from "@/components/ui/button";
import { ContactFormValidation } from "@/lib/validation/auth";
import useRegisterStore from "@/store/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormError from "../forms/FormError";
import FormInput from "../forms/FormInput";
import { Form, FormField } from "../ui/form";

type Inputs = z.infer<typeof ContactFormValidation>;

export default function ContactForm() {
  const { updateValues } = useRegisterStore();
  const form = useForm<Inputs>({
    resolver: zodResolver(ContactFormValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      number: "",
    },
  });

  const error = form.formState.errors;

  async function onSubmit(values: Inputs) {
    updateValues({
      firstName: values.firstName,
      lastName: values.lastName,
    });
  }
  return (
    <div>
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative m-auto  w-full rounded-xl border bg-white px-6 py-12 shadow-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
          initial={{ x: 10 }}
          animate={{ x: 0 }}
          exit={{ x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="mb-6 text-center text-xl font-semibold sm:text-2xl">
            BOOK NOW
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

          <div>
            <FormField
              name="number"
              control={form.control}
              render={({ field }) => (
                <FormInput field={field} label="Number" type="number" />
              )}
            />
            <FormError error={error.number?.message} />
          </div>
          <div>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormInput field={field} label="Email" type="email" />
              )}
            />
            <FormError error={error.email?.message} />
          </div>
          <Button className="mt-4 w-full">Submit</Button>
        </motion.form>
      </Form>
    </div>
  );
}
