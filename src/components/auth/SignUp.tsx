"use client";
import Register from "@/components/auth/Register";
import SignupEmail from "@/components/auth/SignupEmail";
import VerifySignupEmail from "@/components/auth/VerifySignupEmail";
import VerifySignupPhone from "@/components/auth/VerifySignupPhone";
import { useGetFromStore } from "@/hooks/useGetFromStore";
import useAuthStore from "@/store/auth";
import useRegisterStore from "@/store/register";
import { AnimatePresence, motion } from "framer-motion";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import SignupPhone from "./SignupPhone";

function SignUp() {
  const { screen, updateScreen, updateValues } = useRegisterStore();

  const isLoggedIn = useGetFromStore(useAuthStore, (state) => state.isLoggedIn);

  useEffect(() => {
    updateScreen("email");
    updateValues({ email: "", phone: "" });
  }, []);

  if (isLoggedIn) {
    redirect("/waitlist");
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key={screen}>
        {screen === "email" ? (
          <SignupEmail />
        ) : screen === "verify-email" ? (
          <VerifySignupEmail />
        ) : screen === "phone" ? (
          <SignupPhone />
        ) : screen === "verify-phone" ? (
          <VerifySignupPhone />
        ) : screen === "register" ? (
          <Register />
        ) : (
          <></>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default SignUp;
