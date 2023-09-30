import {
  CreatePasswordValidation,
  LoginValidation,
  RegisterValidation,
  VerifyEmailValidation,
} from "@/lib/validation/auth";
import { z } from "zod";
import baseApi from "./base";

export const IsEmailAlreadyExist = async (email: string) => {
  return await baseApi.get(`/api/Account/IsEmailAlreadyExist?EmailID=${email}`);
};

export const GenerateAndSendOTPToEmailId = async (email: string) => {
  return await baseApi.get(
    `/api/Account/GenerateAndSendOTPToEmailId?EmailID=${email}`
  );
};

export const ResendRegisterSendOTP = async (email: string) => {
  return await baseApi.get(
    `/api/Account/ResendRegisterSendOTP?EmailID=${email}`
  );
};

export const VerifyRegistrationOTP = async (email: string, code: string) => {
  return await baseApi.get(
    `/api/Account/VerifyRegistrationOTP?EmailID=${email}&EmailOtp=${code}`
  );
};

export const IsPhoneNumberExist = async (phone: string) => {
  return await baseApi.get(
    `/api/Account/IsPhoneNumberExist?PhoneNumber=${phone}`
  );
};

export const SendOTPToMobile = async (email: string, phone: string) => {
  return await baseApi.get(
    `/api/Account/SendOTPToMobile?EmailID=${email}&MobileNumber=${phone}`
  );
};

export const VerifyOTPToMobile = async (email: string, code: string) => {
  return await baseApi.get(
    `/api/Account/VerifyOTPToMobile?EmailID=${email}&OtpVal=${code}`
  );
};

// GenerateAndSendOTP-ForgotPassword
export const GenerateAndSendOTPForgotPassword = async (email: string) => {
  return await baseApi.get(`/api/Account/GenerateAndSendOTP?EmailID=${email}`);
};

// OTPVerification-ForgotPassword
export const OTPVerificationForgotPassword = async ({
  email,
  code,
}: z.infer<typeof VerifyEmailValidation>) => {
  return await baseApi.get(
    `/api/Account/OTPVerification?EmailID=${email}&Otp=${code}`
  );
};

export const RegisterUser = async (
  val: z.infer<typeof RegisterValidation> & { email: string; phone: string }
) => {
  return await baseApi.post(`/api/Account/Register`, {
    FirstName: val.firstName,
    LastName: val.lastName,
    City: val.city,
    State: val.state,
    Email: val.email,
    Phone: val.phone,
    Password: val.password,
    ConfirmPassword: val.confirmPassword,
    Referral: val.referral,
  });
};

export const LoginUser = async (val: z.infer<typeof LoginValidation>) => {
  return await baseApi.post(`/api/Account/Login`, {
    Email: val.email,
    Password: val.password,
  });
};

export const ResetPassword = async ({
  email,
  password,
  confirmPassword,
}: z.infer<typeof CreatePasswordValidation> & { email: string }) => {
  return await baseApi.post(`/api/Account/ResetPassword`, {
    Email: email,
    NewPassword: password,
    ConfirmPassword: confirmPassword,
  });
};
