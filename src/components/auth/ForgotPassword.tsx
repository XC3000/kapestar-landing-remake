"use client";
import CreatePassword from "@/components/auth/CreatePassword";
import ResetEmail from "@/components/auth/ResetEmail";
import VerifyResetEmail from "@/components/auth/VerifyResetEmail";
import { useGetFromStore } from "@/hooks/useGetFromStore";
import useAuthStore from "@/store/auth";
import useResetStore from "@/store/reset";
import { AnimatePresence, motion } from "framer-motion";
import { redirect } from "next/navigation";
import { useEffect } from "react";

function ForgotPassword() {
  const { screen, updateScreen } = useResetStore();

  const isLoggedIn = useGetFromStore(useAuthStore, (state) => state.isLoggedIn);

  useEffect(() => {
    updateScreen("email");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoggedIn) {
    redirect("/waitlist");
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key={screen}>
        {screen === "email" ? (
          <ResetEmail />
        ) : screen === "verify-otp" ? (
          <VerifyResetEmail />
        ) : screen === "create-password" ? (
          <CreatePassword />
        ) : (
          <></>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default ForgotPassword;
