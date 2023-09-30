import * as z from "zod";

const nonEmptyErrorMessage = "This field cannot be empty";
// const emailErrorMessage = "Please provide a valid email address";
const phoneErrorMessage = "Please provide a valid phone number";
const passwordErrorMessage = "Password must be at least 8 characters long";

// const otpErrorMessage = "OTP must be exactly 6 characters long";

export const LoginValidation = z.object({
  email: z.string().nonempty({ message: nonEmptyErrorMessage }).email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string()
    .nonempty({ message: nonEmptyErrorMessage })
    .min(8, { message: passwordErrorMessage })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least 1 uppercase letter",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "Password must contain at least 1 number",
    })
    .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value), {
      message: "Password must contain at least 1 special character",
    }),
});

export const OtpValidation = z.object({
  code: z
    .string()
    .nonempty({ message: nonEmptyErrorMessage })
    .min(6, {
      message: "Verification code must be 6 characters long",
    })
    .max(6),
});

export const EmailValidation = z.object({
  email: LoginValidation.shape.email,
});

export const VerifyEmailValidation = z.object({
  email: LoginValidation.shape.email,
  code: OtpValidation.shape.code,
});

export const PhoneValidation = z.object({
  phone: z
    .string()
    .nonempty({ message: nonEmptyErrorMessage })
    .min(10, { message: phoneErrorMessage })
    .max(10, { message: phoneErrorMessage }),
});

export const VerifyPhoneValidation = z.object({
  phone: PhoneValidation.shape.phone,
  code: OtpValidation.shape.code,
});

export const RegisterValidation = z
  .object({
    firstName: z
      .string()
      .nonempty({ message: nonEmptyErrorMessage })
      .refine((value) => /^[a-zA-Z\s]+$/i.test(value), {
        message: "First name should only contain letters",
      }),
    lastName: z
      .string()
      .nonempty({ message: nonEmptyErrorMessage })
      .refine((value) => /^[a-zA-Z\s]+$/i.test(value), {
        message: "Last name should only contain letters",
      }),
    password: LoginValidation.shape.password,
    confirmPassword: z.string().nonempty({ message: nonEmptyErrorMessage }),
    state: z
      .string()
      .nonempty({ message: nonEmptyErrorMessage })
      .refine((value) => /^[a-zA-Z\s]+$/i.test(value), {
        message: "State should only contain letters",
      }),
    city: z
      .string()
      .nonempty({ message: nonEmptyErrorMessage })
      .refine((value) => /^[a-zA-Z\s]+$/i.test(value), {
        message: "City should only contain letters",
      }),
    referral: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password doesn't match",
  });

export const CreatePasswordValidation = z
  .object({
    password: LoginValidation.shape.password,
    confirmPassword: z.string().nonempty({ message: nonEmptyErrorMessage }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });
